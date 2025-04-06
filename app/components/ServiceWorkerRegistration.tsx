"use client";

import { useEffect, useState } from "react";

// Create a simple showToast function as a fallback
const useToast = () => {
  return {
    showToast: (message: string, type: string, duration?: number) => {
      console.log(
        `Toast: ${message} (${type})${
          duration ? `, duration: ${duration}ms` : ""
        }`
      );
    },
  };
};

const ServiceWorkerRegistration = () => {
  const { showToast } = useToast();
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null
  );
  const [showReload, setShowReload] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Set up online/offline listeners
    const handleOnline = () => {
      showToast("You are now online", "success");
    };

    const handleOffline = () => {
      showToast("You are offline. Some features may be limited.", "warning");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Only register service worker in production
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      // Register the service worker
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );

          // Handle new service worker installation
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  // New content is available, show reload prompt
                  setWaitingWorker(newWorker);
                  setShowReload(true);
                  showToast(
                    "New version available! Click to update.",
                    "info",
                    10000
                  );
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });

      // Handle controller change (when the updated service worker takes control)
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        // Reload when the new service worker takes over
        window.location.reload();
      });
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [showToast]);

  // Function to update the service worker
  const updateServiceWorker = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
      setShowReload(false);
    }
  };

  if (!mounted) {
    return null;
  }

  if (showReload) {
    return (
      <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
        <button
          onClick={updateServiceWorker}
          className="bg-primary text-white py-2 px-4 rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
        >
          Update to new version
        </button>
      </div>
    );
  }

  return null;
};

export default ServiceWorkerRegistration;

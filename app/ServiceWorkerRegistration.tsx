"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ServiceWorkerRegistration() {
  const router = useRouter();

  useEffect(() => {
    // Check if the app is running in the browser
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Update online/offline status
      const updateOnlineStatus = () => {
        if (!navigator.onLine) {
          // Navigate to offline page when connection is lost
          router.push("/offline");
        }
      };

      // Check initial status
      updateOnlineStatus();

      // Add event listeners for online/offline events
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);

      // Register service worker manually to ensure it's loaded correctly
      const registerServiceWorker = async () => {
        try {
          // Wait for the page to fully load
          window.addEventListener("load", () => {
            // Register the service worker from the public directory
            navigator.serviceWorker
              .register("/custom-sw.js", { scope: "/" })
              .then((registration) => {
                console.log(
                  "Service Worker registered with scope:",
                  registration.scope
                );
              })
              .catch((error) => {
                console.error("Service Worker registration failed:", error);
              });

            // Force the service worker to update
            navigator.serviceWorker.ready.then((registration) => {
              registration.update();
            });
          });
        } catch (error) {
          console.error("Error registering service worker:", error);
        }
      };

      registerServiceWorker();

      // Clean up event listeners
      return () => {
        window.removeEventListener("online", updateOnlineStatus);
        window.removeEventListener("offline", updateOnlineStatus);
      };
    }
  }, [router]);

  // This component doesn't render anything, just registers the service worker
  return null;
}

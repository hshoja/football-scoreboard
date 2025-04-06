import { MetadataRoute } from "next";

// This ensures the file is statically generated for export
export const dynamic = "force-static";
export const revalidate = false;

// Function must be the default export
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Football Tournament Manager",
    short_name: "Football Manager",
    description: "Create and manage football tournaments and scores",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    orientation: "portrait-primary",
    dir: "auto",
    lang: "en",
    categories: ["sports", "productivity"],
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Create Tournament",
        short_name: "Create",
        description: "Create a new football tournament",
        url: "/?action=create",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: "View Standings",
        short_name: "Standings",
        description: "View tournament standings",
        url: "/standings",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
    ],
    screenshots: [
      {
        src: "/screenshots/home.svg",
        sizes: "1280x720",
        type: "image/svg+xml",
        platform: "windows",
        label: "Home Screen",
      },
      {
        src: "/screenshots/standings.svg",
        sizes: "1280x720",
        type: "image/svg+xml",
        platform: "windows",
        label: "Standings Screen",
      },
    ],
  };
}

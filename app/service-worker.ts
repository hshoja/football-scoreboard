export const dynamic = "force-static";

// This is a placeholder file for the service worker
// The actual service worker implementation is handled by next-pwa
export default function worker() {
  return new Response("", {
    headers: {
      "content-type": "text/javascript",
    },
  });
}

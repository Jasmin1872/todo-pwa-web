/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision?: string | null }>;
};

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") void self.skipWaiting();
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(self.registration.showNotification(data.title || "To-Do PWA", {
    body: data.body || "",
    icon: "/icons/Icon-192x192.png",
    tag: data.tag,
    data: { url: data.url || "/dashboard" },
  }));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = new URL(event.notification.data?.url || "/dashboard", self.location.origin).href;
  event.waitUntil(self.clients.openWindow(url));
});
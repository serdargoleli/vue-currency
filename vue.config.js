export const pwa = {
  name: "Güncel Kur",
  workboxPluginMode: "InjectManifest",
  workboxOptions: {
    // swSrc is required in InjectManifest mode.
    swSrc: "src/registerServiceWorker.js",
  },
};

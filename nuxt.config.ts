export default defineNuxtConfig({
  pages: true,

  modules: [
    "@pinia/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Fira Code": true,
          "PT Sans": true,
          "PT Serif": true,
          "PT Sans Caption": {
            wght: [700],
          },
        },
      },
    ],
    "nuxt-proxy",
  ],

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.css",
        },
      ],
      script: [
        { src: "https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" },
        { src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" },
        { src: "https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.js" },
      ],
    },
  },

  proxy: {
    options: {
      target: "http://127.0.0.1:8000/",
      changeOrigin: true,
      pathFilter: ["/api/v1.0.0/documents/analyze", "/api/v1.0.0/texts/rewrite"],
    },
  },
})

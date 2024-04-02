import process from "node:process";

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
          "PT Sans Caption": true,
          "PT Mono": true,
          "Golos Text": true,
          "Golos UI": true,
          Literata: {
            ital: [700],
          },
        },
      },
    ],
    "nuxt-proxy",
  ],

  css: ["~/assets/scss/main.scss"],

  app: {
    head: {
      charset: "utf8",
      viewport: "width=device-width, initial-scale=1",
      title: "Textflowrhyme",
    },
  },

  proxy: {
    options: {
      target:
        process.env.NODE_ENV === "production"
          ? "https://backend.textflowrhy.me"
          : "http://127.0.0.1:8000/",
      changeOrigin: true,
      pathFilter: [
        "/api/v1.0.0/documents/analyze",
        "/api/v1.0.0/texts/rewrite",
        "/api/v1.0.0/books",
        "/api/v1.0.0/pages",
        "/api/v1.0.0/authentication/jwt/login",
        "/api/v1.0.0/authentication/jwt/logout",
        "/api/v1.0.0/authentication/register",
        "/api/v1.0.0/users/me",
      ],
    },
  },

  nitro: {
    preset: "node-server",
  },

  typescript: {
    typeCheck: true,
    strict: true,
  },

  imports: {
    dirs: ["./stores"],
  },
});

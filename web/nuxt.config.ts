// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  head: {
    script: [{ src: "https://js.stripe.com/v3" }],
  },
  devtools: { enabled: true },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      stripePk: process.env.STRIPE_PK_KEY,
    },
  },
});

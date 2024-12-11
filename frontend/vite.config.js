import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
    },
  },
});

//* Test other configuration with different .env position.
// import react from "@vitejs/plugin-react";
// import { defineConfig, loadEnv } from "vite";

// // import path from "path";
// const path = require("path");

// // https://vitejs.dev/config/
// export default defineConfig(({ /* command , */ mode }) => {
//   // Charger le fichier .env basé sur le mode (development ou production)
//   const env = loadEnv(mode, path.resolve(__dirname, "../"), "");

//   return {
//     plugins: [react()],
//     resolve: {
//       alias: {
//         "@assets": path.resolve(__dirname, "src/assets"),
//         "@components": path.resolve(__dirname, "src/components"),
//         "@pages": path.resolve(__dirname, "src/pages"),
//         "@services": path.resolve(__dirname, "src/services"),
//       },
//     },
//     define: {
//       __APP_ENV__: JSON.stringify(env.APP_ENV),
//     },
//   };
// });

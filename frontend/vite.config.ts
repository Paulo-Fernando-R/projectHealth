import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            manifest: {
                name: "Saúde Localiza",
                short_name: "Saúde Localiza",
                description: "Encontre estabelecimentos de saúde próximos a você.",
                start_url: "/",
                display: "standalone",
            },
            workbox: {
                cleanupOutdatedCaches: true,
                maximumFileSizeToCacheInBytes: 5000000,
                globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
            },
        }),
    ],
});

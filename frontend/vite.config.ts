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
                icons: [
                    { src: "logo_alt1.png", sizes: "192x192", type: "image/png" },
                    { src: "logo_alt1.png", sizes: "512x512", type: "image/png" },
                ],
            },
            workbox: {
                cleanupOutdatedCaches: true,
                maximumFileSizeToCacheInBytes: 5000000,
                globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
            },
        }),
    ],
});

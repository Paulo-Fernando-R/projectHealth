import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            manifest: {
                id: "/",
                name: "Saúde Localiza",
                short_name: "Saúde Localiza",
                description: "Encontre estabelecimentos de saúde próximos a você.",
                start_url: "/",
                display: "standalone",
                theme_color: "#1E90FB",
                background_color: "#F5F5F5",

                screenshots: [
                    {
                        src: "screen_mobile.png",
                        sizes: "412x917",
                        type: "image/png",
                        form_factor: "wide",
                    },
                    {
                        src: "screen_desktop.png",
                        sizes: "1728x1117",
                        type: "image/png",
                        form_factor: "narrow",
                    },
                ],
                icons: [
                    { src: "logo192.png", sizes: "192x192", type: "image/png" },
                    { src: "logo512.png", sizes: "512x512", type: "image/png" },
                    { src: "logo1024.png", sizes: "1024x1024", type: "image/png" },
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

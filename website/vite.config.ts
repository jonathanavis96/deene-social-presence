import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables (including ones provided by GitHub Actions).
  // We don't filter by prefix here so that VITE_* vars are available.
  const env = loadEnv(mode, process.cwd(), "");

  // For a custom domain, production base should be "/".
  // If you ever need to deploy back to a GitHub *project* page, set:
  //   VITE_BASE_PATH=/deene-social-presence/
  const basePath = mode === "development" ? "/" : env.VITE_BASE_PATH || "/";

  return {
    base: basePath,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

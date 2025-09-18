import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

const r = (p: string) => new URL(p, import.meta.url).pathname;

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@routes":      r("./src/routes/"),
      "@components":  r("./src/components/"),
      "@store":       r("./src/store/"),
      "@services":    r("./src/services/"),
      "@domain":      r("./src/domain/"),
    },
  },
});

import path from 'path'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@routes":      path.resolve("./src/routes/"),
      "@components":  path.resolve("./src/components/"),
      "@store":       path.resolve("./src/store/"),
      "@services":    path.resolve("./src/services/"),
      "@domain":      path.resolve("./src/domain/"),
    },
  },
});

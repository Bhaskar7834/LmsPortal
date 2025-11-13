import { defineConfig } from "vite";      // ✅ this import is REQUIRED
import react from "@vitejs/plugin-react";  // if you're using React

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,  // ✅ change port here
    open: '/',   // ✅ automatically open Home Page
  },
});

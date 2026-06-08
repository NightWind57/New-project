import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.NETLIFY ? "/" : "/New-project/"
});

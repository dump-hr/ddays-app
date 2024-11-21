// vite.config.ts
import { defineConfig } from "file:///C:/Users/tomas/DUMP/ddays-app/ddays-app/apps/app/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/tomas/DUMP/ddays-app/ddays-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\tomas\\DUMP\\ddays-app\\ddays-app\\apps\\app";
var vite_config_default = defineConfig({
  plugins: [react()],
  base: "/app",
  server: {
    port: 3005,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/colors.scss";
          @import "./src/styles/fonts.scss";
          @import "./src/styles/mixins.scss";
        `
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0b21hc1xcXFxEVU1QXFxcXGRkYXlzLWFwcFxcXFxkZGF5cy1hcHBcXFxcYXBwc1xcXFxhcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHRvbWFzXFxcXERVTVBcXFxcZGRheXMtYXBwXFxcXGRkYXlzLWFwcFxcXFxhcHBzXFxcXGFwcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvdG9tYXMvRFVNUC9kZGF5cy1hcHAvZGRheXMtYXBwL2FwcHMvYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIGJhc2U6ICcvYXBwJyxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDMwMDUsXHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL2FwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgc2Nzczoge1xyXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgXHJcbiAgICAgICAgICBAaW1wb3J0IFwiLi9zcmMvc3R5bGVzL2NvbG9ycy5zY3NzXCI7XHJcbiAgICAgICAgICBAaW1wb3J0IFwiLi9zcmMvc3R5bGVzL2ZvbnRzLnNjc3NcIjtcclxuICAgICAgICAgIEBpbXBvcnQgXCIuL3NyYy9zdHlsZXMvbWl4aW5zLnNjc3NcIjtcclxuICAgICAgICBgLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtWLFNBQVMsb0JBQW9CO0FBQy9XLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFGakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLE1BQU07QUFBQSxFQUNOLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BS2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

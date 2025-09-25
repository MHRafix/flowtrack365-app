import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import nodePolyfills from 'rollup-plugin-polyfill-node';
// https://vite.dev/config/
export default defineConfig({
	plugins: [
		TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
		react(),
		tailwindcss(),
	],
	define: {
		global: 'globalThis', // ✅ Fix "global is not defined"
	},
	optimizeDeps: {
		include: ['draft-js'], // Ensures draft-js gets pre-bundled
	},
	build: {
		rollupOptions: {
			plugins: [nodePolyfills()],
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});

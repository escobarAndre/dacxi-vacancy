import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import dynamicImport from 'vite-plugin-dynamic-import'
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			dirs: ['src/components', 'src/views'],
			dts: 'src/components.d.ts'
		}),
		AutoImport({
			imports: ['@vueuse/core', 'vue'],
			dirs: ['src/core/events'],
			dts: 'src/auto-imports.d.ts'
		}),
		dynamicImport()
	]
});

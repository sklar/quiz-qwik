import { qwikCity } from '@builder.io/qwik-city/vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
// import browserslist from 'browserslist'
// import { browserslistToTargets } from 'lightningcss'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	// css: {
	// 	transformer: 'lightningcss',
	// 	lightningcss: {
	// 		targets: browserslistToTargets(browserslist.loadConfig({ path: '.' })!),
	// 		drafts: {
	// 			customMedia: true,
	// 		},
	// 	},
	// },
	plugins: [
		qwikCity(),
		qwikVite({
			// @see https://github.com/QwikDev/qwik/issues/6777
			// csr: true,
		}),
	],
})

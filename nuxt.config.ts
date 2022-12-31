// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	modules: [
		"@nuxtjs/tailwindcss",
		"@nuxtjs/color-mode",
		"@vueuse/nuxt",
		"nuxt-schema-org",
	],
	ignore: [
		"pages/convert/*.vue"
	],
	schemaOrg: {
		// set to your production domain
		canonicalHost: "https://tools.codef.site",
	},
	// https://color-mode.nuxtjs.org
	colorMode: {
		classSuffix: "",
	},
	runtimeConfig: {
		public: {
			DEV: process.env.DEV,
		},
		"google-adsense": {
			id: process.env.GOOGLE_ADSENSE_ID,
			test: process.env.DEV,
		},
		GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
	},
	build: {
		transpile: process.env.NODE_ENV === 'production'
			? [
				'naive-ui',
				'vueuc',
				'@css-render/vue3-ssr',
				'@juggle/resize-observer'
			]
			: ['@juggle/resize-observer','@headlessui/vue'],
		analyze: true,
	},
	vite: {
		build: {
			chunkSizeWarningLimit: 1000,
		},
		optimizeDeps: {
			include:
				process.env.NODE_ENV === 'development'
					? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
					: []
		}
	},
});

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	modules: [
		"@nuxtjs/tailwindcss",
		"@nuxtjs/color-mode",
		"@vueuse/nuxt",
		"nuxt-schema-org",
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
		transpile: ["@headlessui/vue"],
		analyze: true,
	},
	vite: {
		build: {
			chunkSizeWarningLimit: 1000,
		},
	},
});

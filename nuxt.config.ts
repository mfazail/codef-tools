import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	modules: [
		"@nuxtjs/tailwindcss",
		"@nuxtjs/color-mode",
		"@vueuse/nuxt",
		"nuxt-schema-org",
		"@nuxtjs/web-vitals",
		"@kevinmarrec/nuxt-pwa",
	],
	pwa: {
		workbox: {
			enabled: true,
		},
		meta: {
			name: "CodeF Tools",
			author: "Fazail Alam",
			description:
				"Online Tools that can help in your daily digital life.",
			theme_color: "#6366f1",
			ogHost: "https://tools.codef.site",
		},
		manifest: {
			name: "CodeF Tools",
			background_color: "#ffffff",
			description:
				"Online Tools that can help in your daily digital life.",
			short_name: "CodeF",
			theme_color: "#6366f1",
			display: "standalone",
			start_url: "/",
		},
		icon: {
			source: "./public/icons/1024.png",
		},
	},
	schemaOrg: {
		// set to your production domain
		canonicalHost: "https://tools.codef.site",
	},
	nitro: {
		prerender: {
			routes: ["/sitemap.xml"],
		},
	},
	webVitals: {
		// provider: process.env.DEV? "log": ,
		debug: process.env.DEV,
		disabled: process.env.DEV,
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
		extractCSS: true,
		transpile: ["@headlessui/vue"],
		analyze: true,
		optimizeCSS: true,
	},
	vite: {
		build: {
			chunkSizeWarningLimit: 1000,
		},
	},
});

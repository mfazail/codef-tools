<template>
	<NConfigProvider inlineThemeDisabled
		:themeOverrides="colorMode.value == 'dark' ? darkThemeOverrides : lightThemeOverrides"
		:theme="colorMode.value == 'dark' ? darkTheme : lightTheme">
		<NDialogProvider to="#dialog-portal">
			<NMessageProvider to="#message-portal">
				<div class="bg-white dark:bg-slate-800">
					<AppHeader />
					<main class="min-h-[500px] px-4 sm:px-2 mx-auto">
						<NuxtPage />
					</main>
					<Footer />
				</div>
			</NMessageProvider>
		</NDialogProvider>
		<div id="dialog-portal" />
		<div id="message-portal" />
	</NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NDialogProvider, NMessageProvider, darkTheme, lightTheme, type GlobalThemeOverrides } from 'naive-ui'
// https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9624538133715401
const appName = "CodeF Tools"
const colorMode = useColorMode()

const darkThemeOverrides: GlobalThemeOverrides = {
	common: {
		primaryColor: "#3b82f6",
		primaryColorHover: "#60a5fa",
		primaryColorPressed: "#93c5fd",
		primaryColorSuppl: "#2563eb",
		borderRadius: "5px",
		bodyColor: "#1e293b",
		popoverColor: "#334155",
		cardColor: "#1e293b",
	},
	Select: {
		peers: {
			InternalSelection: {
				color: "#334155"
			}
		}
	}
}
const lightThemeOverrides: GlobalThemeOverrides = {
	common: {
		primaryColor: "#3b82f6",
		primaryColorHover: "#60a5fa",
		primaryColorPressed: "#93c5fd",
		primaryColorSuppl: "#2563eb",
		borderRadius: "5px",
	}
}


useHead({
	bodyAttrs: {
		class: 'bg-white dark:bg-slate-800',
	},
	meta: [
		{
			charset: "utf-8"
		}, {
			name: "viewport",
			content: "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
		},
		{
			name: "application-name",
			content: appName
		},
		{
			name: "apple-mobile-web-app-capable",
			content: "yes"
		},
		{
			name: "apple-mobile-web-app-status-bar-style",
			content: "default"
		},
		{
			name: "apple-mobile-web-app-title",
			content: appName
		},
		{
			name: "mobile-web-app-capable",
			content: "yes"
		},
		{
			name: "msapplication-TileColor",
			content: "#6366f1"
		},
		{
			name: "theme-color",
			content: "#6366f1"
		},
	],
	link: [
		{
			rel: "apple-touch-icon",
			href: "/apple-touch-icon.png"
		},
		{
			rel: "apple-touch-icon",
			sizes: "180x180",
			href: "/apple-touch-icon.png"
		},
		{
			rel: "apple-touch-icon",
			sizes: "64x64",
			href: "/apple-touch-icon.png"
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "32x32",
			href: "/favicon-32x32.png"
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "16x16x",
			href: "/favicon-16x16.png"
		},
		{
			rel: "mask-icon",
			href: "/icon/72.png",
			color: "#6366f1"
		},
		{
			rel: "shortcut icon",
			href: "/favicon.ico"
		},
	],
	// script: [
	// 	{
	// 		async: true,
	// 		crossorigin:'anonymous',
	// 		src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9624538133715401',
	// 	}
	// ]
})
onMounted(() => {
	const meta = document.createElement('meta')
	meta.name = 'naive-ui-style'
	document.head.appendChild(meta)
})
</script>

<template>
	<div class="bg-white dark:bg-slate-800">
		<Meta charSet="utf-8" />
		<Meta name="viewport"
			content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<Meta name="application-name" content="CodeF Tools" />
		<Meta name="apple-mobile-web-app-capable" content="yes" />
		<Meta name="apple-mobile-web-app-status-bar-style" content="default" />
		<Meta name="apple-mobile-web-app-title" content="CodeF Tools" />
		<Meta name="format-detection" content="telephone=no" />
		<Meta name="mobile-web-app-capable" content="yes" />
		<Meta name="msapplication-TileColor" content="#6366f1" />
		<Meta name="msapplication-tap-highlight" content="no" />
		<Meta name="theme-color" content="#6366f1" />

		<Link rel="apple-touch-icon" href="/apple-touch-icon.png" />
		<Link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png" />
		<Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
		<Link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon.png" />

		<Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
		<Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
		<Link rel="mask-icon" href="/icons/72.png" color="#6366f1" />
		<Link rel="shortcut icon" href="/favicon.ico" />
		<Script async crossorigin="anonymous"
			src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9624538133715401">
		</Script>
		<!-- <InstallBanner /> -->
		<AppHeader />
		<main class="min-h-[500px] px-4 sm:px-2 max-w-4xl mx-auto">
			<NuxtPage />
		</main>
		<Footer />
	</div>
</template>

<script setup lang="ts">
useHead({
	bodyAttrs: {
		class: 'bg-white dark:bg-slate-800',
	},
})
</script>

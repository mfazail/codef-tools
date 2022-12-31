<script setup lang="ts">
import { getMeta } from '~~/utils/metaProperties';

const appConfig = useAppConfig()

const pageMeta = {
	base: "",
	title: "",
	description: "Online Tools that can help in your daily digital life.",
	keyword: "codef, online tools, qr generator, qr scanner, online, random quotes, quotes"
}
useHead({
	title: appConfig.name,
	meta: [
		...getMeta(pageMeta),
	],
});
useSchemaOrg([
	definePerson({
		name: "Fazail Alam",
		image: "https://fazail-alam.web.app/assets/me.jpg",
		sameAs: ["https://github.com/mfazail"],
	}),
	defineWebSite({
		name: appConfig.name,
		description:  appConfig.description,
		image: appConfig.icon,
		url: appConfig.url,
	}),
]);
</script>

<template>
	<div class="max-w-4xl mx-auto">

		<ClientOnly>
			<AdsByGoogle ad-client="ca-pub-9624538133715401" ad-slot="9011612592" />
		</ClientOnly>

		<div class="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			<tool-card title="Qr generator" iconClass="" icon="heroicons-outline:qrcode" url="qr-generator"
				description="Generate personalized qr code online of text or url." />
			<tool-card title="Qr scanner" iconClass="" icon="bi:qr-code-scan" url="qr-scanner"
				description="Scan and read the content of qr code." />
			<tool-card title="Random quotes" iconClass="" icon="bi:chat-quote-fill" url="random-quotes"
				description="Read random quotes or find quotes from different authors, category,etc." />
			<tool-card title="Highlight code" iconClass="" icon="ph:code-bold" url="code-highlight"
				description="Highlight code and generate images with nice vs code themes or copy the highlighted html." />
		</div>
		<!-- <NuxtLink to="/convert/binary/decimal">Test</NuxtLink> -->
	</div>
</template>

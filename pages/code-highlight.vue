<script setup lang="ts">
const appConfig = useAppConfig()
const pageMeta = {
	base: "/code-highlight",
	title: "Highlight code - ",
	description: "Highlight code and generate images with nice vs code themes or copy the highlighted html.",
	keyword: "highlight code online, code to image, highlight code, code to png, convert code to image, code in terminal image, code to image online, codef"
}
useHead({
	title:pageMeta.title + appConfig.name,
	meta: [
		...getMeta(pageMeta)
	]
})
</script>

<template>
	<CodeSet />
</template>
<style>
.shiki {
	@apply p-4 rounded-md
}

.shiki code {
	@apply whitespace-pre-wrap
}
</style>
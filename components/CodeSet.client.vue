<script setup lang="ts">
import { computed, h, nextTick, onMounted, ref, watch } from 'vue';
import { NInput, NSelect, NButton, useDialog } from 'naive-ui'
import { getHighlighter, BUNDLED_LANGUAGES, BUNDLED_THEMES } from 'shiki'
import type { Highlighter, Lang } from 'shiki'

let hl: Highlighter;
const mode = ref(false)
const language = ref<Lang>("javascript")
const theme = ref("github-dark")
const code = ref("console.log('Hello World')")
const renderedHtml = ref<string | null>(null);
const dialog = useDialog()

const fileName = ref("index.js")

const langs = BUNDLED_LANGUAGES.map((item) => ({
	label: item.id,
	value: item.id,
}))

const themes = BUNDLED_THEMES.map((item) => ({
	label: item,
	value: item,
}))

watch(theme, async (v) => {
	await nextTick(() => {
		return hl.loadTheme(v)
	})
	renderedHtml.value = reRender.value
})

watch(language, async (v) => {
	const lang = getLang.value
	await nextTick(async () => {
		if (lang?.embeddedLangs) {
			lang.embeddedLangs.forEach(async (l) => {
				await hl.loadLanguage(l)
			})
		}
		return hl.loadLanguage(v)
	})
	console.log("lang loaded")
	renderedHtml.value = reRender.value
})

watch(code, () => {
	renderedHtml.value = reRender.value
})
const getLang = computed(() => {
	return BUNDLED_LANGUAGES.find((l) => l.id === language.value)
})
const reRender = computed(() => {
	if (hl) {
		return hl.codeToHtml(code.value, { lang: language.value, theme: theme.value })
	}
	return ""
})

onMounted(async () => {
	// const responseWasm = await fetch("/onig.wasm");
	// const wasmArrayBuffer = await responseWasm.arrayBuffer();
	// setWasm(wasmArrayBuffer);
	// setCDN("https://unpkg.com/shiki/")
	hl = await getHighlighter({
		theme: 'github-dark',
		themes: ['github-dark'],
		langs: ['javascript'],
		paths: {
			wasm: '/',
			themes: '/themes/',
			languages: '/languages/',
		}
	})
	renderedHtml.value = reRender.value
	// console.log({BUNDLED_LANGUAGES})
})

const downlaodToPng = async () => {

}
const copyCode = () => {
	navigator.clipboard.writeText(code.value);
}
const handleName = () => {
	let oldName = fileName.value
	dialog.create({
		content: () => h(NInput, {
			value: fileName.value,
			type: 'text',
			"onUpdate:value": (v) => fileName.value = v
		}),
		positiveText: "Done",
		onPositiveClick: () => {
		},
		negativeText: "Cancel",
		onNegativeClick: () => {
			fileName.value = oldName
		},
	})
}
const handleMode = () => {
	if (document.documentElement.classList.contains('dark')) {
		document.documentElement.classList.remove('dark')
		mode.value = false;
	} else {
		document.documentElement.classList.add('dark')
		mode.value = true
	}
}
</script>

<template>
	<div class="flex w-full h-screen bg-slate-800">
		<div class="w-full h-full p-4">
			<div class="flex space-x-3 justify-around items-center pb-4">
				<NSelect filterable v-model:value="language" :options="langs" />
				<NSelect filterable v-model:value="theme" :options="themes" />
			</div>
			<NInput v-model:value="code" type="textarea"
				placeholder="Paste your code here..."
				class="h-[calc(100vh-80px)]" />
		</div>
		<div
			class="flex flex-col items-center justify-center w-full h-screen bg-slate-800 p-4 overflow-auto">
			<div class="flex items-center justify-end space-x-2 pb-4">
				<NButton @click="copyCode" quaternary>Copy</NButton>
				<NButton @click="downlaodToPng" type="primary">Download
				</NButton>
				<NButton @click="handleMode" quaternary>Mode</NButton>
			</div>
			<Suspense>
				<div id="wrapper"
					class="bg-gray-200 dark:bg-gray-900 shadow-md p-3 rounded-lg max-w-max">
					<div
						class="flex w-full justify-between items-center h-6 px-1 py-1 mb-2">
						<div class="flex space-x-2">
							<span
								class="block w-4 h-4 rounded-full bg-red-500" />
							<span
								class="block w-4 h-4 rounded-full bg-yellow-400" />
							<span
								class="block w-4 h-4 rounded-full bg-green-500" />
						</div>
						<span @click="handleName"
							class="cursor-pointer dark:text-white font-semibold">
							{{ fileName }}
						</span>
						<span />
					</div>
					<div v-if="renderedHtml" v-html="renderedHtml" />
				</div>
				<template #fallback>
					Loading...
				</template>
			</Suspense>
		</div>
	</div>
</template>
<style scoped>
.shiki {
	@apply p-4 rounded-md whitespace-pre-wrap w-full
}
</style>
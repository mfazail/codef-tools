<script setup lang="ts">
import { computed, h, nextTick, onMounted, ref, watch } from 'vue';
import { NInput, NSelect, NButton, useDialog } from 'naive-ui'
import { getHighlighter, BUNDLED_LANGUAGES, BUNDLED_THEMES } from 'shiki-es'
import type { Highlighter, Lang } from 'shiki-es'
import { Icon } from '@iconify/vue'
import { toPng } from 'html-to-image'
import { useElementSize } from '@vueuse/core'

let hl: Highlighter;
const mode = ref(false)
const language = ref<Lang>("javascript")
const theme = ref("github-dark")
const code = ref("console.log('Hello World')")
const renderedHtml = ref<string | null>(null);
const dialog = useDialog()
const el = ref<HTMLElement | null>()

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
	hl = await getHighlighter({
		theme: 'github-dark',
		themes: ['github-dark'],
		langs: ['javascript'],
	})
	renderedHtml.value = reRender.value
})

const downlaodToPng = async () => {
	const { width, height } = useElementSize(el.value)
	toPng(el.value!, {
		pixelRatio: 1,
		skipAutoScale: true,
		quality: 1,
		width: width.value,
		height: height.value,
	}).then((v) => {
		var a = document.createElement('a')
		a.download = `${language.value}_${theme.value}_codef.png`
		a.href = v
		a.click()
	})
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
	if (!el.value) return
	if (el.value!.classList.contains('dark')) {
		el.value!.classList.remove('dark')
		mode.value = false;
	} else {
		el.value!.classList.add('dark')
		mode.value = true
	}
}
</script>

<template>
	<div class="flex w-full h-screen bg-white dark:bg-slate-800">
		<div class="w-full h-full p-4 flex-1">
			<div class="flex space-x-3 justify-around items-center pb-4">
				<NSelect filterable v-model:value="language" :options="langs" />
				<NSelect filterable v-model:value="theme" :options="themes" />
			</div>
			<NInput v-model:value="code" type="textarea" placeholder="Paste your code here..."
				class="h-[calc(100vh-80px)]" />
		</div>
		<div class="flex flex-col items-center flex-1 p-4">
			<div class="flex items-center justify-end space-x-2 pb-4">

				<NButton @click="copyCode" quaternary>
					<Icon icon="material-symbols:content-copy" class="w-5 h-5" />
				</NButton>
				<NButton @click="handleMode" quaternary>
					<Icon icon="heroicons:sun" class="w-5 h-5" />
				</NButton>
				<NButton @click="downlaodToPng" type="primary">Download
				</NButton>
			</div>

			<div ref="el" id="wrapper" class="w-full h-auto bg-gray-200 dark:bg-gray-900 shadow-md p-3 rounded-lg">
				<div class="flex w-full justify-between items-center h-6 px-1 py-1 mb-2">
					<div class="flex space-x-2">
						<span class="block w-4 h-4 rounded-full bg-red-500" />
						<span class="block w-4 h-4 rounded-full bg-yellow-400" />
						<span class="block w-4 h-4 rounded-full bg-green-500" />
					</div>
					<span @click="handleName" class="cursor-pointer dark:text-white font-semibold">
						{{ fileName }}
					</span>
					<span />
				</div>
				<div v-if="renderedHtml" v-html="renderedHtml" />
			</div>
		</div>
	</div>
</template>

<style>
.shiki {
	@apply p-4 rounded-md
}

.shiki code {
	@apply whitespace-pre-wrap
}
</style>
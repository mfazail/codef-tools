<script setup lang="ts">
import { computed, h, nextTick, onMounted, ref, watch, type VNodeRef } from 'vue';
import { NInput, NSelect, NButton, useDialog, useMessage, NTooltip, NDropdown } from 'naive-ui'
import { getHighlighter, BUNDLED_LANGUAGES, BUNDLED_THEMES } from 'shiki-es'
import type { Highlighter, Lang } from 'shiki-es'
import { Icon } from '@iconify/vue'
import { toPng, toJpeg } from 'html-to-image'
import { useElementSize } from '@vueuse/core'
import { useGtag } from "vue-gtag-next";

let hl: Highlighter;
const language = ref<Lang>("javascript")
const theme = ref("github-dark")
const code = ref("console.log('Hello World')")
const renderedHtml = ref<string | null>(null);
const dialog = useDialog()
const message = useMessage()
const { event, pageview } = useGtag();
const config = useRuntimeConfig();
const el = ref<HTMLElement | null>()
const color = ref({
	bg: "#000",
	fg: "#ffffff"
})

const downloadOptions = [
	{
		label: 'To Png',
		key: 'png',
		icon: () => h(Icon, { icon:'ph:file-png',class:'w-5 h-5'})
	},
	{
		label: "To Jpg",
		key: "jpg",
		icon: () => h(Icon, { icon: 'ph:file-jpg', class: 'w-5 h-5' })
	},
]

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
	try {
		await nextTick(() => {
			return hl.loadTheme(v)
		})
		color.value.bg = hl.getBackgroundColor(theme.value)
		color.value.fg = hl.getForegroundColor(theme.value)
		renderedHtml.value = reRender.value
	} catch (e) {
		console.log({ e })
	}
})

watch(language, async (v) => {
	const lang = getLang.value
	try {
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
	} catch (e) {
		console.log({ e })
	}
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

	if (window.innerWidth < 900) {
		message.info("Hint: Download image in landscape mode for wider image.", {
			duration: 8000,
			closable: true,
		})
	}
	if (!config.public.DEV) {
		pageview({
			page_title: "Code Highlight",
			page_location: "https://tools.codef.site/code-highlight",
			page_path: "/code-highlight"
		})
	}
	color.value.bg = hl.getBackgroundColor(theme.value)
	color.value.fg = hl.getForegroundColor(theme.value)
})

const downlaodToPng = async () => {
	const div = document.getElementById('wrapper')
	const { width, height } = useElementSize(div)
	toPng(div!, {
		pixelRatio: 1,
		skipAutoScale: true,
		quality: 1,
		canvasWidth: width.value,
		canvasHeight: height.value,
		width: width.value,
		height: height.value,
	}).then((v) => {
		const a = document.createElement('a')
		a.download = `${language.value}_${theme.value}_codef.png`
		a.href = v
		a.click()
		if (!config.public.DEV) {
			event("code-highlight-download", {
				event_category: "code-highlight",
				event_label: "Code Highlight downloaded",
			});
		}
	}).catch((e) => {
		if (!config.public.DEV) {
			event("code-highlight-download", {
				event_category: "code-highlight",
				event_label: "Code highlight download failed",
				description: `${e}`
			});
		}
	}).finally(() => {
		if (!config.public.DEV) {
			event("code-highlight-download", {
				event_category: "code-highlight",
				event_label: "Code highlight download triggered",
			});
		}
	})
}
const downlaodToJpg = async () => {
	const div = document.getElementById('wrapper')
	const { width, height } = useElementSize(div)
	toJpeg(div!, {
		pixelRatio: 1,
		skipAutoScale: true,
		quality: 1,
		canvasWidth: width.value,
		canvasHeight: height.value,
		width: width.value,
		height: height.value,
	}).then((v) => {
		const a = document.createElement('a')
		a.download = `${language.value}_${theme.value}_codef.png`
		a.href = v
		a.click()
		if (!config.public.DEV) {
			event("code-highlight-download", {
				event_category: "code-highlight",
				event_label: "Code Highlight downloaded",
			});
		}
	}).catch((e) => {
		if (!config.public.DEV) {
			event("code-highlight-download", {
				event_category: "code-highlight",
				event_label: "Code highlight download failed",
				description: `${e}`
			});
		}
	}).finally(() => {
		if (!config.public.DEV) {
			event("code-highlight-download", {
				event_category: "code-highlight",
				event_label: "Code highlight download triggered",
			});
		}
	})
}
const copyCode = () => {
	navigator.clipboard.writeText(code.value);
	message.success('coppied to clipboard successfully')
}
const handleName = () => {
	let oldName = fileName.value;
	const inputRef = ref<VNodeRef | null>(null)
	const inputNode = () => h(NInput, {
		value: fileName.value,
		type: 'text',
		"onUpdate:value": (v) => fileName.value = v,
		onKeydown: (e) => {
			if (e.code == 'Enter') {
				if (fileName.value == oldName) {
					message.info("Nothing changed")
				} else {
					message.success("Renamed")
				}
				d.destroy()
			}
		},
		ref: inputRef
	})
	const revertName = () => {
		fileName.value = oldName
		message.info("Canceled renaming")
	}
	const d = dialog.create({
		icon: () => h(Icon, {
			icon: 'ph:align-center-horizontal-simple-light'
		}),
		title: "Filename",
		onAfterEnter: () => {
			inputRef.value.focus()
		},
		content: inputNode,
		positiveText: "Done",
		onPositiveClick: () => { 
			if (fileName.value == oldName) {
				message.info("Nothing changed")
			} else {
				message.success("Renamed")
			}
		},
		negativeText: "Cancel",
		onNegativeClick: revertName,
		onEsc: revertName,
		onClose: revertName,
		maskClosable: false,
	})
}

const download = (key: string) => {
	if (key == 'png') {
		downlaodToPng()
	} else if (key == 'jpg') {
		downlaodToJpg()
	}
}
</script>

<template>
	<div class="flex flex-col-reverse lg:flex-row justify-end w-full min-h-screen bg-white dark:bg-slate-800">
		<div class="w-full h-full p-4 lg:flex-1">
			<NInput v-model:value="code" type="textarea" placeholder="Paste your code here..."
				class="lg:h-[calc(100vh-80px)]" rows="12" />
		</div>
		<div ref="el" class="flex flex-col items-center justify-start lg:flex-1 p-4">
			<div class="flex flex-wrap w-full items-center justify-end gap-3 pb-4">
				<div class="flex space-x-3 justify-around items-center">
					<NSelect filterable v-model:value="language" :options="langs" />
					<NSelect filterable v-model:value="theme" :options="themes" />
				</div>
				<NTooltip placement="bottom-end" to="#popover-portal" display-directive="if">
					<template #trigger>
						<NButton @click="copyCode" quaternary>
							<Icon icon="material-symbols:content-copy" class="w-5 h-5" />
						</NButton>
					</template>
					Copy highlighted raw html
				</NTooltip>
				<NDropdown to="#popover-portal" size="large" :options="downloadOptions" @select="download">
					<NButton type="primary">Download
					</NButton>
				</NDropdown>
			</div>

			<div id="wrapper" class="w-full h-auto shadow-md rounded-lg" :style="{ background: color.bg }">
				<div class="flex w-full justify-between items-center p-3 mb-3">
					<div class="flex space-x-2">
						<span class="block w-4 h-4 rounded-full bg-red-500" />
						<span class="block w-4 h-4 rounded-full bg-yellow-400" />
						<span class="block w-4 h-4 rounded-full bg-green-500" />
					</div>
					<span @click="handleName" class="cursor-pointer font-semibold" :style="{ color: color.fg }">
						{{ fileName }}
					</span>
					<span class="w-16" />
				</div>
				<div v-if="renderedHtml" v-html="renderedHtml" class="px-3 pb-3" />
			</div>
		</div>
	</div>
</template>

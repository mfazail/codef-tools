<script setup lang="ts">
import { ref } from "vue";
import QrcodeVue from "qrcode.vue";
import { useGtag } from "vue-gtag-next";
import { Icon } from "@iconify/vue";
import { NButton, NInput, NInputGroup, NPopover, NSelect } from "naive-ui";

const pageMeta = {
	base: "/qr-generator",
	title: "Generate Qr code - ",
	description: "Generate personalized qr code online of text or url.",
	keyword: "random qr generator, qr code online, color qr code, qr code generator,codef"
}

type Level = "L" | "M" | "Q" | "H";
let qrCanvas = ref();
let aref = ref<HTMLAnchorElement | null>(null);
const message = ref("Place your text here");
const size = ref("200");
const margin = ref("2");
const background = ref("#ffffff");
const foreground = ref("#000000");
const level = ref<Level>("L");

const appConfig = useAppConfig()

const levelOptions = [
	{
		label: "L",
		value: "L"
	},
	{
		label: "M",
		value: "M"
	},
	{
		label: "Q",
		value: "Q"
	},
	{
		label: "H",
		value: "H"
	},
]

const { event } = useGtag();
const config = useRuntimeConfig();

useHead({
	title: pageMeta.title + appConfig.name,
	meta: [
		...getMeta(pageMeta)
	],
});
useSchemaOrg([
	defineWebPage({
		name: pageMeta.title + appConfig.name,
		description: pageMeta.description,
	}),
]);

const download = () => {
	if (aref.value != null) {
		var image = qrCanvas.value.$el
			.toDataURL("image/png")
			.replace("image/png", "image/octet-stream");
		aref.value?.setAttribute("href", image);

		aref.value.download = "qr-code_codef.png";
		aref.value?.click();
		aref.value?.setAttribute("href", "");
		if (!config.public.DEV) {
			event("qr-download", {
				event_category: "qr",
				event_label: "Qr Download",
			});
		}
	}
};
</script>

<template>
	<div class="mt-5 max-w-4xl mx-auto">
		<AdsByGoogle ad-client="ca-pub-9624538133715401" ad-slot="9011612592" />

		<a ref="aref" class="hidden"></a>
		<div class="flex items-center justify-center">
			<QrcodeVue ref="qrCanvas" :value="message" :size="parseInt(size)" :background="background"
				:foreground="foreground" :level="level" :margin="parseInt(margin)" />
		</div>

		<div class="mt-4">
			<label for="message" class="block text-sm font-medium text-gray-700 dark:text-white">
				Text
			</label>
			<div class="mt-1">
				<NInput type="textarea" v-model="message" id="message" rows="4" placeholder="Place your text here" />
			</div>
		</div>
		<div class="mt-4 w-full grid grid-cols-1 sm:grid-cols-6 place-items-center gap-3">
			<div class="sm:col-span-2 xl:col-span-2">
				<label for="size" class="block text-sm font-medium text-gray-700 dark:text-white">Size</label>
				<NInputGroup>
					<NInput type="text" v-model:value="size" id="size" placeholder="0.00" />
					<NSelect v-model:value="level" style="width:20%" :options="levelOptions" />
				</NInputGroup>
			</div>
			<div class="sm:col-span-2 xl:col-span-2">
				<label for="margin" class="block text-sm font-medium text-gray-700 dark:text-white">
					Margin
				</label>
				<NInput v-model:value="margin" id="margin" type="text" />
			</div>
			<div class="sm:col-span-1">
				<span class="block text-sm font-medium text-gray-700 dark:text-white">
					Background Color
				</span>
				<NPopover to="#dialog-portal" raw trigger="click" display-directive="if" placement="right-end" class="rounded-xl">
					<template #trigger>
						<div
							class="flex items-center cursor-pointer space-x-2 p-2 border dark:border-slate-700 max-w-min rounded-md">
							<div class="h-8 w-12 rounded-md shadow-sm" :style="{ background: background }"></div>
							<Icon icon="heroicons:chevron-down" class="w-5 dark:text-white" />
						</div>
					</template>
					<ColorPicker v-model="background" />
				</NPopover>
			</div>
			<div class="sm:col-span-1">
				<span class="block text-sm font-medium text-gray-700 dark:text-white">
					Foreground Color
				</span>
				<NPopover to="#dialog-portal" raw trigger="click" display-directive="if" placement="right-end" class="rounded-xl">
					<template #trigger>
						<div
							class="flex items-center cursor-pointer space-x-2 p-2 border dark:border-slate-700 max-w-min rounded-md">
							<div class="h-8 w-12 rounded-md shadow-sm" :style="{ background: foreground }"></div>
							<Icon icon="heroicons:chevron-down" class="w-5 dark:text-white" />
						</div>
					</template>
					<ColorPicker v-model="foreground" />
				</NPopover>
			</div>
		</div>
		<div class="flex justify-end mt-6">
			<NButton @click="download" type="primary">
				Download
			</NButton>
		</div>
	</div>
</template>

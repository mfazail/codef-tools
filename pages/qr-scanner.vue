<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useGtag } from "vue-gtag-next";
import { NButton, NUpload, useDialog, useMessage, UploadFileInfo } from 'naive-ui'
import QrScanner from 'qr-scanner';
import { useWindowSize } from "@vueuse/core";

const pageMeta = {
	base: "/qr-scanner",
	title: "Scan Qr code - ",
	description: "Scan and read the content of qr code.",
	keyword: "codef, online tools, qr scan online, qr code scanner, qrcode, qr code reader"
}

const appConfig = useAppConfig()

useHead({
	title: pageMeta.title + appConfig.name,
	meta: [
		...getMeta(pageMeta),
	],
});
useSchemaOrg([
	defineWebPage({
		name: pageMeta.title + appConfig.name,
		description: pageMeta.description,
	}),
]);

const scanning = ref(false);
const flash = ref(false)
let videoEl = ref<HTMLVideoElement | null>(null);
let qrScanner: QrScanner;

const rConfig = useRuntimeConfig();
const { event } = useGtag();
const dialog = useDialog()
const message = useMessage()
const { width, height } = useWindowSize()

onMounted(() => {
	qrScanner = new QrScanner(videoEl.value!,
		(result: QrScanner.ScanResult) => {
			console.log(result)
			dialog.destroyAll()
			dialog.success({
				title: "Result:",
				content: result.data
			})
		},
		{
			onDecodeError: (err) => {
				// console.log({err})
			},
			preferredCamera: 'environment',
			calculateScanRegion: (v) => {
				Object.assign(v.style, {
					width: `${width.value - 60}px`,
					height: `${height.value - 250}px`,
					opacity: 1,
				})
			},
		}
	);
});

const startScan = () => {
	if (scanning.value) return;
	if (!qrScanner) return;
	qrScanner.start()
	scanning.value = true;
	if (!rConfig.public.DEV) {
		event('qr-scan', {
			description: "Qr scan started",
			event_label: "qr_scan"
		})
	}
};

const stopScan = () => {
	if (!scanning.value) return;
	if (!qrScanner) return;
	scanning.value = false;
	qrScanner.stop()
};

const toggleFlash = async () => {
	if (await qrScanner.hasFlash()) {
		await qrScanner.toggleFlash()
		flash.value = qrScanner.isFlashOn()
	} else {
		message.error("No flashlight found")
	}
}

const scanFromFile = (options: { file: UploadFileInfo, fileList: Array<UploadFileInfo>, event?: Event }) => {
	if (!options.file.file) return;
	QrScanner.scanImage(options.file.file, { returnDetailedScanResult: true })
		.then(result => {
			dialog.success({
				title: "Result:",
				content: result.data,
			})
		})
		.catch(e => {
			// console.log(e)
			message.error(e)
		});
}


onBeforeUnmount(() => {
	qrScanner.destroy()
});
</script>

<template>
	<div class="w-full max-w-4xl mx-auto">
		<AdsByGoogle ad-client="ca-pub-9624538133715401" ad-slot="9011612592" />

		<div class="mt-5 flex flex-col justify-center items-center w-full">

			<video v-show="scanning" ref="videoEl" class="aspect-[9/16] min-w-[350px] h-[700px] rounded-md"></video>
			<div v-show="!scanning"
				class="aspect-[9/16] relative flex flex-col items-center justify-center min-w-[300px] min-h-[450px] max-h-[550px] bg-gray-300 dark:bg-gray-700 rounded-md">
				<Icon icon="heroicons-outline:camera" class="w-10 h-10 text-slate-500 bg-slate-900 rounded-full p-2" />
				<p class="text-xs mt-3">
					Click
					<span class="text-indigo-500 font-semibold">below button</span>
					to start scanning.
				</p>
			</div>
			<div class="flex items-center justify-center mt-5">
				<div v-show="!scanning" class="flex items-center space-x-2 ">
					<NButton type="primary" @click="startScan">
						Start Scan
					</NButton>
					<NUpload @change="scanFromFile" :show-file-list="false" :default-upload="false">
						<NButton secondary>
							<template #icon>
								<Icon icon="ic:baseline-upload-file" />
							</template>
							Scan from file
						</NButton>
					</NUpload>
				</div>
				<div v-show="scanning" class="flex items-center space-x-2 ">
					<NButton @click="stopScan" type="primary">
						Stop Scan
					</NButton>
					<NButton v-if="qrScanner" @click="toggleFlash" circle secondary>
						<template #icon>
							<Icon
								:icon="flash ? 'material-symbols:flashlight-on' : 'material-symbols:flashlight-off'" />
						</template>
					</NButton>
				</div>
			</div>
		</div>
	</div>
</template>

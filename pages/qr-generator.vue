<script setup lang="ts">
import { ref } from "vue";
import QrcodeVue from "qrcode.vue";
import { useGtag } from "vue-gtag-next";
import { Sketch } from "@ckpack/vue-color";

type Level = "L" | "M" | "Q" | "H";
let qrCanvas = ref();
let aref = ref<HTMLAnchorElement | null>(null);
var message = ref("Place your text here");
var size = ref(200);
var margin = ref(2);
var background = ref({ hex8: "#ffffff" });
var foreground = ref({ hex8: "#000000" });
var level = ref<Level>("L");
var bgShow = ref(false);
var fgShow = ref(false);

const bgToggle = () => {
    bgShow.value = !bgShow.value;
    fgShow.value = false;
};
const fgToggle = () => {
    fgShow.value = !fgShow.value;
    bgShow.value = false;
};

const { event } = useGtag();
const config = useRuntimeConfig();

useHead({
    title: "Generate Qr code - CodeF Tools",
    meta: [
        {
            name: "description",
            content: "Generate personalized qr code online of text or url.",
        },
        {
            name: "keyword",
            content:
                "random qr generator, qr code online, color qr code, qr code generator,codef",
        },
    ],
});
useSchemaOrg([
    defineWebPage({
        name: "Generate Qr code - CodeF Tools",
        description: "Generate personalized qr code online of text or url.",
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
        // console.log(image);
    }
};
</script>

<template>
    <div class="mt-5 max-w-4xl mx-auto">
        <Meta name="twitter:card" content="summary" />
        <Meta
            name="twitter:url"
            content="https://tools.codef.site/qr-generator"
        />
        <Meta name="twitter:title" content="Generate Qr code - CodeF Tools" />
        <Meta
            name="twitter:description"
            content="Generate personalized qr code online of text or url."
        />
        <Meta
            name="twitter:image"
            content="https://tools.codef.site/icons/512.png"
        />
        <Meta name="twitter:creator" content="@mfazail_alam" />
        <Meta property="og:type" content="website" />
        <Meta property="og:title" content="Generate Qr code - CodeF Tools" />
        <Meta
            property="og:description"
            content="Generate personalized qr code online of text or url."
        />
        <Meta
            property="og:site_name"
            content="Generate Qr code - CodeF Tools"
        />
        <Meta
            property="og:url"
            content="https://tools.codef.site/qr-generator"
        />
        <Meta
            property="og:image"
            content="https://tools.codef.site/icons/512.png"
        />
        
        <div>
            <AdsByGoogle ad-client="ca-pub-9624538133715401" ad-slot="9011612592" />

            <a ref="aref" class="hidden"></a>
            <div class="flex items-center justify-center">
                <QrcodeVue
                    ref="qrCanvas"
                    :value="message"
                    :size="size"
                    :background="background.hex8"
                    :foreground="foreground.hex8"
                    :level="level"
                    :margin="margin"
                />
            </div>

            <div class="mt-4">
                <label
                    for="message"
                    class="block text-sm font-medium text-gray-700 dark:text-white"
                >
                    Text
                </label>
                <div class="mt-1">
                    <textarea
                        v-model="message"
                        id="message"
                        rows="4"
                        placeholder="Place your text here"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-slate-600 rounded-md dark:bg-gray-800 dark:text-white"
                    />
                </div>
            </div>
            <div class="mt-4">
                <label
                    for="size"
                    class="block text-sm font-medium text-gray-700 dark:text-white"
                    >Size</label
                >
                <div class="mt-1 relative rounded-md shadow-sm">
                    <input
                        type="text"
                        v-model="size"
                        id="size"
                        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 dark:border-slate-600 rounded-md dark:bg-gray-800 dark:text-white"
                        placeholder="0.00"
                    />
                    <div class="absolute inset-y-0 right-0 flex items-center">
                        <label for="level" class="sr-only">Level</label>
                        <select
                            id="level"
                            v-model="level"
                            class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 dark:text-white sm:text-sm rounded-md"
                        >
                            <option class="dark:bg-gray-800">L</option>
                            <option class="dark:bg-gray-800">M</option>
                            <option class="dark:bg-gray-800">Q</option>
                            <option class="dark:bg-gray-800">H</option>
                        </select>
                    </div>
                </div>
            </div>
            <div
                class="w-full flex flex-col sm:flex-row justify-between items-center sm:space-x-4"
            >
                <div class="mt-4 w-full relative">
                    <div
                        v-show="bgShow"
                        @click="bgShow = false"
                        class="fixed top-0 left-0 w-screen h-screen"
                    ></div>
                    <div>
                        <h1
                            class="block text-sm font-medium text-gray-700 dark:text-white"
                        >
                            Background Color
                        </h1>
                    </div>
                    <div
                        @click="bgToggle"
                        class="h-8 w-12 cursor-pointer rounded-md shadow-sm"
                        :style="{ background: background.hex8 }"
                    ></div>
                    <div
                        v-show="bgShow"
                        class="mt-1 absolute top-5 left-0 z-30"
                    >
                        <Sketch v-model="background" />
                    </div>
                </div>
                <div class="mt-4 w-full relative">
                    <div
                        v-show="fgShow"
                        @click="fgShow = false"
                        class="fixed top-0 left-0 w-screen h-screen"
                    ></div>
                    <div>
                        <h1
                            class="block text-sm font-medium text-gray-700 dark:text-white"
                        >
                            Foreground Color
                        </h1>
                    </div>
                    <div
                        @click="fgToggle"
                        class="h-8 w-12 cursor-pointer rounded-md shadow-sm"
                        :style="{ background: foreground.hex8 }"
                    ></div>
                    <div
                        v-show="fgShow"
                        class="mt-1 absolute top-5 left-0 z-30"
                    >
                        <Sketch v-model="foreground" />
                    </div>
                </div>
                <div class="mt-4 w-full">
                    <label
                        for="margin"
                        class="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                        Margin
                    </label>
                    <div class="mt-1">
                        <input
                            v-model="margin"
                            id="margin"
                            type="text"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-slate-600 rounded-md dark:bg-gray-800"
                        />
                    </div>
                </div>
            </div>
            <div class="flex justify-end mt-6">
                <button
                    @click="download"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Download
                </button>
            </div>
        </div>
    </div>
</template>

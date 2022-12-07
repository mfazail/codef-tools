<script setup lang="ts">
import { ref } from "vue";
import { Html5Qrcode } from "html5-qrcode";
import { Icon } from "@iconify/vue";
import { Html5QrcodeError, Html5QrcodeResult } from "html5-qrcode/esm/core.js";
import Dialog from "@/components/Dialog.vue";
import { useGtag } from "vue-gtag-next";

var scanning = ref(false);
var decoded = ref(false);
var result = ref("");
let html5QrCode: Html5Qrcode;
useNuxtApp().hook("app:suspense:resolve", () => {
    html5QrCode = new Html5Qrcode("reader");
});
const rConfig = useRuntimeConfig();
const { event } = useGtag();
const qrCodeSuccessCallback = (
    decodedText: string,
    decodedResult: Html5QrcodeResult
) => {
    /* handle success */
    decoded.value = true;
    // console.log(decodedText);
    // console.log(decodedResult);
    result.value = decodedText;
    if (!rConfig.public.DEV) {
        event("qr-scanned", {
            event_category: "qr",
            event_label: "Qr Scanned - " + decodedText,
        });
    }
};
const qrCodeErrorCallback = (
    decodedText: String,
    decodedResult: Html5QrcodeError
) => {
    // console.log(decodedText);
    // console.log(decodedResult);
    if (!rConfig.public.DEV) {
        event("qr-scanned", {
            event_category: "qr",
            event_label: "Qr Error - " + decodedText,
            error: decodedResult,
        });
    }
};
const config = { fps: 20, aspectRatio: 9 / 16 };
// If you want to prefer back camera

const startScan = () => {
    if (scanning.value) return;
    if (!html5QrCode) {
        console.log(html5QrCode);
        html5QrCode = new Html5Qrcode("reader");
    }
    decoded.value = false;
    html5QrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        qrCodeErrorCallback
    );
    scanning.value = true;
};
const stopScan = () => {
    if (!scanning.value) return;
    scanning.value = false;
    decoded.value = false;
    html5QrCode
        .stop()
        .then((ignore) => {
            // QR Code scanning is stopped.
            console.log("Scanning stopped");
        })
        .catch((err) => {
            console.log("Stop Falied");
            // Stop failed, handle it.
        });
};
onBeforeUnmount(() => {
    if (scanning.value) html5QrCode.stop();
});
useHead({
    title: "Scan Qr code - CodeF",
    meta: [
        {
            name: "description",
            content: "Scan and read the content of qr code.",
        },

        {
            name: "keyword",
            content: "qr code scanner, qrcode, qr code reader, codef",
        },
    ],
});
useSchemaOrg([
    defineWebPage({
        name: "Scan Qr code - CodeF Tools",
        description: "Scan and read the content of qr code.",
    }),
]);
</script>

<template>
    <div class="w-full">
        <AdsByGoogle ad-client="ca-pub-9624538133715401" ad-slot="9011612592" />

        <div class="mt-5 flex flex-col justify-center items-center w-full">
            <Meta name="twitter:card" content="summary" />
            <Meta
                name="twitter:url"
                content="https://tools.codef.site/qr-scanner"
            />
            <Meta name="twitter:title" content="Scan Qr code - CodeF" />
            <Meta
                name="twitter:description"
                content="Scan and read the content of qr code."
            />
            <Meta
                name="twitter:image"
                content="https://tools.codef.site/icons/512.png"
            />
            <Meta name="twitter:creator" content="@mfazail_alam" />
            <Meta property="og:type" content="website" />
            <Meta property="og:title" content="Scan Qr code - CodeF" />
            <Meta
                property="og:description"
                content="Scan and read the content of qr code."
            />
            <Meta property="og:site_name" content="Scan Qr code - CodeF" />
            <Meta
                property="og:url"
                content="https://tools.codef.site/qr-scanner"
            />
            <Meta
                property="og:image"
                content="https://tools.codef.site/icons/512.png"
            />
            <Script
                async
                crossorigin="anonymous"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9624538133715401"
            ></Script>

            <Dialog
                :show="decoded"
                :title="result"
                :url="result"
                @closed="decoded = false"
            />
            <div
                v-show="scanning"
                id="reader"
                class="aspect-[9/16] min-w-[300px] min-h-[400px] rounded-md"
            ></div>
            <div
                v-show="!scanning"
                class="aspect-[9/16] relative flex flex-col items-center justify-center min-w-[300px] min-h-[450px] max-h-[550px] bg-gray-300 dark:bg-gray-700 rounded-md"
            >
                <Icon
                    icon="heroicons-outline:camera"
                    class="w-10 h-10 text-slate-500 bg-slate-900 rounded-full p-2"
                />
                <p class="text-xs mt-3">
                    Click
                    <span class="text-indigo-500 font-semibold"
                        >below button</span
                    >
                    to start scanning.
                </p>
            </div>
            <div class="flex items-center justify-center mt-5">
                <button
                    v-show="!scanning"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="startScan"
                >
                    Start Scan
                </button>
                <button
                    v-show="scanning"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="stopScan"
                >
                    Stop Scan
                </button>
            </div>
            <div class="w-full" v-show="decoded">
                <h1 class="font-bold text-xl">Result</h1>
                <h1 class="mt-2">{{ result }}</h1>
            </div>
        </div>
    </div>
</template>

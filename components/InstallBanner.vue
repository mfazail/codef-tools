<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div v-show="show" class="fixed z-50 bottom-3 lg:right-2 w-full lg:max-w-3xl">
        <div class="bg-indigo-500 py-2 px-3 mx-4 rounded-md">
            <div class="max-w-5xl sm:px-6 lg:px-8 mx-auto flex items-center justify-between">
                <div class="w-0 flex-1 flex items-center">
                    <span class="flex p-2 rounded-lg bg-indigo-800">
                        <Icon
                            name="line-md:download-outline"
                            icon="line-md:download-outline"
                            class="h-6 w-6 text-white"
                            aria-hidden="true"
                        />
                    </span>
                    <p class="ml-3 font-medium text-white truncate">
                        <span class="md:hidden"> Install this site.</span>
                        <span class="hidden md:inline">
                            Install this website and use tools offline
                            too.</span
                        >
                    </p>
                </div>
                <div
                    class="order-2 flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto"
                >
                    <button
                        @click="install"
                        class="flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                    >
                        Install
                    </button>
                </div>
                <div class="order-3 flex-shrink-0 sm:order-3 sm:ml-3">
                    <button
						@click="close"
                        type="button"
                        class="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                    >
                        <span class="sr-only">Dismiss</span>
                        <Icon
                            name="heroicons-outline:x"
                            icon="heroicons-outline:x"
                            class="h-6 w-6 text-white"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
// This variable will save the event for later use.
let deferredPrompt;
let show = ref(false);
const close = () => {
	show.value = false;
}
onMounted(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
        // Prevents the default mini-infobar or install dialog from appearing on mobile
        e.preventDefault();
        // Save the event because you'll need to trigger it later.
        deferredPrompt = e;
        // Show your customized install prompt for your PWA
        // Your own UI doesn't have to be a single element, you
        // can have buttons in different locations, or wait to prompt
        // as part of a critical journey.
        show.value = true;
    });
});

const install = async () => {
    deferredPrompt.prompt();
    // Find out whether the user confirmed the installation or not
    // const { outcome } = await deferredPrompt.userChoice;
    // The deferredPrompt can only be used once.
    deferredPrompt = null;
    // Act on the user's choice
    // if (outcome === "accepted") {
    //     console.log("User accepted the install prompt.");
    // } else if (outcome === "dismissed") {
    //     console.log("User dismissed the install prompt");
    // }
    show.value = false;
};

onBeforeUnmount(() => {
    window.removeEventListener("beforeinstallprompt", (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
    });
});
</script>

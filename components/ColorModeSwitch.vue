<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps({
    size: {
        type: String,
        default: "w-8 h-8",
    },
    spacing: {
        type: String,
        default: "p-0",
    },
});

const colorMode = useColorMode();
const onClick = () =>
    colorMode.value === "light"
        ? (colorMode.preference = "dark")
        : (colorMode.preference = "light");
</script>

<template>
    <button
        aria-label="Color Mode"
        class="inline-block rounded-full p-1"
        @click="onClick"
    >
        <ColorScheme placeholder="...">
            <Icon
                v-if="colorMode.value == 'dark'"
                icon="heroicons-outline:moon"
                class="w-5 h-5"
            />
            <Icon
                v-else
                icon="heroicons-outline:sun"
                class="w-5 h-5 "
            />
        </ColorScheme>
    </button>
</template>

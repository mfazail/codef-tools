<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>
<template>
    <div class="w-full">
        <div class="bg-indigo-500 py-2 rounded-md">
            <div
                class="max-w-5xl px-4 mx-auto flex items-center justify-between"
            >
                <div class="w-0 flex-1 flex items-center">
                    <span class="flex p-2 rounded-lg bg-indigo-800">
                        <Icon
                            name="line-md:construction"
                            icon="line-md:construction"
                            class="h-6 w-6 text-white"
                            aria-hidden="true"
                        />
                    </span>
                    <p class="ml-3 font-medium text-white truncate">
                        <span class="inline"
                            >This page is in developement.</span
                        >
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

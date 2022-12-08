<script setup lang="ts">
import { ValidType, isValidType } from "~/composables/convert";
const route = useRoute();
var convertFrom = route.params["from"];
var convertTo = route.params["to"];

var isValid = ref<ValidType>();
var v = ref<string>();

isValid = computed(() =>
    isValidType(convertFrom as string, convertTo as string)
);

// console.log(route.params);
// console.log(0b1001)
// console.log(0B1001)
// console.log(0o10)
// console.log(0xF)
</script>

<template>
    <div class="w-full">
        <div>
            <InDev />
        </div>
        <div>
            <div v-if="!isValid!.isSupported">
                <p>
                    Converting form {{ convertFrom }} to {{ convertTo }} is Not
                    supported yet.
                </p>
            </div>
            <div v-else>
                <div class="mt-4">
                    <label
                        for="number"
                        class="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                        Number
                    </label>
                    <div class="mt-1">
                        <input
                            type="text"
                            v-model="v"
                            id="number"
                            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 dark:border-slate-600 rounded-md dark:bg-gray-800 dark:text-white"
                            placeholder="0.00"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

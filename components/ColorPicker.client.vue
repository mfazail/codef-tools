<script lang="ts" setup>
import { NInput } from 'naive-ui';
import 'vanilla-colorful/hex-alpha-color-picker.js'
withDefaults(defineProps<{
	modelValue: string,
}>(), {
	modelValue: "#ffffff"
})
let emit = defineEmits(['update:modelValue'])
const handleColorChanged = (e: any) => {
	emit('update:modelValue', e.target.color)
}
const handleInputChanged = (value: string) => {
	emit('update:modelValue', value)
}
</script>

<template>
	<div class="bg-white dark:bg-slate-700 max-w-[235px] rounded-xl shadow dark:shadow-black/30 border dark:border-slate-600 p-4">
		<hex-alpha-color-picker :color="modelValue" @color-changed="handleColorChanged"></hex-alpha-color-picker>
		<div class="flex items-center mt-3 w-full space-x-2">
			<div class=" rounded-md px-2 py-1 inline-flex">
				<span class="block">HEX</span>
			</div>
			<NInput :value="modelValue" @input="handleInputChanged" class="flex-1" />
		</div>
	</div>
</template>
<script setup>
	import { Icon } from '@iconify/vue';
	defineProps({
		title: String,
		url: String,
		icon: String,
		iconClass: String,
		description:String
	});
</script>

<template>
	<router-link :to="url">
		<div class="p-4 shadow-md rounded-md bg-white dark:bg-gray-700">
			<div class="flex">
				<div class="rounded-full bg-indigo-500 p-2">
					<Icon :icon="icon" :class="iconClass" class="w-5 h-5 text-white" />
				</div>
				<h1 class="text-lg pl-3 dark:text-white">{{ title }}</h1>
			</div>
			<p class=" pl-12 text-sm text-gray-600 dark:text-gray-300">{{description}}</p>
		</div>
	</router-link>
</template>

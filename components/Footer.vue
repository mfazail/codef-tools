<template>
	<footer class="bg-white dark:bg-slate-800 dark:text-white">
		<div
			class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8"
		>
			<nav
				class="-mx-5 -my-2 flex flex-wrap justify-center"
				aria-label="Footer"
			>
				<div
					v-for="item in navigation.main"
					:key="item.name"
					class="px-5 py-2"
				>
					<a
						:href="item.href"
						class="text-base text-gray-500 hover:text-white"
					>
						{{ item.name }}
					</a>
				</div>
			</nav>
			<div class="mt-8 flex justify-center space-x-6">
				<a
					v-for="item in navigation.social"
					:key="item.name"
					:href="item.href"
					class="text-gray-400 hover:text-gray-500"
				>
					<span class="sr-only">{{ item.name }}</span>
					<component
						:is="item.icon"
						class="h-6 w-6"
						aria-hidden="true"
					/>
				</a>
			</div>
			<p class="mt-8 text-center text-base text-gray-400">
				&copy; 2022 CodeF
			</p>
		</div>
	</footer>
</template>

<script setup lang="ts">
	import { Icon } from '@iconify/vue';
	import { h } from 'vue';

	const navigation = {
		main: [
			{ name: 'Home', href: '/' },
			{ name: 'CodeF', href: 'https://codef.site' },
		],
		social: [
			{
				name: 'Facebook',
				href: 'https://www.facebook.com/mfazail.alam',
				icon: h(Icon, {
					icon: 'akar-icons:facebook-fill',
					class: 'w-5 h-5 hover:text-blue-400',
				}),
			},
			{
				name: 'Instagram',
				href: 'https://instagram.com/mfazail.alam',
				icon: h(Icon, {
					icon: 'akar-icons:instagram-fill',
					class: 'w-5 h-5 hover:text-orange-400',
				}),
			},
			{
				name: 'Twitter',
				href: 'https://twitter.com/mfazail_alam',
				icon: h(Icon, {
					icon: 'akar-icons:twitter-fill',
					class: 'w-5 h-5 hover:text-blue-500',
				}),
			},
			{
				name: 'GitHub',
				href: 'https://github.com/mfazail',
				icon: h(Icon, {
					icon: 'akar-icons:github-fill',
					class: 'w-5 h-5 ',
				}),
			},
			{
				name: 'Youtube',
				href: 'https://youtube.com/codef_YT',
				icon: h(Icon, {
					icon: 'akar-icons:youtube-fill',
					class: 'w-5 h-5 hover:text-red-500',
				}),
			},
		],
	};
</script>

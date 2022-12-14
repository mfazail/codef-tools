<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useGtag } from "vue-gtag-next";
import { ref } from "vue";
import { NButton, NInput, NSelect, NSpin, useMessage } from "naive-ui";

const pageMeta = {
	base: "/random-quotes",
	title: "Random quotes -",
	description: "Generate random quotes or find quotes by category, author, etc.",
	keyword: "codef, online tools,random quote, quote, quotes by author"
}
const appConfig = useAppConfig()

type Quote = {
	_id: string;
	author: String;
	tags: Array<string>;
	length: Number;
	authorSlug: String;
	dateAdded: String;
	dateModified: String;
	content: string;
};

useHead({
	title: pageMeta.title + appConfig.name,
	meta: [
		...getMeta(pageMeta)
	],
});
useSchemaOrg([
	defineWebPage({
		name: pageMeta.title + appConfig.name,
		description: pageMeta.description,
	}),
]);

let authorIn = ref<string>("");
let categoryIn = ref<string>("");
let searchType = ref<string>("author");
let _searched = ref(false);
const _baseUrl = "https://api.quotable.io";
const _searchUrl = "https://quotable.io/quotes";
const config = useRuntimeConfig();
const { event } = useGtag();
const { copy, copied } = useClipboard();
const message = useMessage()

const options = [
	{
		label: "Author",
		value: "author"
	},
	{
		label: "Tags",
		value: "tags"
	},
]

onMounted(() => {
	generateRandom();
});

const {
	data: dataRandom,
	refresh: refreshRandom,
	pending: pendingRandom,
} = await useAsyncData("random-quotes", () => {
	return $fetch(`${_baseUrl}/random`);
});

const {
	data: dataSearch,
	refresh: refreshSearch,
	pending: pendingSearch,
} = await useLazyAsyncData("search-quotes", () => {
	if (!_searched.value) return null;
	switch (searchType.value) {
		case "author":
			return $fetch(`${_searchUrl}?author=${authorIn.value}`);
		case "tags":
			return $fetch(`${_searchUrl}?tags=${categoryIn.value}`);
		default:
			console.log("something wrong happend");
			return null;
	}
});

const generateRandom = async () => {
	if (!pendingRandom.value) {
		await refreshRandom();
		// console.log(dataRandom);
		if (!config.public.DEV) {
			event("random-quote", {
				event_category: "quote",
				event_label:
					"Random Quote - " + (dataRandom.value as Quote)._id,
			});
		}
	}
};

const search = async () => {
	if (!pendingSearch.value) {
		_searched.value = true;
		await refreshSearch();
		if (!config.public.DEV) {
			event("search-quote", {
				event_category: "quote",
				event_label:
					"Quote Searched - " + searchType.value == "tags"
						? categoryIn.value
						: authorIn.value,
			});
		}
		// console.log(dataSearch);
	}
};

const handleCopy = async () => {
	await copy((dataRandom.value as Quote).content)
	if (copied.value) {
		message.success("Copied")
	} else {
		message.error("Something went wrong")
	}
}

onBeforeUnmount(() => {
	dataRandom.value = null;
	dataSearch.value = null;
	_searched.value = false;
});
</script>

<template>
	<div class="max-w-4xl mx-auto">

		<ClientOnly>
			<AdsByGoogle ad-client="ca-pub-9624538133715401" ad-slot="9011612592" />
		</ClientOnly>

		<div class="space-y-4 mt-5">
			<div v-if="pendingRandom" class="flex justify-center items-center">
				<Icon icon="lucide:loader-2" class="w-5 h-5 animate-spin text-indigo-500" />
			</div>
			<div v-if="!pendingRandom">
				<h1 class="text-xl py-5 px-3 dark:text-white">
					<em>{{ (dataRandom as Quote).content }}</em>
				</h1>
				<p class="text-right dark:text-white">
					??? {{ (dataRandom as Quote).author }}
				</p>
			</div>

			<div class="space-x-4 flex justify-end pt-8">
				<NButton @click="generateRandom" type="primary">
					Random
				</NButton>
				<NButton @click="handleCopy" circle>
					<template #icon>
						<Icon :icon="copied ? 'ic:baseline-check' : 'material-symbols:content-copy-outline'" />
					</template>
				</NButton>
			</div>

			<div>
				<label for="searchType" class="block text-sm font-medium text-gray-700 dark:text-white mt-10">
					Search By
				</label>
			</div>
			<div class="flex items-center md:space-x-4 flex-col md:flex-row">
				<NSelect v-model:value="searchType" :options="options" />
				<NInput v-if="searchType == 'author'" type="text" v-model:value="authorIn" placeholder="Author Name" />
				<NInput v-if="searchType == 'tags'" type="text" v-model:value="categoryIn"
					placeholder="Category eg. love|happiness|science" />
			</div>
			<div class="flex justify-end">
				<NButton @click="search" type="primary">
					<template #icon>
						<Icon icon="ri:search-2-line" />
					</template>
					Search
				</NButton>
			</div>

			<div v-if="_searched && pendingSearch" class="flex justify-center items-center">
				<NSpin />
			</div>
			<div v-if="dataSearch != null && ((dataSearch as any).results as Array<Quote>).length != 0">
				<ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700 w-full">
					<li v-for="quote in (dataSearch as any).results" :key="(quote as Quote)._id"
						class="py-4 flex w-full">
						<div class="ml-3 w-full">
							<p class="text-sm text-gray-900 dark:text-white tracking-wider">
								<em>{{ (quote as Quote).content }}</em>
							</p>
							<div class="flex justify-between w-full">
								<p class="flex space-x-2">
									<span class="text-sm text-indigo-500 mt-2" v-for="tag in (quote as Quote).tags"
										:key="tag">
										{{ tag }}
									</span>
								</p>
								<p v-if="searchType == 'tags'" class="text-right text-xs">
									??? {{ (quote as Quote).author }}
								</p>
							</div>
						</div>
						<div>
							<Icon @click="copy((quote as Quote).content)" icon="material-symbols:content-copy-outline"
								class="w-5 h-5 text-indigo-500 cursor-pointer" />
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

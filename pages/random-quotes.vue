<script setup lang="ts">
import { useAxios } from "@vueuse/integrations/useAxios";
import { Icon } from "@iconify/vue";
import { useGtag } from "vue-gtag-next";
import { ref } from "vue";

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
    title: "Random quotes - CodeF Tools",
    meta: [
        {
            name: "description",
            content:
                "Generate random quotes or find quotes by category, author, etc.",
        },
        {
            name: "keyword",
            content: "random quote, quote, quotes by author, codef",
        },
    ],
});
useSchemaOrg([
    defineWebPage({
        name: "Random quotes - CodeF Tools",
        description:
            "Generate random quotes or find quotes by category, author, etc.",
    }),
]);

let authorIn = ref<String>("");
let categoryIn = ref<String>("");
let searchType = ref<string>("author");
let _searched = ref(false);
const _baseUrl = "https://api.quotable.io";
const _searchUrl = "https://quotable.io/quotes";
const config = useRuntimeConfig();
const { event } = useGtag();
const { copy, copied } = useClipboard();
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
} = await useAsyncData("search-quotes", () => {
    if (!_searched.value) return null;
    switch (searchType.value) {
        case "author":
            return $fetch(`${_searchUrl}?author=${authorIn.value}`);
        case "tags":
            return $fetch(`${_searchUrl}?tags=${categoryIn.value}`);
        default:
            console.log("something wrong happend");
            break;
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
onBeforeUnmount(() => {
    dataRandom.value = null;
    dataSearch.value = null;
    _searched.value = false;
});
</script>

<template>
    <div>
        <Meta name="twitter:card" content="summary" />
        <Meta
            name="twitter:url"
            content="https://tools.codef.site/random-quotes"
        />
        <Meta name="twitter:title" content="Random quotes - CodeF Tools" />
        <Meta
            name="twitter:description"
            content="Generate random quotes or find quotes by category, author, etc."
        />
        <Meta
            name="twitter:image"
            content="https://tools.codef.site/icons/512.png"
        />
        <Meta name="twitter:creator" content="@mfazail_alam" />
        <Meta property="og:type" content="website" />
        <Meta property="og:title" content="Random quotes - CodeF Tools" />
        <Meta
            property="og:description"
            content="Generate random quotes or find quotes by category, author, etc."
        />
        <Meta property="og:site_name" content="Random quotes - CodeF Tools" />
        <Meta
            property="og:url"
            content="https://tools.codef.site/random-quotes"
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
		
        <AdsByGoogle ad-client="ca-pub-9624538133715401" ad-slot="9011612592" />

        <div class="space-y-4 mt-5">
            <div v-if="pendingRandom" class="flex justify-center items-center">
                <Icon
                    icon="lucide:loader-2"
                    class="w-5 h-5 animate-spin text-indigo-500"
                />
            </div>
            <div v-if="!pendingRandom">
                <h1 class="text-xl py-5 px-3 dark:text-white">
                    <em>{{ (dataRandom as Quote).content }}</em>
                </h1>
                <p class="text-right dark:text-white">
                    ─ {{ (dataRandom as Quote).author }}
                </p>
            </div>

            <div class="space-x-4 flex justify-end pt-8">
                <button
                    @click="generateRandom"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Random
                </button>
                <button
                    @click="copy((dataRandom as Quote).content)"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {{ copied ? "Copied" : "Copy" }}
                </button>
            </div>

            <div>
                <label
                    for="searchType"
                    class="block text-sm font-medium text-gray-700 dark:text-white mt-10"
                >
                    Search By
                </label>
                <select
                    id="searchType"
                    v-model="searchType"
                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-700"
                >
                    <option value="author">Author</option>
                    <option value="tags">Tags</option>
                </select>
            </div>
            <input
                v-if="searchType == 'author'"
                type="text"
                v-model="authorIn"
                placeholder="Author Name"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
            />
            <input
                v-if="searchType == 'tags'"
                type="text"
                v-model="categoryIn"
                placeholder="Category eg. love|happiness|science"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
            />
            <div class="flex justify-end">
                <button
                    @click="search"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Search
                </button>
            </div>

            <div
                v-if="_searched && pendingSearch"
                class="flex justify-center items-center"
            >
                <Icon
                    icon="lucide:loader-2"
                    class="w-5 h-5 animate-spin text-indigo-500"
                />
            </div>
            <div
                v-if="dataSearch != null && ((dataSearch as any).results as Array<Quote>).length != 0"
            >
                <ul
                    role="list"
                    class="divide-y divide-gray-200 dark:divide-gray-700 w-full"
                >
                    <li
                        v-for="quote in (dataSearch as any).results"
                        :key="(quote as Quote)._id"
                        class="py-4 flex w-full"
                    >
                        <div class="ml-3 w-full">
                            <p
                                class="text-sm text-gray-900 dark:text-white tracking-wider"
                            >
                                <em>{{ (quote as Quote).content }}</em>
                            </p>
                            <div class="flex justify-between w-full">
                                <p class="flex space-x-2">
                                    <span
                                        class="text-sm text-indigo-500 mt-2"
                                        v-for="tag in (quote as Quote).tags"
                                        :key="tag"
                                    >
                                        {{ tag }}
                                    </span>
                                </p>
                                <p
                                    v-if="searchType == 'tags'"
                                    class="text-right text-xs"
                                >
                                    ─ {{ (quote as Quote).author }}
                                </p>
                            </div>
                        </div>
                        <div>
                            <Icon
                                @click="copy((quote as Quote).content)"
                                icon="fluent:copy-16-filled"
                                class="w-5 h-5 text-indigo-500 cursor-pointer"
                            />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
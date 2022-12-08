<script setup lang="ts">
useHead({
    title: "CodeF Tools",
    meta: [
        {
            name: "description",
            content: "Online Tools that can help in your daily digital life.",
        },
        {
            name: "keyword",
            content:
                "codef, online tools, qr generator, qr scanner, online, random quotes, quotes",
        },
    ],
});
useSchemaOrg([
    definePerson({
        name: "Fazail Alam",
        image: "https://fazail-alam.web.app/assets/me.jpg",
        sameAs: ["https://github.com/mfazail"],
    }),
    defineWebSite({
        name: "CodeF Tools",
        description: "Online Tools that can help in your daily digital life.",
        image: "https://tools.codef.site/pwa-512x512.png",
        url: "https://tools.codef.site",
    }),
]);
</script>

<template>
    <div>
		<Meta name="twitter:card" content="summary" />
        <Meta name="twitter:url" content="https://tools.codef.site" />
        <Meta name="twitter:title" content="CodeF Tools" />
        <Meta name="twitter:description" content="Online Tools that can help in your daily digital life." />
        <Meta
            name="twitter:image"
            content="https://tools.codef.site/icons/512.png"
        />
        <Meta name="twitter:creator" content="@mfazail_alam" />
        <Meta property="og:type" content="website" />
        <Meta property="og:title" content="CodeF Tools" />
        <Meta property="og:description" content="Online Tools that can help in your daily digital life." />
        <Meta property="og:site_name" content="CodeF Tools" />
        <Meta property="og:url" content="https://tools.codef.site" />
        <Meta
            property="og:image"
            content="https://tools.codef.site/icons/512.png"
        />
		<!-- <Script
            async
            crossorigin="anonymous"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9624538133715401"
        ></Script> -->

		<AdsByGoogle ad-client="ca-pub-9624538133715401" ad-slot="9011612592" />

        <div class="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <tool-card
                title="Qr generator"
                iconClass=""
                icon="heroicons-outline:qrcode"
                url="qr-generator"
                description="Generate personalized qr code online of text or url."
            />
            <tool-card
                title="Qr scanner"
                iconClass=""
                icon="bi:qr-code-scan"
                url="qr-scanner"
                description="Scan and read the content of qr code."
            />
            <tool-card
                title="Random quotes"
                iconClass=""
                icon="bi:chat-quote-fill"
                url="random-quotes"
                description="Read random quotes or find quotes from different authors, category,etc."
            />
        </div>
		<!-- <NuxtLink to="/convert/binary/decimal">Test</NuxtLink> -->
    </div>
</template>

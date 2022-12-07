<template>
    <header
        class="w-full bg-white text-gray-800 dark:bg-gray-800 dark:text-white shadow-md dark:shadow-black/20 mb-4"
    >
        <nav class="max-w-4xl mx-auto w-full px-4 sm:px-2 py-2 flex items-center">
            <NuxtLink to="/">
                <div
                    class="bg-white transition-all duration-300 rounded-sm dark:px-3"
                >
                    <h1
                        class="text-xl py-1 sm:py-2 font-bold font-roboto text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-500"
                    >
                        tools.codef.site
                    </h1>
                </div>
            </NuxtLink>
            <div class="ml-auto flex items-center h-full">
				<ColorModeSwitch />
            </div>
        </nav>
    </header>
</template>

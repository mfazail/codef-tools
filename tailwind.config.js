/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["pages/**/*.vue", "components/**/*.vue","app.vue","error.vue"],
    theme: {
        extend: {},
	},
	darkMode:'class',
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("@tailwindcss/aspect-ratio"),
    ],
};

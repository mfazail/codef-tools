import { useNProgress } from "@vueuse/integrations/useNProgress";
export default defineNuxtPlugin((nuxtApp) => {
	const { start,done } = useNProgress();
	nuxtApp.hook('page:start', () => {
		start();
	});
	nuxtApp.hook('page:finish', () => {
		done();
	});
});

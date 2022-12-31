
export interface MyPageMeta {
	title: string,
	base: string,
	description: string,
	keyword:string
}

export const getMeta = (pageMeta: MyPageMeta) => {
	const appConfig = useAppConfig()
	return [
		{
			name: "description",
			content: pageMeta.description,
		},
		{
			name: "keyword",
			content: pageMeta.keyword,
		},
		{
			name: "twitter:card",
			content: "summary",
		},
		{
			name: "twitter:url",
			content: appConfig.url + pageMeta.base
		},
		{
			name: "twitter:title",
			content: pageMeta.title + appConfig.name
		},
		{
			name: "twitter:description",
			content: pageMeta.description
		},
		{
			name: "twitter:image",
			content: appConfig.icon
		},
		{
			name: "twitter:creator",
			content: appConfig.social.twitter
		},
		{
			name: "og:type",
			content: "website"
		},
		{
			name: "og:title",
			content: pageMeta.title + appConfig.name
		},
		{
			name: "og:description",
			content: pageMeta.description
		},
		{
			name: "og:site_name",
			content: pageMeta.title + appConfig.name
		},
		{
			name: "og:url",
			content: appConfig.url + pageMeta.base
		},
		{
			name: "og:image",
			content: appConfig.icon
		},
	]
}
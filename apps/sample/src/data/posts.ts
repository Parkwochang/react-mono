export type SamplePost = {
	id: string;
	title: string;
	summary: string;
	body: string;
	tags: string[];
};

type CreateSamplePostInput = Omit<SamplePost, "id">;

export const samplePosts: SamplePost[] = [
	{
		id: "routing-basics",
		title: "Routing Basics",
		summary: "How file names turn into routes in the sample app.",
		body: "Files inside src/routes become pages. index.tsx maps to /, about.tsx maps to /about, and posts/$postId.tsx maps to /posts/:postId.",
		tags: ["router", "files", "tanstack"],
	},
	{
		id: "layout-shell",
		title: "Layout Shell",
		summary: "What lives in __root.tsx and why it wraps every page.",
		body: "__root.tsx is the shared shell. Put your global head tags, navigation, footer, and layout there so every route renders inside the same frame.",
		tags: ["layout", "root", "shell"],
	},
	{
		id: "sample-pages",
		title: "Sample Pages",
		summary: "A simple list/detail flow to confirm file routing is working.",
		body: "The posts list route links into dynamic detail routes. If those pages render correctly, the generated route tree and file-based routing are wired up properly.",
		tags: ["demo", "posts", "dynamic-route"],
	},
];

let createdPosts: SamplePost[] = [];

function createPostId(title: string) {
	const baseId =
		title
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\u3131-\u318e\uac00-\ud7a3]+/g, "-")
			.replace(/^-+|-+$/g, "") || "post";

	let nextId = baseId;
	let index = 2;

	while (getPostById(nextId)) {
		nextId = `${baseId}-${index}`;
		index += 1;
	}

	return nextId;
}

export function listPosts() {
	return [...createdPosts, ...samplePosts];
}

export function getPostById(postId: string) {
	return listPosts().find((post) => post.id === postId);
}

export function createMockPost(input: CreateSamplePostInput) {
	const createdPost = {
		id: createPostId(input.title),
		...input,
	};

	createdPosts = [createdPost, ...createdPosts];

	return createdPost;
}

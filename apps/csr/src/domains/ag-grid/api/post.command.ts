import { ENDPOINT } from "@/constants/api/endpoint";
import { createMockPost } from "@/data/posts";
import { ApiInstance } from "@/libs";

import { CreatePostSchema, PostResSchema, type PostSchema } from "./post.schema";

export const createPost = async (payload: PostSchema.Create) => {
	const request = CreatePostSchema.parse(payload);

	return ApiInstance.post(ENDPOINT.POSTS, { json: request })
		.json<unknown>()
		.then((response) => PostResSchema.parse(response))
		.catch(() => createMockPost(request));
};

import { queryOptions } from '@tanstack/react-query';

import { ENDPOINT } from '@/constants/api/endpoint';
import { getPostById } from '@/data/posts';
import { ApiInstance } from '@/libs';
import type { PostSchema } from './post.schema';

// ----------------------------------------------------------------------

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ----------------------------------------------------------------------

export const getPosts = async (id: PostSchema.Req) => {
  await delay(2000);

  return ApiInstance.get(ENDPOINT.POST(id))
    .json<PostSchema.Res>()
    .catch(() => getPostById(id));
};

// ----------------------------------------------------------------------

export const getPostsQuery = (id: PostSchema.Req) =>
  queryOptions({
    queryKey: [ENDPOINT.POST(id)],
    queryFn: () => getPosts(id),
  });

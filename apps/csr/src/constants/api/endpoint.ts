export const ENDPOINT = {
  POSTS: '/posts',
  POST: (id: string) => `/posts/${id}`,
} as const;

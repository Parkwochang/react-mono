import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createPost, getPostsQuery, type PostSchema } from '../api';

// ----------------------------------------------------------------------
// ! 포스트 GET

export function usePost(id: PostSchema.Req) {
  const { data, isLoading, error } = useQuery({
    ...getPostsQuery(id),
  });

  return { data, isLoading, error };
}

// ----------------------------------------------------------------------
// ! 포스트 POST

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PostSchema.Create) => createPost(payload),
    onSuccess: (createdPost) => {
      queryClient.setQueryData(getPostsQuery(createdPost.id).queryKey, createdPost);
    },
  });
}

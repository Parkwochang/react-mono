import { createFileRoute } from '@tanstack/react-router';

import { getPostsQuery } from '@/domains/posts/api';
import { PostScreen } from '@/domains/posts/components';

// ----------------------------------------------------------------------

export const Route = createFileRoute('/posts/$postId')({
  component: PostDetailPage,
  // validateSearch
  loader: async ({ context, params }) => context.queryClient.ensureQueryData(getPostsQuery(params.postId)),
});

function PostDetailPage() {
  return <PostScreen />;
}

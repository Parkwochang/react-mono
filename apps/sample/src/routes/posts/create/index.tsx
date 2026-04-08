import { createFileRoute } from '@tanstack/react-router';

import { PostCreateScreen } from '@/domains/posts/components';

export const Route = createFileRoute('/posts/create/')({
  component: PostCreatePage,
});

function PostCreatePage() {
  return <PostCreateScreen />;
}

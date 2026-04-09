import { CreatePostForm } from './create-post.form';
import { CreatePostSummary } from './create-post-summary';

export function PostCreateScreen() {
  return (
    <CreatePostForm>
      <CreatePostSummary />
    </CreatePostForm>
  );
}

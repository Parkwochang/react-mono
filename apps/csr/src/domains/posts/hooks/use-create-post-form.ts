import { useForm } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';

import { CreatePostSchema, type PostSchema } from '../api';
import { useCreatePost } from './use-api';

// ----------------------------------------------------------------------

const INITIAL_FORM = {
  title: '',
  summary: '',
  body: '',
  tags: ['tanstack, router, sample'],
};

export function usePostCreateForm() {
  const navigate = useNavigate();

  const createPostMutation = useCreatePost();

  const form = useForm<PostSchema.Create>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: INITIAL_FORM,
    mode: 'onChange',
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const createdPost = await createPostMutation.mutateAsync(data);

    await navigate({
      to: '/posts/$postId',
      params: { postId: createdPost.id },
    });
  });

  return {
    form,
    createPostMutation,
    handleSubmit,
  };
}

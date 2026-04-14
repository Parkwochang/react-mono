// import { useForm } from 'react-hook-form';
// import { useNavigate } from '@tanstack/react-router';
// import { zodResolver } from '@hookform/resolvers/zod';

// import { CreateGridSchema, type GridSchema } from '../api';
// import { useCreatePost } from './use-api';

// // ----------------------------------------------------------------------

// const INITIAL_FORM = {
//   title: '',
//   summary: '',
//   body: '',
//   tags: ['tanstack, router, sample'],
// };

// export function useGridCreateForm() {
//   const navigate = useNavigate();

//   const createPostMutation = useCreatePost();

//   const form = useForm<GridSchema.Create>({
//     resolver: zodResolver(CreateGridSchema),
//     defaultValues: INITIAL_FORM,
//     mode: 'onChange',
//   });

//   const handleSubmit = form.handleSubmit(async (data) => {
//     const createdGrid = await createGridMutation.mutateAsync(data);

//     await navigate({
//       to: '/ag-grid/$gridId',
//       params: { gridId: createdGrid.id },
//     });
//   });

//   return {
//     form,
//     createPostMutation,
//     handleSubmit,
//   };
// }

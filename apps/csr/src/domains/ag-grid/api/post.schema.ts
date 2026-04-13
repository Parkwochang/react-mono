import { z } from 'zod';

// ----------------------------------------------------------------------
// ! 포스트
// prettier-ignore

export const PostReqSchema = z.string()

// ----------------------------------------------------------------------
// prettier-ignore

export const PostResSchema = z.object({
  id     : z.string(),
  title  : z.string(),
  summary: z.string(),
  body   : z.string(),
  tags   : z.array(z.string()),
});

// ----------------------------------------------------------------------
// prettier-ignore

export const CreatePostSchema = z.object({
  title  : z.string().trim().min(1, '제목을 입력해주세요.'),
  summary: z.string().trim().min(1, '요약을 입력해주세요.'),
  body   : z.string().trim().min(1, '본문을 입력해주세요.'),
  tags   : z.array(z.string().trim().min(1)).min(1, '태그를 한 개 이상 입력해주세요.'),
});

// ----------------------------------------------------------------------
// prettier-ignore

export const UpdatePostSchema = CreatePostSchema.extend({ id: z.string() }).omit({ id: true }).partial();

// ----------------------------------------------------------------------
// ! 다른 도메인

// ----------------------------------------------------------------------
// prettier-ignore

export namespace PostSchema {
  export type Req    = z.infer<typeof PostReqSchema>;
  export type Res    = z.infer<typeof PostResSchema>;
  export type Create = z.infer<typeof CreatePostSchema>;
  export type Update = z.infer<typeof UpdatePostSchema>;
}

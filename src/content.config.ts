import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // 博客集合
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      draft: z.boolean().default(false),
    }),
});

const notes = defineCollection({
  // 笔记集合
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date().optional(),
      category: z.string().optional(),
      tags: z.array(z.string()).optional(),
      heroImage: image().optional(),
      draft: z.boolean().default(false),
    }),
});

// 正确导出方式
export const collections = {
  blog,
  notes,
};
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      draft: z.boolean().default(false),// 添加 draft 属性（默认非草稿）
    }),
});

// 正确导出方式
export const collections = {
  blog
};
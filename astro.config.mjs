import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import vercel from '@astrojs/vercel/serverless'; // 添加这行

export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  
  // 配置 Vercel 适配器
  adapter: vercel(),
  
  output: 'server',  // 保持这个
  
  devToolbar: {
    enabled: false
  },
  
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    extendDefaultPlugins: false
  }
});
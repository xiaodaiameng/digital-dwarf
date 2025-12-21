import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  
  devToolbar: {
    enabled: false // 彻底禁用
  },
  
  // ========== 新增的Markdown配置部分 ==========
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    // 如果遇到公式中的中文显示问题，可以添加以下配置：
    extendDefaultPlugins: false
  }
});
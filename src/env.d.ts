// src/env.d.ts
import type { MarkdownInstance } from 'astro';

// 扩展 MarkdownInstance 类型，添加 rawContent 方法
declare module 'astro' {
  interface MarkdownInstance<T extends Record<string, any>> {
    rawContent(): string; // 声明 rawContent 方法返回字符串
  }
}
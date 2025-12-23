// src/middleware.js - 修复版本
export function onRequest(context, next) {
  const { url, cookies } = context;
  
  console.log('🔐 Middleware处理:', url.pathname, 'cookie?', cookies.has('blog_access'));
  
  // 1. 静态资源直接放行
  const staticExtensions = ['.js', '.css', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico'];
  const isStatic = staticExtensions.some(ext => url.pathname.endsWith(ext)) ||
                   url.pathname.startsWith('/_astro/') ||
                   url.pathname.startsWith('/src/');
  
  if (isStatic) {
    return next();
  }
  
  // 2. 特殊处理 /unlock 页面（必须单独处理，不能在白名单）
  if (url.pathname === '/unlock') {
    console.log('🔓 处理 /unlock 页面');
    const hasCookie = cookies.has('blog_access');
    
    if (hasCookie) {
      // 有cookie！立即重定向到来源页面或首页
      const from = url.searchParams.get('from') || '/';
      console.log('✅ 已有权限，重定向到:', from);
      return Response.redirect(new URL(from, url.origin), 302);
    }
    
    // 没有cookie，显示解锁页面
    console.log('🔒 显示解锁页面');
    return next();
  }
  
  // 3. 其他所有页面检查cookie
  const hasCookie = cookies.has('blog_access');
  
  if (!hasCookie) {
    console.log('❌ 无权限，重定向到 /unlock');
    const redirectUrl = new URL('/unlock', url.origin);
    redirectUrl.searchParams.set('from', url.pathname);
    return Response.redirect(redirectUrl, 302);
  }
  
  // 4. 有cookie，正常访问
  console.log('✅ 有权限，允许访问:', url.pathname);
  return next();
}
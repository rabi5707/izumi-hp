/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
    ],
  },
  async redirects() {
    return [
      // /shop の EC 機能は近日公開。サブルート（カート・商品詳細・配送・決済等）は
      // すべてカミングスーンページに集約する。一般公開時はこのブロックを削除。
      { source: "/shop/cart", destination: "/shop", permanent: false },
      { source: "/shop/delivery", destination: "/shop", permanent: false },
      { source: "/shop/confirm", destination: "/shop", permanent: false },
      { source: "/shop/success", destination: "/shop", permanent: false },
      { source: "/shop/products/:id*", destination: "/shop", permanent: false },
      { source: "/shop/area/:slug*", destination: "/shop", permanent: false },
    ];
  },
};

export default nextConfig;

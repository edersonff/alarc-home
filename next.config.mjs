/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["images.pexels.com", "www.cnnbrasil.com.br", "grupoahora.net.br"],
  },
};

export default nextConfig;

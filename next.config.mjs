/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Base path prefix for GitHub Pages default subfolder hosting.
  // Note: Remove this or set it to empty if you link a custom domain (e.g. afridigital.ci)
  basePath: isProd ? "/site-afridigital" : "",
};

export default nextConfig;

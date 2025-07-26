/** @type {import('next').NextConfig} */

const repo = 'pragya'; 

const nextConfig = {
  output: 'export',
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
};

export default nextConfig;

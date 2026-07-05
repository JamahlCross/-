const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const isUserOrOrgPage = repositoryName.endsWith(".github.io");
const basePath = isGithubActions && repositoryName && !isUserOrOrgPage ? `/${repositoryName}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true
  },
  turbopack: {
    root: process.cwd()
  }
};

export default nextConfig;

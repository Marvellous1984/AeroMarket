/** @type {import('next').NextConfig} */
const nextConfig = {
  // The opengraph-image route reads local font files via fs, not an
  // import — Next's serverless file tracer doesn't pick those up on its
  // own, so they'd be missing (ENOENT) in the deployed function unless
  // explicitly included here.
  experimental: {
    outputFileTracingIncludes: {
      "/opengraph-image": ["./app/assets/**/*"],
    },
  },
};

export default nextConfig;

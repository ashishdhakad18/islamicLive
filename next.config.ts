const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "staging-backend.islamic-relief.ch",
        pathname: "/uploads/**",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;

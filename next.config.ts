import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  
  // Ignorar errores de ESLint en build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Ignorar errores de TypeScript en build (si los hay)
  typescript: {
    ignoreBuildErrors: false, // Mantener en false, ya no hay errores TS
  },
};

export default nextConfig;

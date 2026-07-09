import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost", 
    "127.0.0.1", 
    "192.168.31.16",
    "*.ngrok-free.app", 
    "*.ngrok.io",
    "*.ngrok-free.dev"
  ]
};

export default nextConfig;

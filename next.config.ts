import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Es gibt bewusst keine Work-Übersicht — die Liste lebt auf der Startseite.
      // Wer /work aufruft, soll dort landen statt auf einem 404.
      { source: "/work", destination: "/#work", permanent: false },
    ];
  },
};

export default nextConfig;

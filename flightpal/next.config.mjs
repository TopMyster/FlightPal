import path from 'path';
import { fileURLToPath } from 'url';

/** Required because __dirname is not available in ESM */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      include: path.resolve(__dirname, 'public/icons'), // Adjust to your folder
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            extract: true,
            spriteFilename: isServer ? '../sprite.svg' : 'sprite.svg',
          },
        },
        'svgo-loader',
      ],
    });

    return config;
  },
};

export default nextConfig;

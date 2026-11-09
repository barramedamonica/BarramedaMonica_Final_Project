import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#0f2c59',
          900: '#071e3d',
        },
      },
    },
  },
  plugins: [],
};

export default config;

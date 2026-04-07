import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          paper: '#F4ECD8',
          ink: '#2C1810',
          sepia: '#704214',
          stamp: '#8B4513',
          fade: '#A0826D',
          text: '#2b2b2b',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        body: ['Lora', 'Georgia', 'serif'],
        typewriter: ['Courier Prime', 'monospace'],
      },
      fontSize: {
        'h1': ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2.25rem', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['1.75rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        'body-sm': ['1rem', { lineHeight: '1.7', letterSpacing: '0.01em' }],
      },
    },
  },
  plugins: [],
};

export default config;

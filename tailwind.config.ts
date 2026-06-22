import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // colors: {
      //   'charcoal': '#2d2d2d',
      //   'gold-300': '#d4af37',
      //   'gold-400': '#c9a227',
      //   'gold-500': '#b8960f',
      //   'cream': '#f8f6f3',
      // },
    },
  },
  plugins: [],
}
export default config

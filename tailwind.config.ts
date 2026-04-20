import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/templates/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // These are overridden via CSS variables set from siteConfig.theme
        brand: {
          primary:   'rgb(var(--color-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
          accent:    'rgb(var(--color-accent) / <alpha-value>)',
          dark:      'rgb(var(--color-dark) / <alpha-value>)',
          light:     'rgb(var(--color-light) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
        serif:   ['var(--font-serif)',   'serif'],
      },
      maxWidth: {
        site: '1240px',
      },
      animation: {
        'fade-up':   'fadeUp .5s ease-out both',
        'fade-in':   'fadeIn .3s ease-out both',
        'slide-in':  'slideIn .3s ease-out both',
        'pulse-dot': 'pulseDot 2s infinite',
      },
      keyframes: {
        fadeUp:   { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'none' } },
        fadeIn:   { from: { opacity: '0' },                                to: { opacity: '1' } },
        slideIn:  { from: { transform: 'translateX(110%)' },              to: { transform: 'translateX(0)' } },
        pulseDot: { '0%,100%': { transform: 'scale(1)', opacity: '1' }, '50%': { transform: 'scale(1.15)', opacity: '.6' } },
      },
    },
  },
  plugins: [],
}
export default config

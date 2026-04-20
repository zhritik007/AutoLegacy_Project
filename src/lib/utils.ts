import { type ClassValue, clsx } from 'clsx'

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/** Generate CSS variable string from RGB config */
export function rgbVar(color: { r: number; g: number; b: number }): string {
  return `${color.r} ${color.g} ${color.b}`
}

/** Convert RGB object to hex string for use in non-CSS contexts */
export function rgbToHex(color: { r: number; g: number; b: number }): string {
  return '#' + [color.r, color.g, color.b]
    .map(v => v.toString(16).padStart(2, '0'))
    .join('')
}

/** Generate theme CSS variable block from siteConfig.theme */
export function buildThemeCssVars(theme: {
  primary:   { r: number; g: number; b: number }
  secondary: { r: number; g: number; b: number }
  dark:      { r: number; g: number; b: number }
  light:     { r: number; g: number; b: number }
  fonts:     { display: string; body: string; serif: string }
}): string {
  return `
    --color-primary:   ${rgbVar(theme.primary)};
    --color-secondary: ${rgbVar(theme.secondary)};
    --color-dark:      ${rgbVar(theme.dark)};
    --color-light:     ${rgbVar(theme.light)};
    --color-primary-hex:   ${rgbToHex(theme.primary)};
    --color-secondary-hex: ${rgbToHex(theme.secondary)};
    --font-display: '${theme.fonts.display}';
    --font-body:    '${theme.fonts.body}';
    --font-serif:   '${theme.fonts.serif}';
  `.trim()
}

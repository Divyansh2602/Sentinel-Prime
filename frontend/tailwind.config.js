/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
      extend: {
          "colors": {
              "on-primary": "#00354a",
              "outline-variant": "#45464d",
              "inverse-on-surface": "#283044",
              "tertiary": "#4edea3",
              "primary-container": "#001a27",
              "secondary-fixed-dim": "#b7c8e1",
              "on-surface": "#dae2fd",
              "secondary-fixed": "#d3e4fe",
              "on-secondary-fixed-variant": "#38485d",
              "inverse-primary": "#00668a",
              "surface": "#0b1326",
              "primary": "#7bd0ff",
              "secondary-container": "#3a4a5f",
              "on-tertiary-fixed-variant": "#005236",
              "on-tertiary-container": "#009365",
              "on-background": "#dae2fd",
              "on-secondary-fixed": "#0b1c30",
              "outline": "#909097",
              "error": "#ffb4ab",
              "on-primary-fixed": "#001e2c",
              "on-secondary-container": "#a9bad3",
              "tertiary-container": "#001c10",
              "on-tertiary": "#003824",
              "surface-tint": "#7bd0ff",
              "surface-dim": "#0b1326",
              "on-surface-variant": "#c6c6cd",
              "inverse-surface": "#dae2fd",
              "primary-fixed": "#c4e7ff",
              "surface-container-low": "#131b2e",
              "surface-bright": "#31394d",
              "primary-fixed-dim": "#7bd0ff",
              "on-error": "#690005",
              "surface-container": "#171f33",
              "tertiary-fixed-dim": "#4edea3",
              "surface-container-highest": "#2d3449",
              "surface-container-high": "#222a3d",
              "error-container": "#93000a",
              "surface-container-lowest": "#060e20",
              "background": "#0b1326",
              "tertiary-fixed": "#6ffbbe",
              "on-tertiary-fixed": "#002113",
              "secondary": "#b7c8e1",
              "on-primary-fixed-variant": "#004c69",
              "on-primary-container": "#008abb",
              "surface-variant": "#2d3449",
              "on-secondary": "#213145",
              "on-error-container": "#ffdad6"
          },
          "borderRadius": {
              "DEFAULT": "0.125rem",
              "lg": "0.25rem",
              "xl": "0.5rem",
              "full": "0.75rem"
          },
          "fontFamily": {
              "headline": ["Manrope", "sans-serif"],
              "body": ["Inter", "sans-serif"],
              "label": ["Inter", "sans-serif"]
          }
      }
  },
  plugins: [],
}

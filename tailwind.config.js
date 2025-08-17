// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",
        accent: "#fbbf24"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      screens: {
        sm: "30rem",
        md: "48rem",
        lg: "64rem"
      },
      spacing: {
        DEFAULT: "0.25rem"
      }
    }
  },
  plugins: [
    require('@tailwindcss/utilities')({
      'no-scrollbars': { 'scrollbar-width': 'none' }
    })
  ]
}
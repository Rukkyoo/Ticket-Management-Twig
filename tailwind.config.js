// tailwind.config.js
module.exports = {
  content: [
    "./src/templates/**/*.twig",
    "./src/**/*.php",
    "./src/**/*.js",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
};

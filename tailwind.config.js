export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        violeta: {
          claro: "#EDE9FE",
          medio: "#C4B5FD",
          fuerte: "#8B5CF6"
        }
      },
      fontFamily: {
        mica: ['"Inter"', 'sans-serif']
      }
    },
  },
  plugins: [],
}

export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1a365d',
          secondary: '#2d3748',
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }
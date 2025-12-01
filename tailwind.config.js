module.exports = {
  darkMode: 'class', // 启用手动切换暗色模式
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sepia: { // 自定义护眼色调
          bg: '#f5f0e1',
          text: '#4a4036',
          card: '#fffbf0',
          border: '#e6dec1'
        }
      }
    },
  },
  plugins: [],
}

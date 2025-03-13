module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-bg': '#1a1b26',
        'terminal-text': '#a9b1d6',
        'terminal-highlight': '#7aa2f7',
        'terminal-green': '#9ece6a',
        'terminal-purple': '#bb9af7',
        'terminal-error': '#f7768e',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
} 
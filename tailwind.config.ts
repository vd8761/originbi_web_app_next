import type { Config } from "tailwindcss";

const config: Config = {
  // 🔴 CRITICAL: This enables the manual toggle from your ThemeContext
  darkMode: "class", 

  content: [
    // If you are using the 'src' directory (Standard in modern Next.js)
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    
    // Fallback paths if you are NOT using 'src' directory
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'personality-gradient': 'radial-gradient(circle at 80% 20%, rgba(237, 51, 51, 0.3), transparent 70%)',
      },
      colors: {
        'brand-dark-primary': '#1A1D21',
        'brand-dark-secondary': '#24272B',
        'brand-dark-tertiary': '#303438',
        'brand-light-primary': '#FFFFFF',
        'brand-light-secondary': '#F7FAFC',
        'brand-light-tertiary': '#E2E8F0',
        'brand-green': '#1ED36A',
        'brand-dark-green': '#1A3A2C',
        'brand-red': '#C63232',
        
        // Text colors
        'brand-text-primary': '#FFFFFF',         // Dark mode text (usually white)
        'brand-text-secondary': '#A0AEC0',       // Dark mode subtext
        'brand-text-light-primary': '#2D3748',   // Light mode text (dark gray)
        'brand-text-light-secondary': '#718096', // Light mode subtext
      },
      fontFamily: {
        sans: ['Haskoy', 'Manrope', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-in-out forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0.5', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
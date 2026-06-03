/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cream: '#FAF7F2',
        ink: '#1A1612',
        muted: '#6B6460',
        border: '#E5DDD5',
        urgent: '#DC2626',
        'urgent-bg': '#FEF2F2',
        'urgent-border': '#FECACA',
        accent: '#2563EB',
        'accent-light': '#EFF6FF',
        exam: '#7C3AED',
        event: '#059669',
        general: '#6B6460',
      },
    },
  },
  plugins: [],
}

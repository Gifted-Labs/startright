/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Inter', 'system-ui', 'sans-serif'], // For Headings
                script: ['Dancing Script', 'cursive'],
            },
            colors: {
                dark: {
                    900: '#121212',
                    950: '#0A0A0A',
                },
                primary: {
                    50: '#fff5f5',
                    100: '#ffe3e3',
                    200: '#ffc9c9',
                    300: '#ffa8a8',
                    400: '#ff6b6b',
                    500: '#FF0000', // Main Brand Color (Red)
                    600: '#e60000', // Darker interaction
                    700: '#c90000',
                    800: '#a30000',
                    900: '#820000',
                },
                secondary: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                }
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(to right bottom, #0A0A0A, #121212)',
                'red-glow': 'conic-gradient(from 180deg at 50% 50%, #FF0000 0deg, rgba(255, 0, 0, 0) 360deg)',
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}

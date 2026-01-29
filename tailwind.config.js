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
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    300: '#fdba74',
                    400: '#FF8A3D', // Secondary accent
                    500: '#FF6B00', // Main Brand Color
                    600: '#EA580C', // Darker interaction
                    700: '#c2410c',
                    800: '#9a3412',
                    900: '#7c2d12',
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
                'orange-glow': 'conic-gradient(from 180deg at 50% 50%, #FF6B00 0deg, rgba(255, 107, 0, 0) 360deg)',
            }
        },
    },
    plugins: [],
}

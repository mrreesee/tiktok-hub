/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#6dbcdb',
                    DEFAULT: '#3b82f6',
                    dark: '#1d4ed8',
                },
                secondary: {
                    light: '#99f6e4',
                    DEFAULT: '#14b8a6',
                    dark: '#0f766e',
                },
                accent: {
                    warm: '#fbbf24',
                }
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
            }
        },
    },
    plugins: [],
}

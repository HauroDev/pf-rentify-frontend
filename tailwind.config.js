/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				dark_purple: '#4700D8',
				medium_purple: '#9900F0',
				light_purple: '#9900F0',
				lighter_purple: '#9900F0',
				text_light: '#333333',
				body_dark: '#333333',
				body_light: '#F5F6F8',
				text_dark: '#F5F6F8',
				gray_dark: '#999999',
				gray_medium: '#CCCCCC',
				purple_badge: '#FFC7F2',
			},
		},
	},
	plugins: [],
}

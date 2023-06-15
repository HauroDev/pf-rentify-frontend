/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				dark_purple: '#4700D8',
				medium_purple: '#9900F0',
				light_purple: '#AF88FF',
				medium_fuchsia: '#F900BF',
				light_fuchsia: '#FF85B3',
				text_light: '#333333',
				body_dark: '#252525',
				body_light: '#F5F6F8',
				card_dark: '#353535',
				text_dark: '#F5F6F8',
				gray_dark: '#999999',
				gray_medium: '#CCCCCC',
				modal_bg_50: 'rgba(25,25,25,0.80)',
				purple_badge: '#FFC7F2',
			},
		},
	},
	plugins: [],
}

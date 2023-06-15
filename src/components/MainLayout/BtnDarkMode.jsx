import { useEffect, useState } from 'react'
import MoonIcon from '../icons/MoonIcon'
import SunIcon from '../icons/SunIcon'

const initialThemeState = () => {
	if (localStorage.getItem('theme')) {
		return localStorage.getItem('theme')
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function BtnDarkMode() {
	const [theme, setTheme] = useState(initialThemeState)

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
		localStorage.setItem('theme', theme)
	}, [theme])

	const handleTheme = () => {
		theme === 'light' ? setTheme('dark') : setTheme('light')
	}

	return (
		<div onClick={handleTheme} className='cursor-pointer'>
			{theme === 'light' && <SunIcon className='stroke-dark_purple dark:stroke-light_purple' />}
			{theme === 'dark' && <MoonIcon className='stroke-dark_purple dark:stroke-light_purple' />}
		</div>
	)
}

export default BtnDarkMode

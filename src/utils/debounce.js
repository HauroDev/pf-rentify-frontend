function debounce(callback, wait) {
	let timerId
	return (...args) => {
		clearTimeout(timerId)
		timerId = setTimeout(() => {
			callback(...args)
		}, wait)
	}
}

// function debounce(func, delay = 300) {
// 	let timeoutId

// 	return (...args) => {
// 		clearTimeout(timeoutId)

// 		timeoutId = setTimeout(() => {
// 			func.apply(this, args)
// 		}, delay)
// 	}
// }

export { debounce }

document.addEventListener("DOMContentLoaded", function () {
	const elements = document.querySelectorAll(
		"#title, #intro,  #intro-1,  #intro-2, #fact1, #fact2, #fact3, #main, #title2, #links a"
	)
	let delay = 0

	elements.forEach((element) => {
		setTimeout(() => {
			typewriter(element, element.textContent)
		}, delay)
		delay += element.textContent.length * 50 + 1000 // Adjust delay based on text length
	})
})

function typewriter(element, text) {
	let i = 0
	element.textContent = "" // Clear the text initially
	element.style.visibility = "visible"
	const timer = setInterval(() => {
		if (i < text.length) {
			element.textContent += text.charAt(i)
			i++
		} else {
			clearInterval(timer)
		}
	}, 50) // Adjust typing speed
}

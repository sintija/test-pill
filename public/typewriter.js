document.addEventListener("DOMContentLoaded", function () {
	const greenText = document.getElementById("green-text")
	const whiteText = document.getElementById("white-text")

	function animateText() {
		whiteText.style.color = "transparent" // Reset to transparent initially
		greenText.style.width = "0" // Reset width for green text
		whiteText.style.width = "0" // Reset width for white text

		greenText.classList.add("animate-green")
		setTimeout(() => {
			greenText.style.color = "limegreen" // Show green text
			whiteText.classList.add("animate-white")
			setTimeout(() => {
				whiteText.style.color = "white" // Show white text after green
			}, 4000) // Delay to match the CSS animation time
		}, 0)
	}

	animateText() // Initial animation
	setInterval(animateText, 8000) // Loop the animation every 8 seconds
})

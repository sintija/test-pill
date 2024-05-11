const fs = require("fs")
const path = require("path")

const copyFiles = () => {
	const filesToCopy = ["index.html", "style.css", "client.js"]

	filesToCopy.forEach((file) => {
		fs.copyFileSync(
			path.join(__dirname, "public", file),
			path.join(__dirname, "dist", file)
		)
	})

	console.log("Files copied to dist directory successfully!")
}

copyFiles()

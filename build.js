const fs = require("fs")
const path = require("path")

const copyFiles = () => {
	const filesToCopy = ["index.html", "style.css", "client.js"] // Ensure these are the files you need

	filesToCopy.forEach((file) => {
		// Make sure 'dist' directory exists
		if (!fs.existsSync(path.join(__dirname, "dist"))) {
			fs.mkdirSync(path.join(__dirname, "dist"))
		}
		// Copy file from 'public' to 'dist'
		fs.copyFileSync(
			path.join(__dirname, "public", file),
			path.join(__dirname, "dist", file)
		)
	})

	console.log("Files copied to dist directory successfully!")
}

// Call copyFiles in your build script
copyFiles()

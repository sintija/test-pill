const express = require("express")
const app = express()
const path = require("path")

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")))

// Additional middleware to serve '/build/' and '/jsm/' directories from node_modules
app.use(
	"/build/",
	express.static(path.join(__dirname, "node_modules", "three", "build"))
)
app.use(
	"/jsm/",
	express.static(
		path.join(__dirname, "node_modules", "three", "examples", "jsm")
	)
)

// Route to serve the main HTML file
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Listen on port 3000
app.listen(3000, () => console.log("Server running on http://127.0.0.1:3000"))

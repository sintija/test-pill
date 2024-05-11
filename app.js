const express = require("express")
const path = require("path")
const app = express()

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")))

// Serve three.module.js and OrbitControls.js
app.use(
	"/build",
	express.static(path.join(__dirname, "node_modules/three/build"))
)
app.use(
	"/jsm/controls",
	express.static(
		path.join(__dirname, "node_modules/three/examples/jsm/controls")
	)
)

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "public", "index.html"))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
)

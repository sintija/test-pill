const express = require("express")
const app = express()
const path = require("path")

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")))

app.listen(3000, () => console.log("Server running on http://127.0.0.1:3000"))

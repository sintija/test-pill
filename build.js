const { Parcel } = require("@parcel/core")
const path = require("path")

async function build() {
	const bundler = new Parcel({
		entries: path.join(__dirname, "public/index.html"),
		distDir: path.join(__dirname, "dist"),
		defaultConfig: "@parcel/config-default",
		mode: "production",
		shouldDisableCache: true,
	})

	try {
		await bundler.run()
	} catch (error) {
		console.error(error)
	}
}

build()

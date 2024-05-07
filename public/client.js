import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js"

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	100
)
camera.position.z = 10

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

// Initial parameters for capsule
const initialRadius = 1 // Adjusted to a smaller initial radius
const initialLength = 3 // You can adjust this length as needed

// Capsule geometry and material setup
// Capsule geometry and material setup
const geometry = new THREE.CapsuleGeometry(initialRadius, initialLength, 20, 10)
const material = new THREE.MeshBasicMaterial({ color: 0x00bfff }) // Light blue color
const capsule = new THREE.Mesh(geometry, material)
scene.add(capsule)

// Cylinder to act as the black border in the middle
const cylinderGeometry = new THREE.CylinderGeometry(
	initialRadius + 0.1,
	initialRadius + 0.1,
	0.2,
	32
)
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }) // Black color
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
cylinder.position.y = 0 // Ensure it's centered
scene.add(cylinder)

const gui = new GUI()
const params = {
	radius: 1,
	length: 3,
	capSegments: 20,
	radialSegments: 20,
	borderThickness: 0.1, // control for the thickness of the border
}

gui.add(params, "radius", 1, 10).onChange(function (value) {
	updateCapsule(value, params.length, params.radialSegments, params.capSegments)
})
gui.add(params, "length", 1, 20).onChange(function (value) {
	updateCapsule(params.radius, value, params.radialSegments, params.capSegments)
})
gui.add(params, "capSegments", 2, 20).onChange(function (value) {
	updateCapsule(params.radius, params.length, params.radialSegments, value)
})
gui.add(params, "radialSegments", 8, 32).onChange(function (value) {
	updateCapsule(params.radius, params.length, value, params.capSegments)
})
gui.add(params, "borderThickness", 0.1, 1).onChange(function (value) {
	updateBorder(value)
})

function updateCapsule(radius, length, radialSegments, capSegments) {
	scene.remove(capsule)
	const updatedGeometry = new THREE.CapsuleGeometry(
		radius,
		length,
		radialSegments,
		capSegments
	)
	capsule.geometry.dispose() // Dispose of old geometry
	capsule.geometry = updatedGeometry
	scene.add(capsule)
	updateBorder(params.borderThickness) // Ensure border updates with capsule
}

function updateBorder(thickness) {
	scene.remove(cylinder)
	const updatedGeometry = new THREE.CylinderGeometry(
		capsule.geometry.parameters.radius + 0.1,
		capsule.geometry.parameters.radius + 0.1,
		thickness,
		32
	)
	cylinder.geometry.dispose() // Dispose of old geometry
	cylinder.geometry = updatedGeometry
	scene.add(cylinder)
}

window.addEventListener(
	"resize",
	function () {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize(window.innerWidth, window.innerHeight)
	},
	false
)

function animate() {
	requestAnimationFrame(animate)
	capsule.rotation.x += 0.01
	capsule.rotation.y += 0.01
	cylinder.rotation.x += 0.01 // Rotate the border with the capsule
	cylinder.rotation.y += 0.01
	renderer.render(scene, camera)
}

animate()

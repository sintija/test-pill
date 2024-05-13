import * as THREE from "three"
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { OrbitControls } from "./jsm/controls/OrbitControls.js"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	100
)
camera.position.z = 15

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById("canvas-container").appendChild(renderer.domElement)

// Setup OrbitControls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableZoom = false // Disable zooming with the mouse wheel

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.position.set(1, 1, 1)
directionalLight.castShadow = true
scene.add(directionalLight)

// Capsule geometry and material setup
const initialRadius = 1
const initialLength = 3
const radialSegments = 30 // Smooth curvature
const capSegments = 20 // Keep cap segments as is

const geometry = new THREE.CapsuleGeometry(
	initialRadius,
	initialLength,
	radialSegments,
	capSegments
)
const material = new THREE.MeshPhongMaterial({
	color: 0x005f00, // Dark green
	specular: 0x111111, // Low-intensity specular highlights
	shininess: 100, // Shiny surface for a realistic look
})
const capsule = new THREE.Mesh(geometry, material)
capsule.castShadow = true
capsule.receiveShadow = true
scene.add(capsule)

// Cylinder to act as the black border in the middle
const cylinderGeometry = new THREE.CylinderGeometry(
	initialRadius + 0.1,
	initialRadius + 0.1,
	0.2,
	32
)
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
cylinder.castShadow = true
cylinder.receiveShadow = true
cylinder.position.y = 0 // Ensure it's centered
scene.add(cylinder)

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

import '../styles/sphere.css'
import '../styles/float.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
// const gui = new dat.GUI()

// Textures Loader
const textureLoader = new THREE.TextureLoader()
const normalMap = textureLoader.load('../img/textures/for_sphere.png')

// Canvas
const canvas = document.querySelector('#bg')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials
const material = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.7,
    roughness: 0.2,
    normalMap: normalMap
})

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights
const pointLight1 = new THREE.PointLight(0xffffff, 0.1)
pointLight1.position.set(2, 3, 4)

const pointLight2 = new THREE.PointLight(0xff0000, 0.1)
pointLight2.position.set(-1.86, 1, -1.65)
pointLight2.intensity = 10

const pointLight3 = new THREE.PointLight(0xe1ff, 0.1)
pointLight3.position.set(2.13, -3, -1.98)
pointLight3.intensity = 6.8

scene.add(pointLight1, pointLight2, pointLight3)

// GUI for Lights
// const light2GUI = gui.addFolder('Light 2')
// light2GUI.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
// light2GUI.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
// light2GUI.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
// light2GUI.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

// // const light2Helper = new THREE.PointLightHelper(pointLight2, 1)
// // scene.add(light2Helper)

// const light3GUI = gui.addFolder('Light 3')
// light3GUI.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
// light3GUI.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
// light3GUI.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
// light3GUI.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

// const light3Color = { color: 0xff0000 }
// light3GUI.addColor(light3Color, 'color').onChange(() => {
//     pointLight3.color.set(light3Color.color)
// })

// const light3Helper = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(light3Helper)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 2)
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

const windowsHalfX = window.innerWidth / 2
const windowsHalfY = window.innerHeight / 2

const clock = new THREE.Clock()

const onDocumentMouseMove = (event) => {
    mouseX = (event.clientX - windowsHalfX)
    mouseY = (event.clientY - windowsHalfY)
}

const updateSphereScroll = () => {
    sphere.position.y = window.scrollY * .001
}

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // animate based on mouse movements
    targetX = mouseX * .001
    targetY = mouseY * .001

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

document.addEventListener('mousemove', onDocumentMouseMove)
window.addEventListener('scroll', updateSphereScroll)
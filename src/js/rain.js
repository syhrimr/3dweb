import '../styles/rain.css'
import '../styles/float.css'
import * as THREE from 'three'
import { Geometry } from 'three/examples/jsm/deprecated/Geometry.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('#bg')

// Scene
const scene = new THREE.Scene()

// Textures
const loader = new THREE.TextureLoader()
const smokeTexture = loader.load('../img/textures/smoke4.png')

// Objects
const cloudGeo = new THREE.PlaneBufferGeometry(500, 500)

const rainGeo = new THREE.BufferGeometry()
const rainCount = 15000

for (let i = 0; i < rainCount; i++) {
    const rainDrop = new THREE.Vector3(
        Math.random() * 400 - 200,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200
    )
    rainDrop.velocity = {}
    rainDrop.velocity = 0
    // rainGeo.vertices.push(rainDrop)
}

// Materials
const cloudMat = new THREE.MeshLambertMaterial({
    map: smokeTexture,
    transparent: true
})

const rainMat = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: .1,
    transparent: true
})

// Mesh
const cloudParticles = []

for (let i = 0; i < 25; i++) {
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat)
    cloudMesh.position.set(
        Math.random() * 800 - 400,
        500,
        Math.random() * 500 - 450
    )
    cloudMesh.rotation.set(
        1.16,
        -0.12,
        Math.random() * 360
    )
    cloudMesh.material.opacity = 0.6
    cloudParticles.push(cloudMesh)
    scene.add(cloudMesh)
}

const rain = new THREE.Points(rainGeo, rainMat)
scene.add(rain)

// Lights
const ambientLight = new THREE.AmbientLight(0x55555)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffeedd)
directionalLight.position.set(0, 0, 1)
scene.add(directionalLight)

const flash = new THREE.PointLight(0x062d89, 30, 500, 1.7)
flash.position.set(200, 300, 100)
scene.add(flash)

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
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 1, 1000)
camera.position.z = 1
camera.rotation.set(1.16, -0.12, 0.27)
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
scene.fog = new THREE.FogExp2(0x1c1c2a, .002)
renderer.setClearColor(scene.fog.color)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    cloudParticles.forEach(index => {
        index.rotation.z -= .001
    })

    // rainGeo.vertices.forEach(index => {
    //     index.velocity -= .1 + Math.random() * .1
    //     index.y += index.velocity

    //     if (index.y < -200) {
    //         index.y = 200
    //         index.velocity = 0
    //     }
    // })
    // rainGeo.verticesNeedUpdate = true
    rain.rotation.y += 0.002

    if (Math.random() > 0.93 || flash.power > 100) {
        if (flash.power < 100) {
            flash.position.set(
                Math.random() * 400,
                300 + Math.random() * 200,
                100
            )
        }
        flash.power = 50 + Math.random() * 500
    }

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
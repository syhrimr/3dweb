import '../styles/sphere.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// loading...
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('../img/textures/for_sphere.png')

// debug
const gui = new dat.GUI()

// canvas
const canvas = document.querySelector( 'canvas.bg' )

// scene
const scene = new THREE.Scene()

// objects
const geometry = new THREE.SphereBufferGeometry( .5, 64, 64 )

// materials
const material = new THREE.MeshStandardMaterial({ 
    color: 0x292929,
    metalness: 0.7,
    roughness: 0.2
})

// mesh
const sphere = new THREE.Mesh( geometry, material )
scene.add( sphere )

// lights
const pointLightWhite = new THREE.PointLight( 0xffffff, .1 )
pointLightWhite.position.set( 2, 3, 4 )

const pointLightRed = new THREE.PointLight( 0xff0000, 2 )
pointLightRed.position.set( -1.86, 1, -1.65 )
pointLightRed.intensity = 1
scene.add( pointLightWhite, pointLightRed )

// sizes
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

// update size based on window
window.addEventListener('resize', () => {
    // update size
    size.width = window.innerWidth
    size.height = window.innerHeight
    
    // update camera
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    
    // update renderer
    renderer.setSize( size.width, size.height )
    renderer.setPixelRatio( Math.min( window.devicePixelRatio(),2 ))
})

// camera
// base camera
const camera = new THREE.PerspectiveCamera( 75, size.width / size.height, .1, 100 )
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add( camera )

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize( size.width, size.height )
renderer.setPixelRatio( Math.min( window.devicePixelRatio(),2 ))

// animate
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // update objects
    sphere.rotation.y = .5 * elapsedTime

    // update orbit controls
    // controls.update()

    // call tick again on the next frame
    window.requestAnimationFrame( tick )
}
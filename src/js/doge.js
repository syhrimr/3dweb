import '../styles/doge.css'
import '../styles/float.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// set up scene, camere and renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight )
camera.position.setZ( 30 )
renderer.render( scene, camera )

// create objects: torus
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 })
const torus = new THREE.Mesh( geometry, material )
scene.add(torus)

// light
const pointLight = new THREE.PointLight( 0xffffff )
const ambientLight = new THREE.AmbientLight( 0xffffff )
pointLight.position.set( 5, 5, 5 )
scene.add( pointLight, ambientLight )

// helper
// const lightHelper = new THREE.PointLightHelper( pointLight )
// const gridHelper = new THREE.GridHelper( 200, 50 )
// scene.add( lightHelper, gridHelper )

// scene controller
const controls = new OrbitControls( camera, renderer.domElement )

// load image as background
const spaceTexture = new THREE.TextureLoader().load('../img/textures/space.jpg')
scene.background = spaceTexture

// load image as object texture
const dogeTexture = new THREE.TextureLoader().load('../img/textures/dogecoin.jpg')
const dogeCube = new THREE.Mesh(
  new THREE.BoxGeometry( 3, 3, 3 ),
  new THREE.MeshBasicMaterial( { map: dogeTexture } )
)
scene.add(dogeCube)

// create a moon
const moonTexture = new THREE.TextureLoader().load('../img/textures/moon.jpg')
const normalTexture = new THREE.TextureLoader().load('../img/textures/normal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry( 3, 32, 32 ),
  new THREE.MeshStandardMaterial({ 
    map: moonTexture,
    normalMap: normalTexture
  })
)
scene.add( moon )

// rearrange position
moon.position.x = -10 
moon.position.z = 30
dogeCube.position.x = 2
dogeCube.position.z = -5

// function call
animate()

Array(200).fill().forEach( addStars )

document.body.onscroll = moveCamera
moveCamera()

// moving camera when scroll
function moveCamera() {
  const top = document.body.getBoundingClientRect().top
  moon.rotation.x += 0.05
  moon.rotation.y += 0.075
  moon.rotation.z += 0.05

  dogeCube.rotation.y += 0.01
  dogeCube.rotation.z += 0.01

  camera.position.z = top * -0.01
  camera.position.x = top * -0.0002
  camera.position.y = top * -0.0002
}

// generate random stars
function addStars() {
  const geometry = new THREE.SphereGeometry( 0.25, 24, 24 )
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
  const star = new THREE.Mesh( geometry, material )
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 )) // randomize stars position within a range

  star.position.set(x, y, z)
  scene.add(star)
}

// animate loop
function animate() {
  requestAnimationFrame( animate )

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  controls.update() // update reflected changes

  renderer.render( scene, camera )
}
import '../styles/rain.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 1000)
camera.position.z = 1
camera.rotation.set(1.16, -0.12, 0.27)

let ambientLight = new THREE.AmbientLight(0x555555)

let directionalLight = new THREE.DirectionalLight(0xffeedd)
directionalLight.position.set(0, 0, 1)

scene.add(ambientLight, directionalLight)
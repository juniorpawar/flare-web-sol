import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- SCENE SETUP ---
const scene = new THREE.Scene();
// scene.background = new THREE.Color("#090128");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping; // Recommended for realistic rendering with HDRIs
renderer.toneMappingExposure = 2; // Adjust exposure to your liking
const sceneContainer = document.querySelector("#scene-container")
sceneContainer.appendChild(renderer.domElement);
const canvas = document.querySelector("canvas");

const deg = (degree) => { // helper function
    return THREE.MathUtils.degToRad(degree)
}

// // Add OrbitControls 🎮
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enables smooth control movement
controls.dampingFactor = 0.05; // Adjusts the "smoothness"


// --- ANIMATION COMPONENTS ---
const clock = new THREE.Clock();
let mixer;
let model;

// --- HDRI LOADING AND SETUP ---
const rgbeLoader = new THREE.RGBELoader();
//path to hdri file
const hdriUrl = './models/studio.hdr';

rgbeLoader.load(hdriUrl, (texture) => {
    // Create a PMREMGenerator to process the HDRI
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;

    // Set the HDRI as the scene's background and environment map
    // scene.background = envMap;
    scene.environment = envMap;

    // Clean up to free memory
    texture.dispose();
    pmremGenerator.dispose();
});

// --- MODEL LOADING ---
const loader = new THREE.GLTFLoader();
const modelUrl = './models/robot_playground.glb';

let initialPosition, initialRotation;

loader.load(
    modelUrl,
    function (gltf) {
        model = gltf.scene;
        model.position.y = -1

        initialPosition = model.position.clone();
        initialRotation = model.rotation.clone();

        scene.add(model);
        console.log('Model loaded!', model);

        // --- ANIMATION SETUP ---
        mixer = new THREE.AnimationMixer(model);
        if (gltf.animations.length > 0) {
            const action = mixer.clipAction(gltf.animations[0]); //clip actions are already present in the glb file
            action.play();
        }
    },
    function (xhr) {
        canvas.innerHTML = "<h1>hello<h1/>"
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('An error occurred while loading the model', error);
    }
);

// --- ANIMATION LOOP ---
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    // Update controls in the animation loop
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enableZoom = false;
    controls.update();

    if (mixer) {
        mixer.update(delta);
    }

    renderer.render(scene, camera);
}

function resetModel() {
    console.log("RESET")
    model.position.copy(initialPosition);
    model.rotation.copy(initialRotation);
    responsiveLayout(); // Also reset the camera controls to the initial state
    controls.reset();
}

canvas.addEventListener("touchend", () => {
    window.
    setTimeout(resetModel, 10000)
})


// Start the animation loop when the window loads.
window.onload = function () {
    responsiveLayout();
    animate();
}

// --- RESPONSIVE DESIGN ---

const responsiveLayout = () => {
    let width = window.innerWidth;
    // console.log("width = ", width)
    if (width <= 640) {
        camera.position.z = 5;
    }
    else if (width > 640 && width <= 768) {
        camera.position.z = 5;
    }
    else if (width > 768 && width <= 1024) {
        camera.position.z = 4;
        canvas.classList.remove("big-canvas")
    }
    else if (width > 1024 && width <= 1280) {
        camera.position.z = 4;
        canvas.classList.add("big-canvas")
    }
    else {
        camera.position.z = 4;
        canvas.classList.add("big-canvas")
    }

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', responsiveLayout)
window.addEventListener('load', responsiveLayout)
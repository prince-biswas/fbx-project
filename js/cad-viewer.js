
let scene, camera, renderer, controls;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(100, 100, 100);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const vc = document.getElementById("viewer-container");
    if (vc) vc.appendChild(renderer.domElement);

    controls = new THREE.TrackballControls(camera, renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff));
    scene.add(new THREE.DirectionalLight(0xffffff));

    animate();
}

function loadOriginalModel() {
    const loader = new THREE.FBXLoader();
    loader.load('model/Mercedes_Benz_GLE_class.fbx', (loadedScene) => {
        scene.add(loadedScene);
        loadedScene.rotation.set(-Math.PI / 2, 0, 0);
        setCameraControlS(loadedScene);
    });
}

function loadRedSizeModel() {
    let gltfLoader = new THREE.GLTFLoader();
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/')

    gltfLoader = gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load('model/Mercedes_Benz_GLE_class.glb', (loadedScene) => {
        scene.add(loadedScene.scene);
        setCameraControlS(loadedScene.scene);
    });
}

function setCameraControlS(obj) {
    var bb = new THREE.Box3().setFromObject(obj);
    var cc = bb.getCenter();
    var d = bb.min.distanceTo(bb.max);

    camera.position.set(d, d, d);
    controls.target.copy(cc);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}

init();
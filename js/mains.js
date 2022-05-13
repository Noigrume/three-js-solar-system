///////////////////////////////////////////////////////////////////////////// const /////////////////////////////////////////////////////////

const scene = new THREE.Scene();

// (degres, ratio, vision la plus proche, vision la plus lointaine)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer(
    {
        //texture plus clean au zoom
        antialias: true
    }
);

const mouse = {
    x: undefined,
    y: undefined
}
const group = new THREE.Group()

function createPlanete(size, texture, position) {
    const coat = './img/' + texture;
    const geo = new THREE.SphereGeometry(size, 64, 32);
    const mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(coat)
    });

    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

/************************************************************** étoiles *************************************************************/
const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
})

const starsPosition = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -Math.random() * 5000;
    starsPosition.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsPosition, 3));
const stars = new THREE.Points(starGeometry, starMaterial)

/************************************************************** planète *************************************************************/
const mercury = createPlanete(4, '8k_mercury.jpg', 18);
const venus = createPlanete(4, '8k_venus_surface.jpg', 78);
const earth = createPlanete(4, '2k_earth_daymap.jpg', 78);
const mars = createPlanete(10, '2k_mars.jpg', 68);
const jupiter = createPlanete(4, '8k_jupiter.jpg', 78);
const saturn = createPlanete(4, '2k_mars.jpg', 78);
const uranus = createPlanete(4, '2k_mars.jpg', 78);
const neptune = createPlanete(4, '2k_mars.jpg', 78);
//radius, 'smoothness", hauteur
const sphereGeometry = new THREE.SphereGeometry(50, 50, 50);
const material = new THREE.MeshBasicMaterial(
    {
        //color: 0x00ff00
        //placer une image de mars autour
        map: new THREE.TextureLoader().load('./img/2k_sun.jpg')
    }
);

// 2 arguments (2js geometrie +
const planetShape = new THREE.Mesh(sphereGeometry, material);
/************************************************************** lune *************************************************************/
const moon = createPlanete(4, '2k_moon.jpg', 7);


///////////////////////////////////////////////////////////////////////////////////scene/////////////////////////////////////////////////////////
scene.add(stars)
scene.add(planetShape);
scene.add(group);


///////////////////////////////////////////////////////////////////////caméra/////////////////////////////////////////////////////////////////

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

group.add(planetShape)

// !! par défaut la caméra est placée au centre (donc dans la spère), on doit la reculer d'un valeur supérieure à la largeur de notre objet
camera.position.z = 135;

////////////////////////////////////////////////////////////  fonction ////////////////////////////////////////////////////////////
function animate() {
    requestAnimationFrame(animate);

    // planetShape.rotation.y += 0.005;
    planetShape.rotateY(.005)
    // moonShape.rotation.y += 0.005;
    group.rotation.x = mouse.y * 0.3;
    group.rotation.y = mouse.x * 0.3;
    group.rotateY(.005)




    // moonShape.position.set(0, 0, 0);
    // moonShape.rotateY(.008);
    // moonShape.translateX(10);
    // moonShape.translateY(1);
    //earth.obj.rotateY(0.004);
    //rotation speed arround the sun
    // mercury.obj.rotateY(0.002);
    // mercury.obj.rotation.x = 5;
    // venus.obj.rotateY(0.003);
    // earth.obj.rotateY(0.004);
    // earth.obj.rotation.x = 25;
    // mars.obj.rotateY(0.005);
    // jupiter.obj.rotateY(0.006);
    // saturn.obj.rotateY(0.007);
    // uranus.obj.rotateY(0.008);
    // neptune.obj.rotateY(0.009);

  //  moon.obj.rotateY(0.019);
    group.add(earth.obj);
    earth.obj.rotateY += 0.1;

    renderer.render(scene, camera);
};

animate();

//traduire le mvt souris 2d dans notre espace 3d
addEventListener('mousemove', () => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = (event.clientY / innerWidth) * 2 + 1;
})
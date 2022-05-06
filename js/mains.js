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
    const coat = './img/'+texture;
    const geo = new THREE.SphereGeometry(size, 30, 30);
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
const mars = createPlanete(4, '2k_mars.jpg', 78);
//radius, 'smoothness", hauteur
const sphereGeometry = new THREE.SphereGeometry(5, 50, 50);
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

const moonGeometry = new THREE.SphereGeometry(2, 50, 30);
const moonMaterial = new THREE.MeshBasicMaterial(
    {
        map: new THREE.TextureLoader().load('./img/2k_earth_daymap.jpg')
    }
);

// 2 arguments (2js geometrie +
const moonShape = new THREE.Mesh(moonGeometry, moonMaterial);
// moonShape.position.x += 6;
// moonShape.translateY(6);
// moonShape.translateX(6);


///////////////////////////////////////////////////////////////////////////////////scene/////////////////////////////////////////////////////////
scene.add(stars)
scene.add(planetShape);
scene.add(group);
scene.add(moonShape)
///////////////////////////////////////////////////////////////////////caméra/////////////////////////////////////////////////////////////////

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

group.add(planetShape)

// !! par défaut la caméra est placée au centre (donc dans la spère), on doit la reculer d'un valeur supérieure à la largeur de notre objet
camera.position.z = 15;

////////////////////////////////////////////////////////////  fonction ////////////////////////////////////////////////////////////
function animate() {
    requestAnimationFrame(animate);

    // planetShape.rotation.y += 0.005;
    planetShape.rotateY(.005)
    // moonShape.rotation.y += 0.005;
    group.rotation.x = mouse.y * 0.3;
    group.rotation.y = mouse.x * 0.3;
    group.rotateY(.005)

    moonShape.position.set(0, 0, 0);
    moonShape.rotateY(.008);
    moonShape.translateX(10);
    moonShape.translateY(1);

    mars.obj.rotateY(0.008);

    renderer.render(scene, camera);
};

animate();

//traduire le mvt souris 2d dans notre espace 3d
addEventListener('mousemove', () => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = (event.clientY / innerWidth) * 2 + 1;
})
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 200;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.load('models/room.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/room.obj', function (object) {
    object.position.x -= 30;
    object.scale.x = 2;
    object.scale.y = 2;
    object.scale.z = 2;
    scene.add(object);
    });

});

var item;
var mtlitemLoader = new THREE.MTLLoader();
mtlitemLoader.load('models/robot.mtl', function (materials) {
    materials.preload();
    var itemLoader = new THREE.OBJLoader();
    itemLoader.setMaterials(materials);
    itemLoader.load('models/robot.obj', function (object) {
        object.position.x += 30;
        object.scale.x = 0.05;
        object.scale.y = 0.05;
        object.scale.z = 0.05;
        item = object;
        scene.add(object);
    });

});

var animate = function () {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render(scene, camera);
};

animate();


var gui;
gui = new dat.GUI();

var parameters = 
{
    x: 30, y: 0, z: 0
    // scale: 0.05
    // opacity: 1, 
    // visible: true,
    // material: "Phong",
    // reset: function() { resetCube() }
};

var folder1 = gui.addFolder('Position');
var itemX = folder1.add( parameters, 'x' ).min(-200).max(200).step(1).listen();
var itemY = folder1.add( parameters, 'y' ).min(-100).max(100).step(1).listen();
var itemZ = folder1.add( parameters, 'z' ).min(-200).max(200).step(1).listen();
folder1.open();

itemX.onChange(function(value) 
{   item.position.x = value;   });
itemY.onChange(function(value) 
{   item.position.y = value;   });
itemZ.onChange(function(value) 
{   item.position.z = value;   });


// var itemOpacity = gui.add( parameters, 'opacity' ).min(0).max(1).step(0.01).name('Opacity').listen();
// itemOpacity.onChange(function(value)
// {   item.material.opacity = value;   });

// var itemMaterial = gui.add( parameters, 'material', [ "Basic", "Lambert", "Phong", "Wireframe" ] ).name('Material Type').listen();
// itemMaterial.onChange(function(value) 
// {   updateCube();   });

// var itemVisible = gui.add( parameters, 'visible' ).name('Visible?').listen();
// itemVisible.onChange(function(value) 
// {   item.visible = value;   });

// gui.add( parameters, 'reset' ).name("Reset Cube Parameters");

gui.open();
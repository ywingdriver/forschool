var canvas = document.getElementById("myCanvas");
var engine = new BABYLON.Engine(canvas, true)

var createScene = function() {
  var scene = new BABYLON.Scene(engine)
  var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

	var hLight1 = new BABYLON.HemisphericLight("hLight1", new BABYLON.Vector3(1, 1, 0), scene);
  var pLight1 = new BABYLON.PointLight("pLight1", new BABYLON.Vector3(1, -1, -1), scene);
  var pLight2 = new BABYLON.PointLight("pLight2", new BABYLON.Vector3(0, 1, -1), scene);

  var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: 3, diameterX: 3}, scene);

  var frameRate = 1; // ??
  var animationSphere = new BABYLON.Animation("animationSphere", "rotation.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                  BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

  var keyFramesR = [];

	keyFramesR.push({
	   frame: frameRate,
	   value: Math.PI
	});

	keyFramesR.push({
	   frame: 2 * frameRate,
	   value: 2 * Math.PI
	});

	keyFramesR.push({
	   frame: 3 * frameRate,
	   value: 3 * Math.PI
	});

  animationSphere.setKeys(keyFramesR);
  sphere.animations.push(animationSphere);

  scene.beginAnimation(sphere, 0, 360, 2 * frameRate, true);

  // Textures
  var mat = new BABYLON.StandardMaterial("mat", scene);
  var texture = new BABYLON.Texture("img/globe.jpg", scene);
  texture.vScale = -1
  mat.diffuseTexture = texture;
  sphere.material = mat;


  var boxFaceColors = [new BABYLON.Color4(0,1,0,1), new BABYLON.Color4(1,0,0,1), new BABYLON.Color4(0,0,1,1),
                    new BABYLON.Color4(1,0,1,1), new BABYLON.Color4(1,1,0,1), new BABYLON.Color4(0,1,1,1)]

  var boxOptions = {
    width: .2,
    height: 3,
    depth: 3,
    faceColors: boxFaceColors
  }
  var box = BABYLON.MeshBuilder.CreateBox("box", boxOptions, scene);
  box.position.x = 3.5
  box.position.y = 1.5
  box.position.z = -.1

  // Textures
  var matBox = new BABYLON.StandardMaterial("mat", scene);
  var textureBox = new BABYLON.Texture("img/creepy.png", scene);
  textureBox.wAng = 90;
  matBox.diffuseTexture = textureBox;
  box.material = matBox;

  // Music
  var music = new BABYLON.Sound("Music", "audio/cgb.mp3", scene, null, { loop: true, autoplay: true });


  return scene
}
var scene = createScene();

engine.runRenderLoop(function () {
        scene.render();
});

window.addEventListener("resize", function () {
        engine.resize();
});

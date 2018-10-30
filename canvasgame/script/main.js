var WIDTH = 1200,
    HEIGHT = 800;
var canvas, ctx, background,
    keydown = null,
    allItems = [];
window.addEventListener("keydown", updateKey, false)
window.addEventListener("keyup", clearKey, false)
window.onload = function() {

    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    background = new Image();
    background.src = "img/this.jpg"
    background.onload = function(){
      ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);
    }


    allItems.push(new creepy(posX = 100, posY = 100, vX = 2, vY = 2))
    allItems.push(new creepy(posX = 1000, posY = 100, vX = -2, vY = 2))
    allItems.push(new creepy(posX = 100, posY = 550, vX = 2, vY = -2))
    allItems.push(new creepy(posX = 1000, posY = 550, vX = -2, vY = -2))
    allItems.push(new player())

    setInterval(drawCharacters, 20);
};

function drawBackground() {
  ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);
}

function drawCharacters() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBackground();
  for (i in allItems) {
    allItems[i].draw()
  }
}

function creepy(posX = 100, posY = 100, vX = 5, vY = 5) {
  this.image = new Image();
  this.image.src = "img/creepy.png"
  this.posX = posX
  this.posY = posY
  this.velocityX = vX;
  this.velocityY = vY;

  this.width = 100
  this.height = 150
  this.scaleChange = 4

  this.draw = function() {
    this.updatePosition();
    this.updateScale();
    ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

  this.updatePosition = function() {

    // Change velocity direction if the creepy hits the boundary
    if (this.posY + this.height > HEIGHT) {
      this.velocityY = -this.velocityY
    }

    else if (this.posY < 0) {
      this.velocityY = -this.velocityY
    }

    if (this.posX + this.width > WIDTH) {
      this.velocityX = -this.velocityX
    }

    else if (this.posX < 0) {
      this.velocityX = -this.velocityX
    }


    this.posX += this.velocityX;
    this.posY += this.velocityY;
  }

  this.updateScale = function() {
    this.width += this.scaleChange
    this.height += this.scaleChange
    this.scaleChange = -this.scaleChange
  }

  this.image.onload = this.draw()
}

function player(posX = 100, posY = 600) {
  this.image = new Image();
  this.image.src = "img/andy.png"
  this.posX = posX
  this.posY = posY
  this.velocityX = 0;
  this.velocityY = 0;
  this.maxVX = 7;
  this.maxVY = 7;

  this.width = 150
  this.height = 150
  this.scaleChange = 4

  this.draw = function() {
    this.updatePosition();
    ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

  this.updatePosition = function() {
    // Grab global keydown varaible
    console.log(keydown)
    switch (keydown) {
    case 37: if (this.velocityX > -this.maxVX) {this.velocityX -= 1}; break; //Left key
    case 38: if (this.velocityX > -this.maxVX) {this.velocityY -= 1}; break; //Up key
    case 39: if (this.velocityX < this.maxVX) {this.velocityX += 1}; break; //Right key
    case 40: if (this.velocityY < this.maxVY) {this.velocityY += 1}; break; //Down key
    default: if (this.velocityX > 0) {this.velocityX--}; if (this.velocityX < 0) {this.velocityX++}; if (this.velocityY > 0) {this.velocityY--}; if (this.velocityY > 0) {this.velocityX++}; break; //Everything else
    }

    if ((this.posY <= 0) || (this.posY + this.height > HEIGHT)) {
      this.velocityY = -this.velocityY;
    }
    if ((this.posX <= 0) || (this.posX + this.width > WIDTH)) {
    this.velocityX = -this.velocityX;
    }
    this.posX += this.velocityX;
    this.posY += this.velocityY;
  }

  this.updateScale = function() {
    this.width += this.scaleChange
    this.height += this.scaleChange
    this.scaleChange = -this.scaleChange
  }

  this.image.onload = this.draw()
}

function updateKey(e) {
  keydown = e.keyCode;
}

function clearKey(e) {
  keydown = null;
}

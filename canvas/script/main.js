var WIDTH = 1200, HEIGHT = 800;
var canvas, ctx, background;
var allItems = [];

window.onload = function() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    background = new Image();
    background.src = "img/cabin.jpg"
    background.onload = function(){
      ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);
    }


    allItems.push(new creepy(posX = 100, posY = 100, vX = 2, vY = 2))
    allItems.push(new creepy(posX = 1000, posY = 100, vX = -2, vY = 2))
    allItems.push(new creepy(posX = 100, posY = 550, vX = 2, vY = -2))
    allItems.push(new creepy(posX = 1000, posY = 550, vX = -2, vY = -2))
    //setInterval(drawBackground, 1000)
    setInterval(drawCharacters, 20);
};

function drawBackground() {
  ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);
}

function drawCharacters() {
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

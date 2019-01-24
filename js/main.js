// TODO
// CHECK SIZE OF CANVAS
// CHECK WHY BLACK IS NOT APPEARING
// DOORS
// HIGH LIGHT COLOR OF DIFFICULTY?


// js/main.js

var debug = true


var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')
var width = canvas.width
var height = canvas.height

// Thors variables
var menuInit = false
var rooms;
var power;
var light;

// var randomX = power.randomX
// var randomY = power.randomY

// FOR MOUSE
var elemLeft = canvas.offsetLeft
var elemTop = canvas.offsetTop
var difficultyArray = [];


/* THIS HAS TO BE REFACTORED SOMEWHERE */
/* THIS HAS TO BE REFACTORED SOMEWHERE */
/* THIS HAS TO BE REFACTORED SOMEWHERE */
/* THIS HAS TO BE REFACTORED SOMEWHERE */
/* THIS HAS TO BE REFACTORED SOMEWHERE */
/* THIS HAS TO BE REFACTORED SOMEWHERE */



canvas.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

  difficultyArray.forEach(function(element) {
      if (y > element.top && y < element.top + element.height 
            && x > element.left && x < element.left + element.width) {
            switch(element.name) {
              case "easy":
                menuInit = true
                rooms = new Rooms(1, 2)
                power = new Power (40,30,'/battery5.png', 15)
                light = new Power (40, 30,'/lightning.png', 0, 2)  
                gameAnimation()
              break;
              case "medium":
                menuInit = true
                rooms = new Rooms(2, 2)
                power = new Power (40,30,'/battery5.png', 15)
                light = new Power (40, 30,'/lightning.png', 0, 1)  
                gameAnimation()
              break;
              case "hard":
                menuInit = true
                rooms = new Rooms(3, 3)
                power = new Power (40,30,'/battery5.png', 20)
                light = new Power (40, 30,'/lightning.png', 0, 0)  
                gameAnimation()
                break;
              }
        }
    });
}, false);

difficultyArray.push(
  {
    name: "easy",
    width: 250,
    height: 60,
    top: 350,
    left: 480
},
{ 
    name: "medium",
    width: 300,
    height: 60,
    top: 450,
    left: 450
},
{
    name: "hard",
    width: 300,
    height: 60,
    top: 550,
    left: 450
}
);

difficultyArray.forEach(function(element) {
    ctx.fillStyle = element.colour;
    ctx.fillRect(element.left, element.top, element.width, element.height);
})

/* THIS HAS TO BE REFACTORED SOMEWHERE */
/* THIS HAS TO BE REFACTORED SOMEWHERE */
/* THIS HAS TO BE REFACTORED SOMEWHERE */
/* THIS HAS TO BE REFACTORED SOMEWHERE */
/* THIS HAS TO BE REFACTORED SOMEWHERE */
/* THIS HAS TO BE REFACTORED SOMEWHERE */


// constants
var tesla = new Player (
    200,500, // width and height with the same ratio
    200,200, // x and y
    Math.PI*2, // angle of 45 degrees
)

var walls = new Walls (
    4, 150, // width and height
    '/wall.png',
    '/hwall.png',
)   

  // TODO -ROTATE CANVAS EVERY TIME PLAYER LEAVES ROOM

  // function rotateCanvas() {
  //   return document.getElementById("canvas").style.transform.rotate = 90;
  // }

  function drawEverything(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    // rotateCanvas()
    power.draw(ctx)
    light.draw(ctx)
    rooms.drawWalls(ctx, tesla)
    tesla.draw(ctx)
    walls.draw(ctx)
    rooms.drawBlackRectangles(ctx, tesla)
  } 

  function updateEverything() {
    tesla.update()
    power.update()
    light.update()
    walls.update()
    for (var i = 0; i < power.batteries.length; i++) {
      if (testCollision(tesla, power.batteries[i])) {
        tesla.receiveBattery()
        power.batteries.splice(i,1) // remove the batteries at index i
      }
    }
    for (var j = 0; j < light.lightning.length; j++) {
      if (testCollision(tesla, light.lightning[j])) {
        tesla.receiveLightning()
        light.lightning.splice(j,1) // remove the batteries at index i
      }
    }
  }  

  function testCollision(player, battery) {
    return dist(player,battery) <= player.radius
  }
  function testCollision(player, lightning) {
    return dist(player,lightning) <= player.radius
  }

  function dist(obj1, obj2) {
    return Math.sqrt((obj1.x-obj2.x)**2 + (obj1.y-obj2.y)**2)
  }  

  // CONTROLS ACTIVATED
  document.onkeydown = function(e){
    e.preventDefault() // stop default behaviour (scrolling)
    console.log(e.keyCode)
    switch (e.keyCode) {
      case 40: // down
        tesla.speed = -2
        break
      case 38: // up
        if (tesla.poweredUp){tesla.speed=4}else{tesla.speed=2}
        break    
      case 37: // left
        // tesla.angle -= 0.1 // Naive solution
        tesla.vAngle = -0.03 
        break
      case 39: // right
        // tesla.angle += 0.1 // Naive solution
        tesla.vAngle = 0.03 
        break    
    }
  }
  // CONTROLS DEACTIVATED
  document.onkeyup = function(e){
    switch (e.keyCode) {
      case 37: // left
      case 39: // right
        tesla.vAngle = 0
        break
      case 38: // up
      case 40: // down
        tesla.speed = 0
        break
    }
  }

  //Menu Animation
  function menuAnimation() {
    updateMenu()
    drawMenu()
    updateEverything()
    window.requestAnimationFrame(menuAnimation)
  }

  // Game Animation
  function gameAnimation() {
    updateEverything()
    drawEverything()
    window.requestAnimationFrame(gameAnimation)
  }
  
  var menuImg = new Image();   // Create new img element
  menuImg.src = 'img/title.png'; // Set source path
  
  
  function drawImage() {
    var menuImg = new Image();   // Create new img element
    menuImg.src = 'img/title.png'; // Set source path
    console.log(menuImg)
    const ctx = canvas.getContext('2d');
    ctx.drawImage(menuImg, 0, 0, 200, 200)

}




  function drawMenu(){
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    // drawText("center", "black", "darkred", 3, "bold 100px Times", "BLACKOUT", 200, "BLACKOUT", 200)
    drawText("center", "black", "white", 3, "bold 50px Times", "EASY 1x2", 400, "EASY 1x2", 400) 
    drawText("center", "black", "yellow", 3, "bold 50px Times", "MEDIUM 2x2", 500, "MEDIUM 2x2", 500) 
    drawText("center", "black", "firebrick", 3, "bold 50px Times", "HARD 3x3", 600, "HARD 3x3", 600) 
    this.ctx.font = "bold 20px Arial";
    this.ctx.fillText("CHOOSE YOUR DIFFICULTY!",this.canvas.width/2,750);
    drawImage()
  }
  
  function drawText(textAlign, fillStyle, strokeStyle, lineWidth, font, fillText, fy, strokeText, sy){
    this.ctx.textAlign = textAlign;
    this.ctx.fillStyle = fillStyle;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.lineWidth = lineWidth;
    this.ctx.font = font;
    this.ctx.fillText(fillText,this.canvas.width/2,fy);
    this.ctx.strokeText(strokeText,this.canvas.width/2,sy);
  }


drawMenu()

/* function on_fullscreen_change() {
    if(document.mozFullScreen || document.webkitIsFullScreen) {
        var rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    else {
        canvas.width = 1200;
        canvas.height = 1000;
    }
}
on_fullscreen_change()

document.addEventListener('mozfullscreenchange', on_fullscreen_change);
document.addEventListener('webkitfullscreenchange', on_fullscreen_change);
 */


  



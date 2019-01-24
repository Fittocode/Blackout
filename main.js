// TODO
// CHECK SIZE OF CANVAS
// CHECK WHY BLACK IS NOT APPEARING
// DOORS
// HIGH LIGHT COLOR OF DIFFICULTY?
// 






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
var lightning;

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
                rooms = new Rooms(2, 2)
                power = new Power (40,30,'/battery5.png', 50)
                lightning = new Power (40, 30,'/lightning.png', 5, 5)  
                gameAnimation()
              break;
              case "medium":
                menuInit = true
                rooms = new Rooms(3, 3)
                power = new Power (40,30,'/battery5.png', 50)
                lightning = new Power (40, 30,'/lightning.png', 5, 5)  
                gameAnimation()
              break;
              case "hard":
                menuInit = true
                rooms = new Rooms(4, 4)
                power = new Power (40,30,'/battery5.png', 50)
                lightning = new Power (40, 30,'/lightning.png', 5, 5)  
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
    700,700, // x and y
    Math.PI*2, // angle of 45 degrees
)

var upWalls = new Walls (
    4, 150, // width and height
    '/wall.png',
    '/hwall.png'
)   

  function drawWalls() {
    return 
  }

  function drawPower() {
  return power.draw(ctx) 
  }
  

  function drawEverything(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawPower()
    rooms.drawWalls(ctx, tesla)
    tesla.draw(ctx)
    upWalls.draw(ctx)
    rooms.drawBlackRectangles(ctx, tesla)
  } 
  function updateEverything() {
    tesla.update()
    power.update()
    upWalls.update()
    for (var i = 0; i < power.batteries.length; i++) {
      if (testCollision(tesla, power.batteries[i])) {
        tesla.receiveBattery()
        power.batteries.splice(i,1) // remove the batteries at index i
      }
    }
    for (var j = 0; j < power.lightning.length; j++) {
      if (testCollision(tesla, power.lightning[j])) {
        tesla.receiveLightning()
        power.lightning.splice(j,1) // remove the batteries at index i
      }
    }
  }  
  function testCollision(player, battery) {
    // console.log("hey")
    return dist(player,battery) <= player.radius
  }
  function testCollision(player, lightning) {
    // console.log("hey")
    return dist(player,lightning) <= player.radius
  }
  // if (checkRecharge(tesla, battery)){
  //   console.log('Recharge!')
  // }
  // function checkRecharge(a, b) {
  //   return dist(a, b) < a.width/2 + 30/2
  // }

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
        tesla.speed = 2
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


  function menuAnimation() {
    updateMenu()
    drawMenu()
    updateEverything()
    window.requestAnimationFrame(menuAnimation)
  }

  // Animation
  function gameAnimation() {
    updateEverything()
    drawEverything()
    window.requestAnimationFrame(gameAnimation)
  }

  function drawMenu(){
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    drawText("center", "black", "darkred", 3, "bold 100px Times", "BLACKOUT", 200, "BLACKOUT", 200)
    drawText("center", "black", "olivedrab", 3, "bold 50px Times", "EASY 2x2", 400, "EASY 2x2", 400) 
    drawText("center", "black", "peru", 3, "bold 50px Times", "MEDIUM 3x3", 500, "MEDIUM 3x3", 500) 
    drawText("center", "black", "firebrick", 3, "bold 50px Times", "HARD 4x4", 600, "HARD 4x4", 600) 
    this.ctx.font = "bold 20px Arial";
    this.ctx.fillText("CHOOSE YOUR DIFFICULTY!",this.canvas.width/2,750);
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

drawMenu()
  



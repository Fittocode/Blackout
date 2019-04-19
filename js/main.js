
// js/main.js

var debug = true
togglePlay()

var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')
var width = canvas.width
var height = canvas.height

var menuInit = false
var rooms;
var power;
var light;

var diffic;

var randomNumber;

var blueDoor= [0,0,0,0]


var easyBlue=[
//  x    y   w  h
// bottom
  [940,790,50,10],
  [700,790,50,10],
  [300,790,50,10],
  [50,790,50,10],
// middle - under
  [900,400,50,10],
  [700,400,50,10],
  [510,400,50,10],
  [300,400,50,10],
// middle - over
  [900,390,50,10],
  [700,390,50,10],
  [510,390,50,10],
  [400,390,50,10],
// top
  [900,0,50,10],
  [700,0,50,10],
  [600,0,50,10],
  [300,0,50,10],
// right
  [990,700,10,50],
  [990,650,10,50],
  [990,400,10,50],
  [990,200,10,50],
// left
  [0,700,10,50],
  [0,650,10,50],
  [0,300,10,50],
  [0,150,10,50]
]
var mediumBlue=[]
var hardBlue=[]

randomNumber = Math.floor(Math.random()*easyBlue.length)  

// FOR MOUSE
var elemLeft = canvas.offsetLeft
var elemTop = canvas.offsetTop
var difficultyArray = [];

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
                power = new Power (40,30,'/battery5.png', 20)
                // light = new Power (40, 30,'/lightning.png', 0, 2)

                randomNumber = Math.floor(Math.random()*easyBlue.length)

                blueDoor[0]=easyBlue[randomNumber][0]
                blueDoor[1]=easyBlue[randomNumber][1]
                blueDoor[2]=easyBlue[randomNumber][2]
                blueDoor[3]=easyBlue[randomNumber][3]
                
                rooms = new Rooms(2, 2)
                gameAnimation()
              break;
              case "medium":
                menuInit = true
                rooms = new Rooms(2, 2)
                power = new Power (40,30,'/battery5.png', 10)
                // light = new Power (40, 30,'/lightning.png', 0, 1)  
                gameAnimation()
              break;
              case "hard":
              canvas.style.backgroundImage = "url('img/Gallery2.jpg')";
                menuInit = true
                rooms = new Rooms(0, 0)
                power = new Power (40,30,'/battery5.png', 10)
                // light = new Power (40, 30,'/lightning.png', 0, 0)  
                canvas.width=1200
                canvas.height=780
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
    top: 150,
    left: 480
},
{ 
    name: "medium",
    width: 300,
    height: 60,
    top: 250,
    left: 450
},
{
    name: "hard",
    width: 300,
    height: 60,
    top: 350,
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

var title = new Menu (
    0, 0,
    '/title.png'
)

  // TODO -ROTATE CANVAS EVERY TIME PLAYER LEAVES ROOM

  // function rotateCanvas() {
  //   return document.getElementById("canvas").style.transform.rotate = 90;
  // }

  function drawEverything(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    this.ctx.fillStyle = "black";
    // rotateCanvas()
    power.draw(ctx)
    // light.draw(ctx)
    rooms.drawWalls(ctx, tesla)
    tesla.draw(ctx)
    walls.draw(ctx)
    rooms.drawBlackRectangles(ctx, tesla)
  } 
  var gameover = document.querySelector("#gameover")

  function updateEverything() {
    // wallCollision(tesla)
    tesla.update()
    power.update()
    // light.update()
    walls.update()
    if (testDoorCollision(tesla, blueDoor)){
      youwon.style.display = "block";
    }
    console.log(tesla.fRadius)  
    if (tesla.fRadius < 5) {
      gameover.style.display = "block"
    }  
     
    for (var i = 0; i < power.batteries.length; i++) {
      if (testCollision(tesla, power.batteries[i])) {
        tesla.receiveBattery()
        power.batteries.splice(i,1) // remove the batteries at index i
      }
    }
    // for (var j = 0; j < light.lightning.length; j++) {
    //   if (testCollision(tesla, light.lightning[j])) {
    //     tesla.receiveLightning()
    //     light.lightning.splice(j,1) // remove the batteries at index i
    //   }
    // }
  }  

  // function wallCollision(){
  //   // ONLY CHECKS EASY LEVEL AND MIDDLE DOOR DOWNARD
  //   if ((tesla.y + 10 > 380 && tesla.x < 250) || (tesla.y + 10 > 380 && tesla.x > 300)){
  //     tesla.y=370
  //   }
  //   // ONLY CHECKS EASY LEVEL, MIDDLE DOOR TOP  
  //   // if ((tesla.y + 10 < 380 && tesla.x < 250) || (tesla.y + 10 < 380 && tesla.x > 300)){
  //   //   tesla.y=340}
  //   }
  
  function testCollision(player, battery) {
    return dist(player,battery) <= player.radius
  }

  function testDoorCollision(player, door) {
    return distDoor(player,door) <= player.radius
  }
  
  function distDoor(obj1, obj2) {
    return Math.sqrt((obj1.x-obj2[0])**2 + (obj1.y-obj2[1])**2)
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
    console.log(menuImg)
    let ctx = canvas.getContext('2d');
    ctx.drawImage(menuImg, 0, 0, 200, 200)
}

  function drawMenu(){
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    // drawText("center", "black", "darkred", 3, "bold 100px Times", "BLACKOUT", 200, "BLACKOUT", 200)
    drawText("center", "white", "white", 3, "bold 50px Times", "EASY (High Batteries)", 200) 
    drawText("center", "white", "white", 3, "bold 50px Times", "HARD (Low Batteries)", 300) 
    drawText("center", "black", "white", 3, "bold 50px Times", "THE GALLERY", 400) 
    this.ctx.font = "bold 20px Arial";
    this.ctx.fillStyle = "lightblue"
    this.ctx.fillText("YOUR FLASHLIGHT IS DYING.",this.canvas.width/2,20);
    this.ctx.fillText("COLLECT BATTERIES TO KEEP IT ALIVE LONG ENOUGH TO FIND THE EXIT",this.canvas.width/2,90)
  }
  
  function drawText(textAlign, fillStyle, strokeStyle, lineWidth, font, fillText, fy, strokeText, sy){
    this.ctx.textAlign = textAlign;
    this.ctx.fillStyle = fillStyle;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.lineWidth = lineWidth;
    this.ctx.font = font;
    this.ctx.fillText(fillText,this.canvas.width/2,fy);
    this.ctx.strokeText(strokeText,this.canvas.width/2, sy);
  }

  function playAudio(){
    var audio = new Audio("Blackout2" + ".mp4");
    audio.play();
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


  



// js/main.js
var debug = true

var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')
var width = canvas.width
var height = canvas.height
// var randomX = power.randomX
// var randomY = power.randomY

// constants

var tesla = new Player (
    200,500, // width and height with the same ratio
    700,700, // x and y
    Math.PI*2, // angle of 45 degrees
)

var power = new Power (
    40,30, // width and height
  '/battery5.png')

var lightning = new Power (
    40, 30, // width and height
    '/lightning.png')  

var upWalls = new Walls (
    4, 150, // width and height
    '/wall.png',
    '/hwall.png'
)   

var rooms = new Rooms(2, 2)

// var sideWalls = new Walls (
//     4, 150,
//     '/side-wall.png'
// )

  function drawWalls() {
    return 
  }

  function drawPower() {
  return power.draw(ctx) 
  }
  

  function drawEverything(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    // ctx.font = '70px serif'
    // ctx.fillText("Hi Marvin", 600, 600, 500)
    // ctx.fillRect(0,0,canvas.width/2, canvas.height/2) 
    // ctx.fillStyle="black"
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

  // Animation
  function animation() {
    updateEverything()
    drawEverything()
    window.requestAnimationFrame(animation)
  }
  animation()
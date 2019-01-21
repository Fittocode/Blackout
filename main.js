// js/main.js
var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')

var Nikola = new Player (
    278/10,500/10, // width and height with the same ratio
    600,400, // x and y
    Math.PI/4, // angle of 45 degrees
    0,
  )

  function drawEverything(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    Nikola.draw(ctx)
  } 

  function updateEverything() {
    Nikola.update()
  }

  // Listen for keydown events
  document.onkeydown = function(e){
    e.preventDefault() // stop default behaviour (scrolling)
    console.log(e.keyCode)
    switch (e.keyCode) {
      case 40: // down
        Nikola.speed = 0
        break
      case 38: // up
        Nikola.speed = 2
        break    
      case 37: // left
        // Nikola.angle -= 0.1 // Naive solution
        Nikola.vAngle = -0.03 
        break
      case 39: // right
        // Nikola.angle += 0.1 // Naive solution
        Nikola.vAngle = 0.03 
        break    
    }
  }
  document.onkeyup = function(e){
    switch (e.keyCode) {
      // case 37: // left
      // case 39: // right
      case 38: // up
      case 40: // down
        Nikola.vAngle = 0
        Nikola.speed = 0
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
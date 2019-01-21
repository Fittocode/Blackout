// // When the variable is true, we see more things on the screen
// var debug = true

// // This function is drawing the base of the current referential
// function drawCoordinates(ctx) {
//   ctx.save()
//   ctx.globalAlpha = 0.5
//   ctx.strokeStyle = ""
//   ctx.lineWidth = 5
  
//   // Draw the x coordinates (size of 100px)
//   ctx.beginPath()
//   ctx.moveTo(0,0)
//   ctx.lineTo(40,0)
//   ctx.stroke()
  

//   // Draw the y coordinates (size of 100px)
//   ctx.beginPath()
//   ctx.moveTo(0,0)
//   ctx.lineTo(0,0)
//   ctx.stroke()
  
//   ctx.restore()
// }

// function dist(obj1, obj2) {
//   return Math.sqrt((obj1.x-obj2.x)**2 + (obj1.y-obj2.y)**2)
// }
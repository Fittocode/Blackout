class Player {
    constructor(width, height, initialX, initialY, initialAngle) {
        this.width = width
        this.height = height
        this.x = initialX
        this.y = initialY
        this.angle = initialAngle 
        this.speed = 0
        this.vAngle = 0
        this.fLength = 300
        // this.fWidth = 100
        this.fRadius = 100
        this.radius = 50
        this.poweredUp=false
        // this.img = new Image()
        // this.img.src = 'images'
    }
    draw(ctx) {
        ctx.save() // save and restore are used to don't change the state of the ctx outside of the method

        if (this.fRadius > 0) {
            ctx.translate(this.x,this.y) // move
            ctx.rotate(this.angle) // turn

            if (debug) {
                ctx.save() 
                ctx.globalAlpha = 0.5
                ctx.fillStyle = "white"
                ctx.beginPath()
                ctx.moveTo(0, 0)
                ctx.arc(0, 0, this.radius, 0, Math.PI, false)
                ctx.fill() 
                ctx.restore() 
            }
            
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(this.fRadius,this.fLength)  
            ctx.arc(0, this.fLength, this.fRadius, 0, Math.PI, false)

            ctx.rotate(-this.angle) // turn
            ctx.translate(-this.x,-this.y) // move
            
            ctx.rect(canvas.width, 0, -canvas.width, canvas.height)
            ctx.closePath()
            
            ctx.fillStyle = "black"
            ctx.fill()

            // ctx.beginPath();
            // ctx.arc(200, 200, 100, 0, 2 * Math.PI);
            // ctx.rect(400, 0, -canvas.width, canvas.height);
            // ctx.fill();
        }
        ctx.restore()

      }
      update() {
        this.angle += this.vAngle
        this.y +=  this.speed * Math.cos(this.angle)
        this.x += -this.speed * Math.sin(this.angle)
        // this.vAngle *=0.9
        this.fLength -= .25
        this.fRadius -= .15
      }
      receiveBattery() {
        this.fLength += 45
        this.fRadius += 30
      }
      receiveLightning() {
          this.speed=5
          this.poweredUp = true
          var that=this
          setTimeout(() => {
              that.poweredUp=false
          }, 3000);
          /* this.speed += 1 */
      }
}
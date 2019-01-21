class Player {
    constructor(width, height, initialX, initialY, initialAngle, fAngle) {
        this.width = width
        this.height = height
        this.x = initialX
        this.y = initialY
        this.angle = initialAngle 
        this.speed = 0
        this.vAngle = 0
        this.fAngle = fAngle
        this.fLength = 200
        this.fWidth = 50
        this.fRadius = 50
        // this.img = new Image()
        // this.img.src = 'images'
    }
    draw(ctx) {
        ctx.save() // save and restore are used to don't change the state of the ctx outside of the method
        ctx.translate(this.x,this.y) // move
        ctx.rotate(this.angle) // turn

        //flashlight width/height
        ctx.moveTo(0, 0)
        ctx.lineTo(this.fWidth,this.fLength)   
        ctx.stroke()

        ctx.moveTo(0, 0)
        ctx.lineTo(-this.fWidth,this.fLength)   
        ctx.stroke()

        // flashlight semi-circle

        ctx.beginPath()
        ctx.arc(this.fWidth, this.fLength, this.fRadius, 0, Math.PI, false) 
        ctx.stroke()

        ctx.restore()
      }
      update() {
        this.angle += 0//this.vAngle
        this.y +=  0//this.speed * Math.cos(this.angle)
        this.x += 0//-this.speed * Math.sin(this.angle)
        this.vAngle -=0//*= 0.9
        this.fLength -=0//-=.3
        this.fWidth -=0//-=.2
        this.fRadius -=0//-=.2
      }
}
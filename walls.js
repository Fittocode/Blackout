class Walls {
    constructor(x, y) {
    this.x = x
    this.y = y
    // this.width = 10
    // this.height = 150
    this.verticalImg = new Image()
    this.verticalImg.src = "img/wall.png"
    // this.horizontalImg = new Image()
    // this.horizonImg.src = "img/side-wall.png"

    }
    draw(ctx) {
        ctx.save()
        // ctx.drawImage(this.horizontalImg, 1000, 100, 150)
        ctx.restore()
    }
    update() {
    }
}
class Walls {
    constructor(x, y) {
    this.x = x
    this.y = y
    this.verticalImg = new Image()
    this.verticalImg.src = "img/wall.png"

    }
    draw(ctx) {
        ctx.save()
        // ctx.drawImage(this.horizontalImg, 1000, 100, 150)
        ctx.restore()
    }
    update() {
    }
}
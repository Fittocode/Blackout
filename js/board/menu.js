class Menu {
    constructor(){
        this.img = new Image()
        this.img.src = "img/title.png"
    }
    draw(ctx) {
        ctx.save()
        ctx.drawImage(this.img, this.x-this.width/2, this.y-this.height/2, this.width, this.height)
        ctx.restore()
    }
    update() {
    }
}
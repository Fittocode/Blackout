class Battery {
  // x and y and the center of the battery
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 30
    this.height = 40
    this.img = new Image()
    this.img.src = "img/battery5.png"
  }
  draw(ctx) {
    ctx.save()
    ctx.drawImage(this.img, this.x-this.width/2, this.y-this.height/2, this.width, this.height)
    ctx.restore()
  }
  update() {
  }
}

class Power {
    constructor(width, height, src){
      this.width = width
      this.height = height
      this.maxX = 1200
      this.maxY = 800

      this.batteries = []
      for (var i = 0; i < 20; i++) {
        this.batteries.push(new Battery(Math.floor(Math.random()*(this.maxX - 30)), Math.floor(Math.random()*(this.maxY - 40))))
      }
      this.lightning = []
      for (var j = 0; j < 2; j++) {
        this.lightning.push(new Lightning(Math.floor(Math.random()*(this.maxX - 30)), Math.floor(Math.random()*(this.maxY - 40))))
      }
    }
    draw(ctx) {
      ctx.save()
      for (var i = 0; i < this.batteries.length; i++) {
        this.batteries[i].draw(ctx)
      }
      for (var j = 0; j < this.lightning.length; j++) {
        this.lightning[j].draw(ctx)
      }
      ctx.restore()
    }
    update() {
  }
}

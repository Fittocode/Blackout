class Rooms {
    constructor(nbCols,nbRows){
        this.nbRows = nbRows
        this.nbCols = nbCols
        this.rooms = []
        for (var row = 0; row < this.nbRows; row++) {
            this.rooms.push([])
            for (var col = 0; col < this.nbCols; col++) {
                this.rooms[row].push({  // TODO, change the values
                    leftDoor: { x: 10, height: 10 },
                    rightDoor: { x: 10, height: 10 },
                    topDoor: { y: 10, width: 10 },
                    bottomDoor: { y: 10, width: 10 },
                })
            }
        }
    }
    drawWalls(ctx,player) {
        ctx.save()

        var canvasWidth = ctx.canvas.width
        var canvasHeight = ctx.canvas.height
        var roomWidth = canvasWidth / this.nbCols
        var roomHeight = canvasHeight / this.nbRows

        for (var row = 0; row < this.nbRows; row++) {
            for (var col = 0; col < this.nbCols; col++) {
                var xRoom = col*roomWidth
                var yRoom = row*roomHeight
                // Only draw the wall if the player is not in the current room
                if (xRoom <= player.x && player.x <= xRoom+roomWidth && yRoom <= player.y && player.y <= yRoom+roomHeight) {
                    ctx.drawImage(Rooms.verticalImg, xRoom-4, yRoom, 15,roomHeight) // left wall
                    ctx.drawImage(Rooms.verticalImg, xRoom+roomWidth+4, yRoom, -15,roomHeight) // right wall
                    ctx.drawImage(Rooms.horizontalImg, xRoom, yRoom + roomHeight-10, roomWidth,15) // bottom wall
                    ctx.drawImage(Rooms.horizontalImg, xRoom, yRoom-5, roomWidth,15) // top wall
                }   ctx.fillStyle = "black"
                    ctx.fillRect(xRoom,yRoom + (roomHeight/2-20), 10, 50) // left door
                    ctx.fillRect(xRoom + roomWidth-10, yRoom + (roomHeight/2 -20), 10, 50) // right door
                    ctx.fillRect(xRoom + (roomWidth/2-15), yRoom, 50, 10) // bottom door
                    ctx.fillRect(xRoom + (roomWidth/2-15), yRoom + (roomHeight-10), 50, 10) // top door
                }
        }
        // BLUE DOOR
        ctx.fillStyle = "blue"
        //            x               y              w                   h
        ctx.fillRect(blueDoor[0], blueDoor[1], blueDoor[2], blueDoor[3])
        ctx.restore()
    }
    // drawDoors(ctx) {
    //     ctx.save()        
    //         ctx.fillRect(xRoom,yRoom + (roomHeight/2-20), 10, 50) // left door
    //         ctx.fillRect(xRoom + roomWidth-10, yRoom + (roomHeight/2 -20), 10, 50) // right door
    //         ctx.fillRect(xRoom + (roomWidth/2-15), yRoom, 50, 10) // bottom door
    //         ctx.fillRect(xRoom + (roomWidth/2-15), yRoom + (roomHeight-10), 50, 10) // top door
    //     ctx.restore()        
    // }
    drawBlackRectangles(ctx, player) {
        ctx.save()
        var canvasWidth = ctx.canvas.width
        var canvasHeight = ctx.canvas.height
        var roomWidth = canvasWidth / this.nbCols
        var roomHeight = canvasHeight / this.nbRows

        // Draw the black rectangles of the other rooms to hide them
        for (var row = 0; row < this.nbRows; row++) {
            for (var col = 0; col < this.nbCols; col++) {
                var xRoom = col*roomWidth
                var yRoom = row*roomHeight
                // Only draw a black rectangle if the player is not in the current room
                if (!(xRoom <= player.x && player.x <= xRoom+roomWidth && yRoom <= player.y && player.y <= yRoom+roomHeight)) {
                    ctx.fillRect(xRoom,yRoom,roomWidth,roomHeight)
                } else if (player.fLength == 0 && player.fRadius == 0) {
                    
                } 
            }
        }
        ctx.restore()
    }
}

Rooms.verticalImg = new Image()
Rooms.verticalImg.src = "img/wall.png"

Rooms.horizontalImg = new Image()
Rooms.horizontalImg.src = "img/hwall.png"

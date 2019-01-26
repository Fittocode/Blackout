


canvas.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

  difficultyArray.forEach(function(element) {
      if (y > element.top && y < element.top + element.height 
            && x > element.left && x < element.left + element.width) {
            switch(element.name) {
              case "easy":
                menuInit = true
                rooms = new Rooms(2, 2)
                power = new Power (40,30,'/battery5.png', 50)
                // lightning = new Power (40, 30,'/lightning.png', 5, 5)  
                gameAnimation()
              break;
              case "medium":
                menuInit = true
                rooms = new Rooms(3, 3)
                power = new Power (40,30,'/battery5.png', 50)
                // lightning = new Power (40, 30,'/lightning.png', 5, 5)  
                gameAnimation()
              break;
              case "hard":
                menuInit = true
                rooms = new Rooms(3, 3)
                power = new Power (40,30,'/battery5.png', 50)
                // lightning = new Power (40, 30,'/lightning.png', 5, 5)  
                gameAnimation()
                break;
              }
        }
    });
}, false);

let words=["typescript", "repository", "concatenate", "algorithm", "statistical"]

difficultyArray.push(
  {
    name: "easy",
    width: 250,
    height: 60,
    top: 350,
    left: 480
},
{ 
    name: "medium",
    width: 300,
    height: 60,
    top: 450,
    left: 450
},
{
    name: "hard",
    width: 300,
    height: 60,
    top: 550,
    left: 450
}
);

difficultyArray.forEach(function(element) {
    ctx.fillStyle = element.colour;
    ctx.fillRect(element.left, element.top, element.width, element.height);
})

// THIS IS END FOR MOUSE
// THIS IS END FOR MOUSE

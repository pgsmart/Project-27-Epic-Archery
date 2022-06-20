class Board {
  constructor(x, y, width, height) {
    
     var options = {
       isStatic: true,
       density: 10,
       airFriction: 5.0
     };

    this.body = Bodies.rectangle(x, y, width, height, options);


    this.width = width;
    this.height = height;
    this.image = loadImage("./assets/board.png");

    World.add(world, this.body);
  }

  display() {
    var pos = this.body.position;

    push();
    imageMode(CENTER);
    image(this.image, this.body.position.x, pos.y, this.width, this.height);
    pop();
  }
}

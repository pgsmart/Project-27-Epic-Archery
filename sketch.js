const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

  

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var board1;
var boards = [];
var numberOfArrows = 10;
var collision;
var hits = 0;
var boardX = 800;
var velocity = 1;
var ballX = 220;
var ballXVal = 2;
var pathBall;
var pathBalls = [];
var arrowShot = false;
var velocityBarImg;

function preload() {
  backgroundImg = loadImage("./assets/background.png");
  velocityBarImg = loadImage("./assets/velocityBar.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight - 4);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, 500, 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );

  board1 = new Board(1000, 300, 100, 250);
  boards.push(board1);

}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  playerBase.display();
  player.display();
  playerArcher.display();

  push();
  
  imageMode(CENTER);
  image(velocityBarImg, 295, 229, 170, 30);
  pop();


  ellipse(ballX,230,17,17);

  ballX += ballXVal;

  if(ballX >= 370){
    ballXVal = -2;
  }else if(ballX <= 220){
    ballXVal = 2
  }

  if(arrowShot === true){
    if(frameCount%5 === 0){
    pathBall = new ArrowPath(playerArrows[9-numberOfArrows].body.position.x,playerArrows[9-numberOfArrows].body.position.y);
    pathBalls.push(pathBall);
    }
  }
  for(var i = 0; i < pathBalls.length; i++){
    pathBalls[i].display();
  }


  velocity = Math.round((ballX - 220)/3)

  for(var i = 0; i < boards.length; i++){
    if(boards[i] !== undefined){
      boards[i].display();
    }
  }

  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();
    }
  } 
  for (var i = 0; i < playerArrows.length; i++) {
      if (playerArrows[i] !== undefined && boards[0] !== undefined) {
          collision = Matter.SAT.collides(playerArrows[i].body,board1.body);
          if(collision.collided){
            console.log("HIT");
            hits++;
          }
      }
    
  } 


  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);

  // Arrow Count
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Remaining Arrows : " + numberOfArrows, 200, 100);

  // Board Hits Count
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Hits : " + hits, 200, 150);

}

function keyPressed() {

   if (keyCode === 32) {
     if (numberOfArrows > 0) {
       var posX = playerArcher.body.position.x;
       var posY = playerArcher.body.position.y;
       var angle = playerArcher.body.angle;

       var arrow = new PlayerArrow(posX, posY, 100, 20, angle);

       Matter.Body.setAngle(arrow.body, angle);
       playerArrows.push(arrow);
       numberOfArrows -= 1;
       arrowShot = false;
       pathBalls = [];
     }
   }

  if(keyCode === 82){
    numberOfArrows = 10;
    console.log("reset")
  }

}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle,velocity);
      arrowShot = true;
    }
  }
}

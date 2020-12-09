
var monkey , monkey_running,monkeyCollided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var Bananas = 0;
var invisibleG;
var backgroundImage,bg1
var play = 1;
var END = 0;
var gameState = play;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 backgroundImage = loadImage("bg.jpg")
  monkeyCollided = loadImage("monkey_1.png")
}



function setup() {
  createCanvas(600,600)
  
  bg1 = createSprite(300,1600)
  bg1.addImage(backgroundImage)
  bg1.velocityX = -4
  bg1.scale = 3
  
 monkey = createSprite(80,500,10,10);
monkey.setCollider("circle",0,0,300)
//  monkey.debug = true
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addImage("collided",monkeyCollided)
  
  invisibleG = createSprite(0,550,1500,5)
  invisibleG.visible = false
  obstacleGroup = new Group();
  FoodGroup = new Group();
}


function draw() {
background("skyblue")
 obstacles();
  banana();
  text("survivalTime: "+ survivalTime, 100,50);
  monkey.collide(invisibleG)
  text("BANANAS:"+Bananas,300,50)
  
  
 
  if (obstacleGroup.isTouching(monkey)){
      gameState = END
      }
  
  if (gameState===play){
    
    if(keyDown("space")&&monkey.y >= 509) {
      monkey.velocityY = -17; 
    }
  monkey.velocityY = monkey.velocityY + 0.5
    
   survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
  if(bg1.x < 0){
    bg1.x = bg1.width/1    
                       }
    
    if (FoodGroup.isTouching(monkey)){
      Bananas = Bananas + 1
      FoodGroup.destroyEach();
    }
    
  }
    
  if (gameState===END){
   FoodGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    FoodGroup.setLifetimeEach(-1)
    obstacleGroup.setLifetimeEach(-1)
    monkey.velocityY = 0
    monkey.changeAnimation("collided",monkeyCollided)
    bg1.velocityX = 0
    fill("red")
    stroke("black")
    textSize(30)
    text("press R to reset",200,300)
    fill("black")
    textSize(15)
    text("GAMEOVER!!!!",250,350)
    
    if (keyDown("r")){
      monkey.changeAnimation("monkey",monkey_running)
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      survivalTime = 0
      Bananas = 0
      gameState = play
    }
    
                      }
  
  drawSprites();
}

function obstacles(){
 if (frameCount % 200===0){
  obstacle = createSprite(600,530)
   obstacle.setCollider("rectangle",0,0,300,obstacle.height)
 //obstacle.debug = true
   obstacle.addImage(obstacleImage)
  obstacle.velocityX = -4
   obstacle.lifetime = 200
  obstacle.scale = 0.2
  obstacleGroup.add(obstacle)
 }
}

function banana(){
if (frameCount % 200===0){
  var food = createSprite(600,300)
 food.addImage(bananaImage)
  food.velocityX = -3
  food.scale = 0.1
  food.lifetime = 200
  FoodGroup.add(food)
 }
}

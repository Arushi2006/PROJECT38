var trex,trex_running,trex_colliding;
var ground,groundimage,invisibleground;
var cloudImage,cloudGroup;
var obstacleGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var gameStates=1;
var restartImage,restart,gameoverImage,gameover;
var Score=0;
function preload()
{
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
trex_colliding=loadImage("trex_collided.png");
groundimage=loadImage("ground3.jpg");
cloudImage=loadImage("cloud2.png");
cloudImage.scale=0.05;
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
restartImage=loadImage("restart.png");
gameoverImage=loadImage("gameOver.png");
}
  
function setup() {
  createCanvas(1000, 500);
  trex=createSprite(30,470,70,80);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;
  ground=createSprite(500,475,1000,20);
  ground.addAnimation("ground",groundimage);
  invisibleground=createSprite(500,480,1000,5);
  invisibleground.visible=false;
  gameover=createSprite(250,450);
  gameover.addImage("gameOver",gameoverImage);
  gameover.scale=0.5;
  restart=createSprite(270,470);
  restart.addImage("restart",restartImage);
  restart.scale=0.5;
 cloudGroup=new Group();
  obstacleGroup=new Group();
}

function draw() {
  background(255);
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+Score,800,50);

  trex.collide(ground);
  if(gameStates==1){
    restart.visible=false;
    gameover.visible=false;
  ground.velocityX=-7;
  if(ground.x<0)
  {
   ground.x=ground.width/2;
  }
  if(keyDown("space"))
  {
    trex.velocityY=-12;
    
  }
  if(trex.x=100+100)
  {
    Score++;
  }
  trex.velocityY=trex.velocityY+0.7;
  spawnClouds();    
  spawnObstacles();
    if(obstacleGroup.isTouching(trex)){
      gameStates=0;
      Score=Score-1;
    }
} 
  else if(gameStates==0){
    gameover.visible=true;
  restart.visible=true;
    ground.velocityX=0;
    trex.velocityY=0;
    
    
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    if (mousePressedOver(restart)){
      reset();
      Score=0;
    }
  }
  camera.position.x= ground.x;
  camera.position.y=trex.y;
}
function reset(){
  gameStates=1;
  trex.changeAnimation("running",trex_running);
  gameover.visible=false;
  restart.visible=false;
  
  
  
  cloudGroup.destroyEach();
  obstacleGroup.destroyEach();

 
}
function spawnClouds()
 
{
  if(frameCount%60==0)
    {
      var cloud=createSprite(1000,270,20,20);
cloud.y=random(170,270);
cloud.addImage("cloudImage",cloudImage);
cloud.scale=0.2;
cloud.velocityX=-5;
cloud.lifetime=200;  
cloudGroup.add(cloud);
} 
}
function spawnObstacles(){
  if(frameCount%90==0){
    var obstacle=createSprite(1000,475,30,40);
obstacle.velocityX=-5;
obstacle.lifetime=200;
obstacleGroup.add(obstacle);
var ran=Math.round(random(1,6));


switch(ran)
  {
    case 1:obstacle.addImage("obstacle1",obstacle1);
  break;
  case 2:obstacle.addImage("obstacle2",obstacle2);
      break;
   case 3:obstacle.addImage("obstacle3",obstacle3);  
      break;
       case 4:obstacle.addImage("obstacle4",obstacle4);
      break;
       case 5:obstacle.addImage("obstacle5",obstacle5);
    break;
     case 6:obstacle.addImage("obstacle6",obstacle6);
    default:break;
    
  }
  }
} 
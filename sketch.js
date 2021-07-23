var towerImage;
var ghostImage;
var gameState="play";



function preload(){
  towerImage=loadImage("tower.png");
  ghostImage=loadAnimation("ghost-jumping.png","ghost-standing.png");
  doorImage=loadImage("door.png");
  climbersImage=loadImage("climber.png")
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  spookySound.loop();
  
  tower=createSprite(width/2,300);
  tower.addImage(towerImage);
  tower.velocityY=3;
  
  ghost=createSprite(width/2,450);
  ghost.addAnimation("ghost",ghostImage);
  ghost.scale=0.4;
  
  doorsGroup=new Group();
  
  climbersGroup=new Group();
  
  invisibleBlocksGroup=new Group();
  }
function draw(){


  if(gameState==="play"){
    if(tower.y>600){
    tower.y=300}
    
    if(keyWentDown("space")){
      ghost.velocityY=-4;
  }    
  ghost.velocityY=ghost.velocityY+0.2;
    
    if(keyDown("left")){
      ghost.x=ghost.x-2;
    }
    
    if(keyDown("right")){
      ghost.x=ghost.x+2;
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlocksGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    spawnDoors()
     background("white");
  drawSprites()
  }

 if(gameState==="end"){
   background("black"); 
   fill("yellow");
    stroke("yellow"); 
    textSize(30);
    text("Game Over", 230,300)
   
    
  }

}
function spawnDoors(){
  if(frameCount%240===0){
    doors=createSprite(Math.round(random(100,400)),-50);
  climbers=createSprite(500,0);
  invisibleBlock=createSprite(500,5);
  doors.velocityY=4;
  doors.addImage(doorImage);
  doors.lifetime=600;
    
  climbers.velocityY=4;
  climbers.addImage(climbersImage);
  climbers.x=doors.x;
  climbers.lifetime=600;
    
    ghost.depth=doors.depth;
    ghost.depth=ghost.depth+1;
  
  invisibleBlock.velocityY=4;
  invisibleBlock.width=climbers.width
  invisibleBlock.visible=false;
  invisibleBlock.x=doors.x
  invisibleBlock.lifetime=600;
  invisibleBlock.scale=0.05;
    
    doorsGroup.add(doors);
    climbersGroup.add(climbers);
    invisibleBlocksGroup.add(invisibleBlock);
  
  }
}
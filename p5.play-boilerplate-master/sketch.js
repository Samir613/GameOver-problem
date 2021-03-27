var canvas;
var ground;
var bg;
var explorer , idle , idlejump , idlerun , idledead;
var rocks;
var explorerrunning;
var gamestate="play";
var obstaclegroup;
var cloud , cloudsgroup;




function preload(){
  bg=loadImage("Jungle.png")
  idle=loadAnimation("Death.png")
  idlejump=loadImage("Jump.png")
   rocks=loadImage("rock.png")
   explorerrunning=loadAnimation("run1.png","run2.png","run3.png");
   cloud=loadImage("cloud.png");
       console.log(idle)

}

function setup() {
  canvas = createCanvas(displayWidth-20,displayHeight-30);
explorer = createSprite(200,780);
explorer.addAnimation("running",explorerrunning);
explorer.scale=0.5;
ground = createSprite(700,900,displayWidth,20);
ground.x=ground.width/2;
ground.visible=true;
obstaclegroup=createGroup();
explorer.setCollider("rectangle",0,0,400,explorer.height);
cloudsgroup=createGroup();
explorer.debug=true;
}

function draw() {
  background(bg);  

if (gamestate==="play"){
  ground.velocityX=-15;
 if (keyWentDown(UP_ARROW)&& explorer.y>100 ){
   explorer.changeAnimation("jump",idlejump);
   explorer.velocityY=-16;
 }
 explorer.velocityY=explorer.velocityY+0.5;
 if (keyWentUp(UP_ARROW)){
   explorer.changeAnimation("stop",idle);
 }
 if (ground.x<0){
   ground.x=ground.width/2;
   
  }
  
spawnClouds();
 spawnRock();
 if (obstaclegroup.isTouching(explorer)){
gamestate="end";

 }
}
else if (gamestate==="end"){
obstaclegroup.setVelocityXEach(0);
//explorer.changeAnimation("collided",idle);
console.log(idle);
}
 explorer.collide(ground);
console.log(gamestate);
  drawSprites();

  }


  function spawnRock() {
    if(frameCount %   130 === 0) {
      var rock = createSprite(1750,820,100,100);
     
      rock.velocityX = -13;
    
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: rock.addImage(rocks);
                
                break;
        case 2: rock.addImage(rocks);
               
                break;
        default: break;
      }
      
      
      obstaclegroup.add(rock);
      
      rock.scale = 5;
      rock.lifetime = 300;
    }
  }
  function spawnClouds() {
    if(frameCount %   130 === 0) {
      var clouds = createSprite(1750,150,100,100);
     
      clouds.velocityX = -13;
    
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: clouds.addImage(cloud);
                
                break;
        case 2: clouds.addImage(cloud);
               
                break;
        default: break;
      }
      
      
     cloudsgroup.add(clouds);
      
      clouds.scale = 0.8;
      clouds.lifetime = 300;
    }
  }





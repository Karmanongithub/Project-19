//Saviour Rocket Game

//GAME DESCRIPTION:-
//Hello and welcome to Saviour Rocket Game. In this game you have to destroy Obstacle or Asteroids. 
//You can shoot bullets from rocket by clicking on space to destroy Obstacle or Asteroids. 
//Some planets and stars comes in between the game, so collect them by touching the rocket with planets-
// and stars to get more points and be careful that you don’t shoot the bullet on stars and planets. 
//You can move the rocket from left and right arrow key.
//You would get one point each time when you destroy the obstacle by bullet- 
//and would get two point when you collect planet or star.

//creating all variables needed for the game
var space, spaceImg;
var rocket, rocketImg;
var bullet, bulletImg;
var obstacle, obstacleImg;
var bulletGrp, obstacleGrp;
var score= 0;
var planet, pl1,pl2,pl3,pl4,pl5, planetGrp;
var PLAY=0;
var END=1;
var gameState= PLAY;
var scoreSound, dieSound, plCollectSound;

//loading sounds and images
function preload(){
spaceImg= loadImage("Space.jpg");
rocketImg= loadImage("Rocket 2.png");
bulletImg= loadImage("bullets.png");
obstacleImg= loadImage("obstacle.png");
pl1= loadImage("mars.png");
pl2= loadImage("mercury.png");
pl3= loadImage("neptune.png");
pl4= loadImage("earth.png");
pl5= loadImage("Star.png");
scoreSound= loadSound("jump.mp3");
dieSound= loadSound("die.mp3");
plCollectSound= loadSound("checkpoint.mp3");
}


function setup() {
  createCanvas(600,600);

  //creating Space and its loop
  space= createSprite(300,300);
  space.addImage(spaceImg);
  space.velocityY= (2+score/2);

  //creating rocket
  rocket= createSprite(300,500,25,25);
  rocket.addImage(rocketImg);
  rocket.scale= 0.5;
  // rocket.debug= true;

  //creating new groups
  bulletGrp= new Group();
  obstacleGrp= new Group();
  planetGrp= new Group();
}


function draw(){
  background(30);

  //creating different gameStates
  if(gameState === PLAY){
    
    //intial velocity of rocket
    rocket.velocityX=0;
    
    //space loop
    if(space.y > 900){
      space.y = height/2;
    }

    //rocket controls
    if(keyDown("right_arrow") && rocket.x>25 && rocket.x<585){
      rocket.velocityX= 10;
    }

    if(keyDown("left_arrow") && rocket.x>25 && rocket.x<585){
      rocket.velocityX= -10;
    }

    if(keyDown("space")){
      createBullet();
    }
    
    //Condition of what will happen when BULLET will touch OBSTACLES OR ASTEROIDS
    if(bulletGrp.isTouching(obstacleGrp)){
      obstacleGrp.destroyEach();
      bulletGrp.destroyEach();
      score= score+1;
      scoreSound.play();
    }

    //Condition of what will happen when the ROCKET will touch PLANETS
    if(planetGrp.isTouching(rocket)){
      score= score+2;
      planetGrp.destroyEach();
      plCollectSound.play();
    }

    //Condition of what will happen when the OBSTACLES OR ASTEROIDS will touch ROCKET
    if(obstacleGrp.isTouching(rocket)){
      gameState= END;
      dieSound.play();
    }

    //Condition of what will happen when the BULLET will touch PLANETS
    if(bulletGrp.isTouching(planetGrp)){
      gameState= END;
      dieSound.play();
    }
    
    //Spawning Obstacles and Planets when the gameState is in PLAY
    spawnObstacle();
    spawnPlanets();

  } else if(gameState=== END){

    //What all will happen if gameState is END
    space.destroy();
    obstacleGrp.destroyEach();
    rocket.destroy();
    bulletGrp.destroyEach();
    planetGrp.destroyEach();
    textSize(35);
    text("Game Over",210,300);
    textSize(17);
    text("Press Ctrl+R to restart again",210,350);
  }
  
  
  drawSprites();
  textSize(20);
  text("Score: "+score, 500,50);
}

//function to create bullets
function createBullet(){

  bullet= createSprite(400,400,25,25);
  bullet.addImage(bulletImg);
  bullet.scale= 0.1;
  bullet.y= rocket.y;
  bullet.x= rocket.x;
  bullet.velocityY= -(5+score/2);
  bullet.lifetime= 200;
  // bullet.debug= true;
  // bullet.setCollider("rectangle",0,0,25,15)
  bulletGrp.add(bullet);
}

//function to create obstacles
function spawnObstacle(){
  
  if(frameCount%80===0){
    
    obstacle= createSprite(300,60,25,25);
    obstacle.addImage(obstacleImg);
    obstacle.scale= 0.25;
    obstacle.x= Math.round(random(100,500));
    obstacle.velocityY= (5+score/2);
    obstacle.lifetime= 200;
    // obstacle.debug= true;
    obstacle.setCollider("rectangle",0,0,105,290);
    obstacleGrp.add(obstacle);
  }
}

//function to create panets
function spawnPlanets(){
  if(frameCount%270===0){
    
    planet= createSprite(300,60,25,25);
    planet.velocityY= 7;
    planet.lifetime= 200;
    planet.scale= 0.1;
    var rand= Math.round(random(1,5));
    // planet.debug= true;
    planet.x= Math.round(random(70,530));

    switch(rand){
      case 1:
        planet.addImage(pl1);
        break;
      
      case 2:
        planet.addImage(pl2);
        break;

      case 3:
        planet.addImage(pl3);
        break;
        
      case 4:
        planet.addImage(pl4);
        break;

      case 5:
        planet.addImage(pl5);
      
      default:
      break;
    }
    
    planetGrp.add(planet);
  }
}

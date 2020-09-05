var dog, happyDog, database, foodS, foodStock;

function preload(){
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();
  
  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock= database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();

    fill(0);
    stroke("black");
    text("Food remaining: "+foodS ,20,450);
    textSize(20);
    text("Note: Press up arrow key to feed your dog!",130,10,300,20);



}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}





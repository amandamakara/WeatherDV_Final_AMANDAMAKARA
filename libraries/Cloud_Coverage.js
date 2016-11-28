 function cloud(cloudCover){


var clouds = (weatherData.clouds.all);

var cloudSize = map(clouds,0,100,0,100);
//This is mapping the range from the cloud coverage percentage(0,100) to the cloud size(0,100);

for(var i = 0; i < clouds; i++){
   
   var correlation = 1;
   var bounceSpeed = 0.005;
   var time = (frameCount * bounceSpeed) + (i * correlation);
   var up = map(noise(time),0,1,0,height/4);
    //if you are to multiply or divide the height by a number, it will either move the clouds up or down the screen
   var size = map(noise(time),0,1,0,cloudSize);
   
   
   if(i < clouds){
      randomSeed(i*200);
      noStroke();
      fill(39,26,64,random(230));
      ellipse(random(width),up,size,size);
   }else{
      randomSeed(i*100);
      noStroke();
      ellipse(random(width),random(height),size,size);
      }
   }

}
function temp(temperature){


xoff = xoff + .001;
yoff = yoff + .001;
//these create the offset jitter of the circle of rectangles
 
 var heatSize = map(temperature,50,130,100,500);
 var coldSize = map(temperature,0,50,0,100); 
 var tempColorHot = map(temperature,0,130,0,255);
 
   for(var i = 0; i < 75; i++){  
      //setting up the loop for multiple rectangles, the i represents each individual rect
      
      var speed = 0.0015;
      //this is the variable for how quickly or slowly the rect rotates, higher the number the faster the rotation
      var correlation = 10;
      //this is used to make the rectangles more or less correlated, how well the other rect follow the leader
      var time = (frameCount * speed) + (i * correlation);
      //this is a way to measure the time using the framecount and multiplying that by the speed to control time
       //by adding the i variable, we are essentially moving this further in time
       //by multiplying the i variable by a number(var correlation) we are controlling the rotation even further by making them
       //cont. follow the leader
    
      var up = map(noise(time),0,1,0,height);
      //similar to the rotation variable but incorporating making the rect move from top to bottom of the screen
     
      time = time + 100;
      var across = map(noise(time),0,1,0,width);
      
      var rotation = map(noise(time),0,1,0,720);
      //this variable maps the noise to the time variable, the 0 & 1 is the only amount of noise that is available
       //0 - 360 is the degrees that we are using, this can be adjusted higher or lower for a more robust rotation or a smaller rotation
      
      var n = noise(xoff) * width/2;
      var b = noise(yoff) * height/2;
      
      //RAYS THAT FOLLOW MOUSE X & Y
      /*
      var n = noise(xoff) * mouseX;
      var b = noise(yoff) * mouseY;
      //these two variables create a noise for the X and Y value of the mouse
      */
      
      var tempChange = (weatherData.main.temp);
      //this is the variable for the temperature changes
      
      push();
         translate(width/2,height/2);
         rotate(rotation);
         
         // CONDITIONAL TO CHANGE COLOR BASED ON TEMP
         if(tempChange < 50){
           strokeWeight(1.5);
            stroke(9,93,119);
            line(n,b,50,20);
            
            noStroke();
            fill(0,113,115,20);
            rect(0,0,70,70);
         }else{
           strokeWeight(1);
            stroke(199,120,42);
            line(b,n,20,50);
            noStroke();
            fill(255,104,46,20);
            rect(0,0,70,70);
         }
       pop();
   }
}
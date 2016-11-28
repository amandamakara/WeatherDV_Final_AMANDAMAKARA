var weatherData;
var mapImage;
var locationImage;
var xoff = 0.1;
var yoff = 0.1;
var myFont;

var selectionX;
var selectionY;
var mapLocationX = 0;
var mapLocationY = 0;
var mapSizeX = 1280;
var mapSizeY = 720;

function preload() {
   myFont = loadFont("MavenPro-Bold.ttf");
   mySecondFont = loadFont("MavenPro-Regular.ttf");
   mapImage = loadImage("map.png");
   locationImage = loadImage("Location.png");
}


function setup() {

   createCanvas(1280, 720);
   loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Portland,usa&units=imperial&appid=3871e719bde0bc68554a4cad3e3e38a1', gotData);
   angleMode(DEGREES);
   //this is to change from radians into degrees
   rectMode(CENTER);
   //this changes where the beginnng of the rectangle is, so 0,0 is in the center and not in the corner
   //can be changed from CENTER,RADIUS,CORNER,CORNERS

}

function gotData(data) {

   weatherData = data;
}

function draw() {
   background(242,240,241);
   //background(255);
   
   tint(9,65,122,90);
   image(mapImage,mapLocationX,mapLocationY,mapSizeX,mapSizeY);
   tint(255,255);
   
   if (weatherData) {
      
      cloud(weatherData.clouds.all);
      wind(weatherData.wind.speed);
      temp(weatherData.main.temp);
         
   //TITLE TEXT      
         //noStroke();
         textSize(50);
         textFont(myFont);
         fill(9,65,122,250,210);
         stroke(255);
     // push();
        // translate(30,height* .28);
         //rotate(90);
         text("Global Weather Data",40,600);
   //   pop();
      
          //CITY NAME
         textFont(mySecondFont);
         textSize(45);
         text(weatherData.name, 40, 660);
         
         //COUNTRY
         textSize(30);
         text(weatherData.sys.country, 40, 700);
         
         
         //PARAMETER TEXT
         textSize(40);
         text(weatherData.main.temp + "°F", width * .25, 700);
         //TEMPERATURE
         text(weatherData.wind.speed + " mph", width * .5, 700);
         //WIND SPEED
         text(weatherData.clouds.all + "%", width * .75, 700);
         //CLOUD COVERAGE

   }
   
   fill('black');
   //ellipse(selectionX,selectionY,10,10);
   image(locationImage,selectionX - 15, selectionY - 25);

      //IF MOUSE IS PRESSED OVER THE MAP
      if (mouseX > mapLocationX &&
         mouseX < (mapLocationX + mapSizeX) &&
         mouseY > mapLocationY &&
         mouseY < (mapLocationY + mapSizeY)
      ) {
         //drawing the lat and lon lines
         stroke('black');
         strokeWeight(1);
         line(mouseX, mapLocationY, mouseX, mapLocationY + mapSizeY);
         line(mapLocationX, mouseY, mapLocationX + mapSizeX, mouseY);
         
         textSize(40);
         fill(9,65,122,230);
         strokeWeight(1);
         text(floor(map(mouseY,mapLocationY,mapLocationY + mapSizeY,90,-90)),mapSizeX - 65,mouseY + 15);
         text(floor(map(mouseX,mapLocationX,mapLocationX + mapSizeX,-180,180)),mouseX - 20,mapLocationY + 40);
      }

}

function mousePressed(){
   if(mouseX > mapLocationX &&
      mouseX < (mapLocationX + mapSizeX) &&
      mouseY > mapLocationY &&
      mouseY < (mapLocationY + mapSizeY)
      ){
         selectionX = mouseX;
         selectionY = mouseY;
         
         var firstPart = "http://api.openweathermap.org/data/2.5/weather?lat="
         var lastPart = "&appid=3871e719bde0bc68554a4cad3e3e38a1&units=imperial"
         //these set up the first and last section of our HTML JSON
         var lat = map(selectionY,mapLocationY,mapLocationY + mapSizeY,90,-90);
         //this is taking the Y value of the mouse and mapping it to the latitudes of a world map
         //from -90 which is the bottom of the map to 90 which is the top of the map
         var lon = map(selectionX,mapLocationX,mapLocationX + mapSizeX,-180, 180);
         //this is taking the X value of the mouse and mapping it to the longitudes of a world map
         //from -180 which is the left of the map to 180 which is the right of the map
         var url = firstPart + lat + "&lon=" + lon + lastPart;
         //this is adding the strings together EX: "2" + "2" is actually 22 and not 4, just placing the strings next to eactother
         //also incorporating JSON data
         loadJSON(url, gotData);
      }
}
/*
function keyTyped() {

   switch (key) {

      /*   
         case "1":
           loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Portland,usa&units=imperial&appid=3871e719bde0bc68554a4cad3e3e38a1',gotData);
           break;
           
         case "2":
           loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Miami,usa&units=imperial&appid=3871e719bde0bc68554a4cad3e3e38a1',gotData);
           break;
           
         case "3":
           loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Anchorage,usa&units=imperial&appid=3871e719bde0bc68554a4cad3e3e38a1',gotData);
           break;
       */
/*
      case " ":
         var firstPart = "http://api.openweathermap.org/data/2.5/weather?";
         var lastPart = "&appid=3871e719bde0bc68554a4cad3e3e38a1&units=imperial";
         //these set up the first and last section of our HTML JSON
         var lat = map(mouseY, height, 0, -90, 90);
         //this is taking the Y value of the mouse and mapping it to the latitudes of a world map
         //from -90 which is the bottom of the map to 90 which is the top of the map
         var lon = map(mouseX, 0, width, -180, 180);
         //this is taking the X value of the mouse and mapping it to the longitudes of a world map
         //from -180 which is the left of the map to 180 which is the right of the map
         var url = firstPart + "lat=" + lat + "&lon=" + lon + lastPart;
         //this is adding the strings together EX: "2" + "2" is actually 22 and not 4, just placing the strings next to eactother
         //also incorporating JSON data
         loadJSON(url, gotData);
         break;

   }
}
*/
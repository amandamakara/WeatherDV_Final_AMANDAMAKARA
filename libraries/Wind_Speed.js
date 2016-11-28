function wind(windSpeed) {

  var winds = (weatherData.wind.speed);
  var windMag = map(winds, 0, 40, 0, 720);
  var windSize = map(winds, 0, 40, .5, 1.5);
  for (var w = 0; w < winds; w++) {

    var speed = 0.0005;
    var correlation = 15;
    var time = (frameCount * speed) + (w * correlation);
    var rotation = map(noise(time), 0, 1, 0, windMag * 5);
    push();
    beginShape();
    randomSeed(w * 400)
    translate(width / 2, height / 2);
    scale(windSize);
    rotate(rotation);
    stroke(50, 71, 21);
    fill(96, 137, 41, random(255));
    vertex(350, 100);
    vertex(370, 100);
    vertex(370, 150);
    vertex(420, 150);
    vertex(420, 170);
    vertex(370, 170);
    vertex(370, 220);
    vertex(350, 220);
    vertex(350, 170);
    vertex(300, 170);
    vertex(300, 150);
    vertex(350, 150);
    endShape(CLOSE);
    pop();
  }
}
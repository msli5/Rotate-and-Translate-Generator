//<Description> Allows you drag handles and export code for drawing bezierVertex, a group of Bezier Curves combined to form a single shape. </Description>
/* Special thanks to sauj123 for some tweaks that make it easier to keep ahold of the handles and prevents handles from snapping to one another */

var centerOffset = 0;
var offsetX = 0; 
var offsetY = 0; 
var bezierThickness = 2;
var which = 0;
var dragCircles = [];

var codeParagraph="";
var codeParagraph2="";

var roateSlider="";
var endSlider="";
var heightSlider="";
var widthSlider="";

function setup() {
  // Code here runs only once
  createCanvas(800, 400);
  angleMode(DEGREES)
  
  offsetX += centerOffset; 
  offsetY += centerOffset; 

translate(offsetX, offsetY);
rotate(0);

//starting point for ellipse
createCircle(240, 220); 

  //starting point for rect
createCircle(80, 60); 
  
codeParagraph = createP('');
codeParagraph2 = createP('');

  widthSlider = createSlider(0, 360, 60, 5);
  widthSlider.position(400, 50);
  widthSlider.style('width', '180px');

  heightSlider = createSlider(0, 360, 60, 5);
  heightSlider.position(400, 100);
  heightSlider.style('width', '180px');
  
  
  rotateSlider = createSlider(0, 360, 0, 5);
  rotateSlider.position(400, 150);
  rotateSlider.style('width', '180px');
  
}

function draw() {

background(255); // Clear the Screen White
drawGrid();
drawDraggableCircles();

  
noFill();
stroke(0)
strokeWeight(bezierThickness);



  //rotate an ellipse
  let widthSliderVal = widthSlider.value();
  let heightSliderVal = heightSlider.value();
  let rotateSliderVal = rotateSlider.value();
 
  
  stroke(0)
  fill(255, 153, 0,70)
  push()
 translate(dragCircles[0].x, dragCircles[0].y)
  rotate(rotateSliderVal)
  ellipse(0,0, widthSliderVal, heightSliderVal);
  pop()
  
  // rotate(radians(rotateSliderVal)*-1)
  //  translate(dragCircles[0].x*-1, dragCircles[0].y*-1)

  //ellipse center coordinate
  fill(0)
  noStroke()
  textSize(14)

  text("("+int(dragCircles[0].x)+", "+int(dragCircles[0].y)+")",int(dragCircles[0].x-25), int(dragCircles[0].y+18))

      //rotate a rectangle
  stroke(0)
  fill(204, 153, 255,70)

  push()
  translate(dragCircles[1].x, dragCircles[1].y)
  rotate(rotateSliderVal)
  rect(0,0, widthSliderVal, heightSliderVal);
  pop()
  
  // rotate(radians(rotateSliderVal)*-1)
  //  translate(dragCircles[1].x*-1, dragCircles[1].y*-1)

  //rectangle upper left coordinate
  fill(0)
  noStroke()
  textSize(14)
  text("("+int(dragCircles[1].x)+", "+int(dragCircles[1].y)+")",int(dragCircles[1].x-25), int(dragCircles[1].y+18))
      
  //set slider location
  textSize(10)
  textFont("'Bree Serif', serif")
  text("center", dragCircles[0].x-12, dragCircles[0].y+28)
  text("Top Left", dragCircles[1].x-20, dragCircles[1].y+28)
  textSize(14)
  text("Width:" +widthSliderVal, 400, 75)
  text("Height: " +heightSliderVal, 400, 125)
  text("Rotate: "+rotateSliderVal, 400, 175)


  var printIt= "//~~~Copy the ellipse(x,y,w,h) code below~~~\n\nangleMode(DEGREES);\n//The code angleMode(DEGREES) only needs to be added once to switch the current canvas to degree input. Best to put in the setup function. \n\npush();\nfill(255,153,0,70);\ntranslate("+int(dragCircles[0].x)+","+int(dragCircles[0].y)+");\nrotate(radians("+int(rotateSliderVal)+"));\nellipse(0,0,"+int(widthSliderVal)+","+int(heightSliderVal)+");\npop();\n\n";

  var printIt2="//~~~Copy the rect(x,y,w,h) code below~~~\n\nangleMode(DEGREES);\n//The code angleMode(DEGREES) only needs to be added once to switch the current canvas to degree input. Best to put in the setup function. \n\npush();\nfill(255,153,0,70);\ntranslate("+int(dragCircles[1].x)+","+int(dragCircles[1].y)+");\nrotate(radians("+int(rotateSliderVal)+"));\nrect(0,0,"+int(widthSliderVal)+","+int(heightSliderVal)+");\npop();\n\n";
  
    //To let the text under the canvas run when mouse is within the canvas. Without this, it is hard to copy the text as the code is consistantly running.
if(mouseIsPressed===true&& mouseX<=width &&mouseY<=height){
  console.log(printIt)
codeParagraph2.html(printIt);
codeParagraph2.id('line-break-and-tab');

  console.log(printIt2)
  codeParagraph.html(printIt2);
  codeParagraph.id('just-line-break');
}
}


//---------FUCTIONS------------

// When function is called, "push" a new Array entry
function createCircle(cX,cY){
    dragCircles.push({
        x:cX,
        y:cY,
        mouseOver: false,
        circleSize: 12
    });
};

// Cycle through the Array and draw a Circle for each entry
function drawDraggableCircles(){
strokeWeight(1);


    for (var i = 0; i < dragCircles.length; i++){
if(dist(dragCircles[i].x, dragCircles[i].y, mouseX-offsetX, mouseY-offsetY) < dragCircles[i].circleSize/1.5 && (!which || which === i+1)) {
            fill (255, 0, 102, 120); 
        }
        else{ 
            noFill(); 
        }
        ellipse(dragCircles[i].x, dragCircles[i].y, dragCircles[i].circleSize, dragCircles[i].circleSize);
    }
};

function drawGrid(){
    strokeWeight(2); // Line Thickness
    stroke(0, 0, 0, 160);

    // Draw a rectangle around the canvas
  noFill()
  rect(0,0,width,height)
    
    // Draw Gray Grid
  strokeWeight(1); // Line Thickness
  fill(0, 0, 0, 100);
    stroke(140, 140, 140, 75); // light gray
  textSize(10);
    for(var i = 0; i < width ; i = i + 20){// x-axis
        line(i, 0, i, height);
        text(i*2,i*2-10,15);//print x-coordinates
    }
  for(var n = 0; n < height ; n += 20){//y-axis
        line(0, n, width, n);
        text(n*2, 5, n*2+3); //print y-coordinates
    }
};

function mouseDragged(){
    if(!which) {
        // Cycle through the Array
        for (var i = 0; i < dragCircles.length; i++){
            // If Radius Collision Detected...
            if (dist(dragCircles[i].x, dragCircles[i].y, 
                mouseX-offsetX, mouseY-offsetY) < dragCircles[i].circleSize/1.5 ){
                which = i + 1;
                break;
            }
        }
    } else {
        // Move Circle to current Mouse Position
        dragCircles[which - 1].x = mouseX-offsetX;
        dragCircles[which - 1].y = mouseY-offsetY;
    }


};

function mouseReleased() {
    which = 0;
};
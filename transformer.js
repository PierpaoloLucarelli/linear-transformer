var hGrid = [];
var vGrid = [];
var unit = 30;
var d = 600;
var transformation;
var x1Slider, y1Slider, x2Slider, y2SLider;

function setup() {
  x1Slider = createSlider(-1,1,1,0.1).parent("inputs").id("x1");
  y1Slider = createSlider(-1,1,0,0.1).parent("inputs").id("y1");
  x2Slider = createSlider(-1,1,0,0.1).parent("inputs").id("x2");
  y2Slider = createSlider(-1,1,1,0.1).parent("inputs").id("y2");
  createCanvas(d,d).class("canvas").parent("canvas");
  initGrid(unit);
  transformation = [createVector(1,0), createVector(0,1)];
}

function draw() {
  background(51);
  drawAxis();
  var x1 = x1Slider.value();
  var y1 = y1Slider.value();
  var x2 = x2Slider.value();
  var y2 = y2Slider.value();
  transformation[0].x = x1;
  transformation[0].y = y1;
  transformation[1].x = x2;
  transformation[1].y = y2;
  drawGrid();
  textSize(32);
  fill(0, 102, 153);
}

function drawAxis(){
	translate(width/2, height/2);
	stroke(255);
	strokeWeight(2);
	line(0,0,width,0);
	line(0,0,-width,0);
	line(0,0,0,width);
	line(0,0,0,-width);
}

function drawGrid(){
	stroke(255,255,255,100);
	strokeWeight(1);
	for(var i = 0 ; i < vGrid.length ; i++){
		vStart = p5.Vector.add(p5.Vector.mult(transformation[0],vGrid[i][0].x), p5.Vector.mult(transformation[1],vGrid[i][0].y) );
		vEnd = p5.Vector.add(p5.Vector.mult(transformation[0],vGrid[i][1].x), p5.Vector.mult(transformation[1],vGrid[i][1].y) );
		hStart = p5.Vector.add(p5.Vector.mult(transformation[0],hGrid[i][0].x), p5.Vector.mult(transformation[1],hGrid[i][0].y) );
		hEnd = p5.Vector.add(p5.Vector.mult(transformation[0],hGrid[i][1].x), p5.Vector.mult(transformation[1],hGrid[i][1].y) );
		line(vStart.x, vStart.y, vEnd.x, vEnd.y);
		line(hStart.x, hStart.y, hEnd.x, hEnd.y);
	}
}

function initGrid(unit){
	for(var i = -width/2 ; i < width/2 ; i+=unit){
		var vlinePoints = [createVector(i,-height/2), createVector(i,height/2)] 
		var hlinePoints = [createVector(-width/2,i), createVector(width/2,i)]
		this.vGrid.push(vlinePoints);
		this.hGrid.push(hlinePoints);
	}
}



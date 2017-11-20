var hGrid = [];
var vGrid = [];
var unit = 30;
var d = 600;
var transformation;
var x1Slider, y1Slider, x2Slider, y2SLider;
var x1p,x2p,y1p,y2p;

function setup() {
	x1Slider = createSlider(-1,1,1,0.1).parent("inputs").id("x1");
	y1Slider = createSlider(-1,1,0,0.1).parent("inputs").id("y1");
	x2Slider = createSlider(-1,1,0,0.1).parent("inputs").id("x2");
	y2Slider = createSlider(-1,1,1,0.1).parent("inputs").id("y2");
	createCanvas(d,d).class("canvas").parent("canvas");
	initGrid(unit);
	transformation = [createVector(1,0), createVector(0,1)];
	x1p = createP(x1Slider.value()).id("x1-label").parent("labels");
	y1p = createP(y1Slider.value()).id("y1-label").parent("labels");
	x2p = createP(x2Slider.value()).id("x2-label").parent("labels");
	y2p = createP(y2Slider.value()).id("y2-label").parent("labels");

	shearBtn = createButton('Shear').parent("buttons").mousePressed(shearing);
	scaleBtn = createButton('Scale').parent("buttons").mousePressed(scaleing);
	rotateBtn = createButton('Rotate').parent("buttons").mousePressed(rotating);
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
	x1p.html(x1);
	y1p.html(y1);
	x2p.html(x2);
	y2p.html(y2);
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

// transformations preset animations

function shearing(){
	var val = y1Slider.value();
	var pos = val >= 0;
	function go() {
	    y1Slider.value(val);
	    val += pos ? -0.1 : 0.1;
	    if (Math.abs(val) < 1 ) {
	        setTimeout(go, 20);
	    }
    }
    go();
}

function scaleing(){
	var val = x1Slider.value();
	var pos = val >= 0;
	function go() {
	    x1Slider.value(val);
	    y2Slider.value(val);
	    val += pos ? -0.1 : 0.1;
	    if (Math.abs(val) < 1 && val !=0 ) {
	        setTimeout(go, 20);
	    }
    }
    go();
}

function rotating(){
	var angle = 0;
	function go() {
	    x1Slider.value(Math.cos(angle));
	    y1Slider.value(Math.sin(angle));
	    x2Slider.value(-Math.sin(angle));
	    y2Slider.value(Math.cos(angle));
	    angle += 0.1;
	    if (angle < PI ) {
	        setTimeout(go, 10);
	    }
    }
    go();
}

function reset(){
  x1Slider.value(1);
  y1Slider.value(0);
  x2Slider.value(0);
  y2Slider.value(1);
}



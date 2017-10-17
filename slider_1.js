/*
need this is main js file:

function mousePressed() {
 for(var i=0; i<sliders.length; i++) {
  if (sliders[i].over) {
    sliders[i].move = true;
  }
}
}


function mouseReleased() {

  for(var i=0; i<sliders.length; i++) {
  sliders[i].move = false;
}
}

*/




function Slider(xpos, ypos, w, h, minval, maxval, string) {
  this.w = w;
  this.h = h;
  this.minval = minval;
  this.maxval = maxval;
  this.xpos = xpos;
  this.ypos = ypos;
  this.pos = 0;
  this.over = false;
  this.move = false;
  this.v = 0;
  this.string = string;


  
  this.update = function() {
      //calculate if mouse is over button
     if (mouseX>this.xpos+this.pos && mouseX<this.xpos+this.pos+this.w/8 && mouseY>this.ypos && mouseY<this.ypos+this.h) {
    this.over = true;
  } else {
    this.over = false;
  }
  
  //move button
  
  if(this.move){
    
    this.pos = constrain(mouseX-this.xpos-this.w/16, 0, this.w-this.w/8);
    
  }
  }
  
  this.getValue = function() {
    this.v = map(this.pos, 0, this.w-this.w/8, minval, maxval);
    return(this.v); 
  }
  
  
  
  this.display = function() {
   //stroke(10);
    strokeWeight(2);
    //base
    rectMode(CORNER);
    var c = map(this.v, this.minval, this.maxval, 0, 200);
    fill(c, c, 0, 100);
    rect(this.xpos, this.ypos, this.w, this.h);
    //button
    if(this.over){
    fill(200, 0, 0);
    } else {
      fill(100);
    }
    rect(this.xpos+this.pos, this.ypos, this.w/8, this.h);
    textAlign(LEFT,TOP)
    fill(250);
    text(this.string, this.xpos, this.ypos);
  }
}
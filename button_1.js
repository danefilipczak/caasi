function Button(x, y, w, h, label) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.label = label;
  
  this.test = function() {
    return (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h);
  }
  
  this.draw = function() {
    strokeWeight(2);
    fill(150);
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER, CENTER);
    textSize(12);
    fill(0);
    text(this.label, this.x, this.y, this.w, this.h);
  }
  
}
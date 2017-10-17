var soundset = 0;
var hits = [];
var choirs = [];
var winds = [];
var bschedule = [];
var rschedule = [];
var lschedule = [];
var pulse = 200;
var q = false;
var intervalId;

// function preload() {
//   hits = [loadSound('assets/hit0.mp3'),
//   loadSound('assets/hit1.mp3')];
//   choirs = [loadSound('assets/choir0.mp3'),
//   loadSound('assets/choir1.mp3')];
//   winds = [loadSound('assets/wind0.mp3'),
//   loadSound('assets/wind1.mp3')];
    
// }

function quantize() {
  clearInterval ( intervalId );
  intervalId = setInterval ( "clock()", document.getElementById("pulse").value ); 
}

function clock(){
  for(var i=0;i<bschedule.length;i++){
    bvoice.play(bschedule[i], ac.currentTime, {gain:1, duration:1});
  }
  bschedule = []
  for(var i=0;i<lschedule.length;i++){
    lvoice.play(lschedule[i], ac.currentTime, {gain:1, duration:1});
  }
  lschedule = []
  for(var i=0;i<rschedule.length;i++){
    rvoice.play(rschedule[i], ac.currentTime, {gain:1, duration:1});
  }
  rschedule = []
}





function Particle(x, y, m) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = m;
  this.switch = 0;
  this.dead = false;
  
  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }
  
  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.set(0, 0)
  }
  
  this.display = function(c) {
    fill(c);
    strokeWeight(3);
    ellipse(this.pos.x, this.pos.y, this.mass*10, this.mass*10);
    }
    
    this.edges = function() {
      
      //some math to make it die if its bounce gets too short
      if (this.pos.y > height) {
        var hold = this.switch;
        this.switch = millis();
        hold = this.switch - hold;
        if(hold<80){
            this.dead = true;
        }
        this.vel.y *= -1;
        this.pos.y = height;
        //assign a scale degree
        var pitch = floor(this.pos.x/(width/5))+1;
        //map to pentatonic pitch
        switch(document.querySelector('input[name = "tonality"]:checked').value){
          case 'bela':

          switch(pitch) {
            case 1:
              pitch = root;
             break;
            case 2: 
              pitch = root+2;
            break;
            case 3:
              pitch = root+5;
             break;
            case 4:
              pitch = root+7;
            break;
            case 5:
              pitch = root+10;
             break;
         }
         break;
           case 'maurice':

          switch(pitch) {
            case 1:
              pitch = root;
             break;
            case 2: 
              pitch = root+1;
            break;
            case 3:
              pitch = root+5;
             break;
            case 4:
              pitch = root+7;
            break;
            case 5:
              pitch = root+8;
             break;
         }
           case 'claude':

          switch(pitch) {
            case 1:
              pitch = root;
             break;
            case 2: 
              pitch = root+5;
            break;
            case 3:
              pitch = root+7;
             break;
            case 4:
              pitch = root+12;
            break;
            case 5:
              pitch = root+14;
             break;
         }

        } 
        //scale to octave based on mass
        switch(this.mass){
          case 1:
          pitch+=12;
          break;
          case 5:
          pitch-=12;
          break;
        }
        //add a skew set by the instrument from the instrument 
        pitch+=bvoiceskew;


        //bottom perc
        var dur = 1;
        if(!document.getElementById("quantcheck").checked){
        bvoice.play(pitch, ac.currentTime, {gain:1, duration:dur});
      } else {
        bschedule.push(pitch);
      }

        //hits[soundset].pan(map(this.pos.x, 0, width, -1, 1))
        //hits[soundset].rate((map(this.pos.x, 0, width, 0.5, 4)) / this.mass);
        //hits[soundset].amp(2 - (particles.length * 0.03));
        //hits[soundset].play();
        
       
      } 
      //---------------------------------------------------------------------right choir 
      else if (this.pos.x > width) {
        this.vel.x *= -1;
        this.pos.x = width;
        var pitch = floor(this.pos.y/(height/9))+1;
        //map to pentatonic pitch
        switch(document.querySelector('input[name = "tonality"]:checked').value){
        case 'bela':
          switch(pitch) {
            case 9: 
              pitch = root-10;
            break;
            case 8:
              pitch = root-7;
             break;
            case 7:
              pitch = root-5;
            break;
            case 6:
              pitch = root-2;
             break;
            case 5:
              pitch = root;
             break;
            case 4: 
              pitch = root+2;
            break;
            case 3:
              pitch = root+5;
             break;
            case 2:
              pitch = root+7;
            break;
            case 1:
              pitch = root+10;
            break;

          }
          break;
             case 'maurice':
          switch(pitch) {
            case 9: 
              pitch = root-11;
            break;
            case 8:
              pitch = root-7;
             break;
            case 7:
              pitch = root-5;
            break;
            case 6:
              pitch = root-4;
             break;
            case 5:
              pitch = root;
             break;
            case 4: 
              pitch = root+1;
            break;
            case 3:
              pitch = root+5;
             break;
            case 2:
              pitch = root+7;
            break;
            case 1:
              pitch = root+8;
            break;

          }
          break;
             case 'claude':
          switch(pitch) {
            case 9: 
              pitch = root-12;
            break;
            case 8:
              pitch = root-10;
             break;
            case 7:
              pitch = root-7;
            break;
            case 6:
              pitch = root-5;
             break;
            case 5:
              pitch = root;
             break;
            case 4: 
              pitch = root+5;
            break;
            case 3:
              pitch = root+7;
             break;
            case 2:
              pitch = root+12;
            break;
            case 1:
              pitch = root+14;
            break;

          }
          break;
        }
        //scale to octave based on mass
        switch(this.mass){
          case 1:
          pitch+=12;
          break;
          case 5:
          pitch-=12;
          break;
        }
        //add a skew set by the instrument from the instrument 
        pitch+=rvoiceskew;

        var dur = 1;
          if(!q){
          rvoice.play(pitch, ac.currentTime, {gain:1, duration:dur});
          } else {
          rschedule.push(pitch);
         }
      } 
        //---------------------------------------------------------------Left Wind
        else if (this.pos.x < 0) {
        this.vel.x *= -1;
        this.pos.x = 0;
         var pitch = floor(this.pos.y/(height/5))+1;
        //map to pentatonic pitch
              switch(document.querySelector('input[name = "tonality"]:checked').value){
          case 'bela':

          switch(pitch) {
            case 1:
              pitch = root;
             break;
            case 2: 
              pitch = root+2;
            break;
            case 3:
              pitch = root+5;
             break;
            case 4:
              pitch = root+7;
            break;
            case 5:
              pitch = root+10;
             break;
         }
         break;
           case 'maurice':

          switch(pitch) {
            case 9: 
              pitch = root-11;
            break;
            case 8:
              pitch = root-7;
             break;
            case 7:
              pitch = root-5;
            break;
            case 6:
              pitch = root-4;
             break;
            case 5:
              pitch = root;
             break;
            case 4: 
              pitch = root+1;
            break;
            case 3:
              pitch = root+5;
             break;
            case 2:
              pitch = root+7;
            break;
            case 1:
              pitch = root+8;
            break;
         }
           case 'claude':

          switch(pitch) {
          case 9: 
              pitch = root-12;
            break;
            case 8:
              pitch = root-10;
             break;
            case 7:
              pitch = root-7;
            break;
            case 6:
              pitch = root-5;
             break;
            case 5:
              pitch = root;
             break;
            case 4: 
              pitch = root+5;
            break;
            case 3:
              pitch = root+7;
             break;
            case 2:
              pitch = root+12;
            break;
            case 1:
              pitch = root+14;
            break;
         }

        } 
        //scale to octave based on mass
        switch(this.mass){
          case 1:
          pitch+=12;
          break;
          case 5:
          pitch-=12;
          break;
        }
        //add a skew set by the instrument from the instrument 
        pitch+=rvoiceskew;

        var dur = 1;
             if(!q){
             lvoice.play(pitch, ac.currentTime, {gain:1, duration:dur});
           } else {
           lschedule.push(pitch);
           }
        
      } 
    }
  
  
}
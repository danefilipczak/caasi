//to do:  instructions, change perc. sounds - master reverb. - amps.... maybe a prettier loading screen
var particles = [];
var pause = false;
var pastmousex = 0;
var pastmousey = 0;
var ftoggle = false;
var gtoggle = false;
var rtoggle = false;
var fourtoggle = false;
var fivetoggle = false;
var sixtoggle = false;
var gforce = 0.5;
var windresistance = -0.0;
var ibutton;
var itoggle = true;
var ibuttonstring = "hide instructions";
var sbuttonstring = "settings";
var help;
var ac = new AudioContext();
var root = 60;
var bvoiceskew = 0;
var lvoiceskew = 0;
var rvoiceskew = 0;
var loaded = false;
var loadcount = 0;
var angle=0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("monospace");
  textSize(12);
  ibutton = new Button(width-110, 10, 100, 40, ibuttonstring);
  sbutton = new Button(width-110, 130, 100, 15, sbuttonstring);
  //help = loadImage('assets/help.png');
  gslider = new Slider(width-110, 100, 100, 15, 0.1, 0.9, 'gravity');
  gslider.pos = 50;
  rslider = new Slider(width-110, 70, 100, 15, 0.0, -0.05, 'resistance');
  rslider.pos = 20;

  Soundfont.instrument(ac, 'acoustic_grand_piano').then(function (player) {
      print('player ready');
  bvoice = player;
  loadcount++;
  if(loadcount==3){
    loaded = true;
  }
    })
  Soundfont.instrument(ac, 'flute').then(function (player) {
      print('player ready');
  lvoice = player;
  loadcount++
  if(loadcount==3){
    loaded = true;
  }
    })
  Soundfont.instrument(ac, 'english_horn').then(function (player) {
      print('player ready');
  rvoice = player;
  loadcount++
  if(loadcount==3){
    loaded = true;
  }
    })
  quantize();
}

function mousePressed() {
    if (gslider.over) {
      gslider.move = true;
    }
    if (rslider.over) {
      rslider.move = true;
    }
    if (sbutton.test()){
      divToggle();
    }
  if (ibutton.test() == true && itoggle) {
    itoggle = false;
  } else if (ibutton.test() == true && !itoggle) {
    itoggle = true;
  }
  if (!ibutton.test() && !sbutton.test() && !gslider.over && !rslider.over && !divTest() && loaded) {
    if (fourtoggle) {
     var p = new Particle(mouseX, mouseY, 1); 
    } else if (fivetoggle) {
     var p = new Particle(mouseX, mouseY, 3); 
    } else if (sixtoggle) {
     var p = new Particle(mouseX, mouseY, 5); 
    } else {
    var p = new Particle(mouseX, mouseY, random([1,3,5]));
    }
    particles.push(p);
  }
}
function mouseReleased() {
  gslider.move = false;
  rslider.move = false;
}

function keyPressed() {
  if (key == 'X') {
    particles.splice(0, 1);
  } else if (key == 'Z') {
    particles.splice(particles.length-1, 1);
  } else if (key == ' ' && !pause){
    noLoop();
    pause = true;
  } else if (key == ' ' && pause){
    loop();
    pause = false;
  } else if (key == 'C' && !pause) {
    particles.splice(0, particles.length);
  } else if (key == 'F' && !ftoggle) {
    ftoggle = true;
  } else if (key == 'G' && !gtoggle) {
    gtoggle = true;
  } else if (key == 'R' && !rtoggle) {
    rtoggle = true;
  } else if (key == '4' && !fourtoggle) {
    fourtoggle = true;
  } else if (key == '5' && !fivetoggle) {
    fivetoggle = true;
  } else if (key == '6' && !sixtoggle) {
    sixtoggle = true;
  } else if (key == '1') {
    soundset = 0;
  } else if (key == '2') {
    soundset = 1;
  } //else if (key == '3') {
    //soundset = 2;
  //}
}

function keyReleased() {
  if (key == 'F' && ftoggle) {
    ftoggle = false;
  } else if (key == 'G' && gtoggle) {
    gtoggle = false;
  } else if (key == '4' && fourtoggle) {
    fourtoggle = false;
  } else if (key == '5' && fivetoggle) {
    fivetoggle = false;
  } else if (key == '6' && sixtoggle) {
    sixtoggle = false;
  } else if (key == 'R' && rtoggle) {
    gtoggle = false;
  }
  
}


function draw() {
  
  gforce = gslider.getValue();
  windresistance = rslider.getValue();
  //draw screen red and stop loop if paused 
  if(pause) {
    background(255, 45, 0);
  } else {
    background(150-(particles.length*5),150,0+(particles.length*5), 150);
  }

  //loading screen

  if(!loaded){
    background(170);
    textSize(100);
    fill(255);
    var wiggle = sin(angle)*20;
    text("loading...", width*0.312+wiggle, height-130)
    angle+=0.3;
  }
  
  
  var force = createVector((mouseX - pastmousex) * 0.05, (mouseY - pastmousey) * 0.05);
 
  
  for(var i = 0; i<particles.length; i++) {
  var resistance = createVector(particles[i].vel.x*windresistance, particles[i].vel.y*windresistance);
  var gravity = createVector(0, gforce*particles[i].mass);
  particles[i].applyForce(gravity);
  if (ftoggle) {
  particles[i].applyForce(force);
  } 
  
  particles[i].applyForce(resistance);
  particles[i].update();
  
  
  if (pause) {
    particles[i].display(0);
  } else {
  particles[i].display(map(i, 0, particles.length, 0, 255));
  }
  if(!particles[i].dead){
    particles[i].edges();
  } else if (particles[i].dead){
    particles.splice(i, 1);
  };
  }
  
  
  //instructions
  if(itoggle) {
    ibuttonstring = "hide instructions";
    textAlign(LEFT, CENTER);
    fill(0);
    textSize(17);
    text("Click to deploy a particle of random mass.\nHold 4, 5 or 6 + click to deploy a particle of specific mass. \nHold F and swipe to apply force.\nUse X to clear the oldest particle or Z to clear the most recent\nUse C to clear the screen. \nUse SPACEBAR to pause and the sliders to adjust gravity and wind resistance.\nCustomize things in settings."
      ,110, 10, (width*0.618)-10, 200);
      ibutton.draw();
  } if (!itoggle) {
    ibuttonstring = "show instructions";
    fill(255);
    textSize(20);
    text('i', width-60, 20)
    //image(help, width-50, 10);
    
  }


  sbutton.draw();
  gslider.update();
  gslider.display();
  rslider.update();
  rslider.display();
  pastmousex = mouseX;
  pastmousey = mouseY;
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    rslider.xpos = width-110;
    gslider.xpos = width-110;
    ibutton.x = width-110;
    sbutton.x = width-110;
}

function divTest(){
  var check = false;
  if(mouseX>width-170 && mouseX<width-10 && mouseY>160 && mouseY<height){
    check = true;
  }
  if(document.getElementById("settings").style.visibility == "hidden"){
    check = false;
  }
  return check;
}


function divToggle(){
  if(document.getElementById("settings").style.visibility == "visible"){
    document.getElementById("settings").style.visibility = "hidden";
  } else {
    document.getElementById("settings").style.visibility = "visible";
  }

}


function changeBvoice() {
  document.getElementById("bvoiceloading").style.visibility = "visible";
  print('yada yada ');
  var dataCap = document.getElementById("bvoiceselector").value;
  print(dataCap);
  Soundfont.instrument(ac, dataCap).then(function (player) {
      print('player ready');
      switch(dataCap){
        case 'slap_bass_2':
        bvoiceskew = -24;
        break;
        default:
        bvoiceskew = 0;
      }
  bvoice = player;
  document.getElementById("bvoiceloading").style.visibility = "hidden";
    })
}




function changeLvoice() {
  document.getElementById("lvoiceloading").style.visibility = "visible";
  print('yada yada ');
  var dataCap = document.getElementById("lvoiceselector").value;
  print(dataCap);
  Soundfont.instrument(ac, dataCap).then(function (player) {
      print('player ready');
      switch(dataCap){
        case 'slap_bass_2':
        lvoiceskew = -24;
        break;
        default:
        lvoiceskew = 0;
      }
  lvoice = player;
  document.getElementById("lvoiceloading").style.visibility = "hidden";
    })
}



function changeRvoice() {
  document.getElementById("rvoiceloading").style.visibility = "visible";
  print('yada yada ');
  var dataCap = document.getElementById("rvoiceselector").value;
  print(dataCap);
  Soundfont.instrument(ac, dataCap).then(function (player) {
      print('player ready');
      switch(dataCap){
        case 'slap_bass_2':
        rvoiceskew = -24;
        break;
        default:
        rvoiceskew = 0;
      }
  rvoice = player;
  document.getElementById("rvoiceloading").style.visibility = "hidden";
    })
}
// Author: Johnny Dinh

const model_url = 
      'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let pitch;
let mic;
let frequency = 0;
let threshold = 1;

let notes = 
  {'low_e' : 82.41,
   'a' : 110.00,
   'd' : 146.83,
   'g' : 196.00,
   'b' : 246.94,
   'high_e' : 329.63
  }

function setup() {
  createCanvas(400, 400);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening);
}

function listening() {
  console.log('Starting to listen...');
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}

function myGetPitch(error, freq) {
  console.log('Retrieving pitch...');
  if (error) {
    console.error(error);
  } 
  else {
    if (freq) {
      console.log(freq);
      frequency = freq;
    }
    pitch.getPitch(myGetPitch);
  }
}

function modelLoaded() {
  console.log('Loading model...');
  pitch.getPitch(myGetPitch);
}

function draw() {
  background(220);
  
  let note = 1;
  let smallest_diff = Infinity;
  for (var n in notes) {
    if (Math.abs(frequency - notes[n]) < smallest_diff)
    {
      note = n;
      smallest_diff = Math.abs(frequency - notes[n])
    }
  }
  
  if (smallest_diff < 30) {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(64);
    text(note, width / 2, height - 50);
  }
}
// Author: Johnny Dinh

const model_url = 
      'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let pitch;
let mic;
let frequency = 0;
let threshold = 1;


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
}
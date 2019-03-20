
var divs = document.getElementsByClassName("square")
const container = document.getElementById("root")

var initialized = false;
var tone = 220;
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var oscillator = audioCtx.createOscillator();
oscillator.type = 'triangle';
var gainNode = audioCtx.createGain();


var connected = false


function playTone(){
  if(initialized == false){
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination)
    gainNode.gain.setTargetAtTime(1, audioCtx.currentTime, 0.0009);
    oscillator.start();
    initialized = true;
    this.classList.add("active")
  }
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination)
    gainNode.gain.setTargetAtTime(1, audioCtx.currentTime, 0.0009);
    // oscillator.connect(audioCtx.destination);
    oscillator.frequency.value = this.attributes.getNamedItem('data-pitch').value;
    connected = true;
    this.classList.add("active")
  }
function endTone(){
      gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.0150);
      // oscillator.disconnect(gainNode)
      // oscillator.disconnect(audioCtx.destination);
      connected = false;
      this.classList.remove("active")
    }


function writeSquares(){
  for(var i = 0; i < 6; i++){
    const row = document.createElement('div');
    row.setAttribute('class', 'row');;
    container.appendChild(row);
  for(var j = 0; j < 6; j++){
    const square = document.createElement('div');
    square.setAttribute('class', 'square col')
    square.addEventListener('mousedown', playTone)
    square.addEventListener('mouseup', endTone)
    square.addEventListener('touchstart', playTone)
    square.addEventListener('touchend', endTone)
    tone = tone + 15;
    square.setAttribute('data-pitch', tone)
    row.appendChild(square);
    }
  }
}
writeSquares()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

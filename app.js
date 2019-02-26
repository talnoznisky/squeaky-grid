
var divs = document.getElementsByClassName("square")
const container = document.getElementById("container")

var initialized = false;
var tone = 220;
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

var connected = false


function playTone(){
  if(initialized == false){
    oscillator.start();
    initialized = true;
  }
    oscillator.connect(audioCtx.destination);
    oscillator.connect(gainNode);
    oscillator.frequency.value = this.attributes.getNamedItem('data-pitch').value;
    connected = true;
  }
function endTone(){
      gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 1.080);
      oscillator.disconnect(gainNode)
      oscillator.disconnect(audioCtx.destination);
      connected = false;
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
    tone = tone + 10;
    square.setAttribute('data-pitch', tone)
    row.appendChild(square);
    }
  }
}
writeSquares()

function playUp(){
  setInterval(playTone())
}

// function playUp(){
//   setInterval(function(){
//     oscillator.connect(audioCtx.destination);
//     oscillator.frequency.value = this.attributes.getNamedItem('data-pitch').value;
//     connected = true;
//   })
// }
// playUp()
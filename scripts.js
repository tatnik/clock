const animate_start = document.getElementById("start");
const animate_stop = document.getElementById("stop");
let requestId = null;
let clock_canv = null;

if(animate_start) {
  animate_start.addEventListener("click", () => {
    animate();
  });
}

if(animate_stop) {
  animate_stop.addEventListener("click", () => {
    window.cancelAnimationFrame(requestId);
  });
}


function animate() {
  clock_run(clock_canv);
  requestId = window.requestAnimationFrame(animate);
 };


 function clock_draw(){
  const canv = document.getElementById("canvas").getContext("2d");

  // initialize
  canv.clearRect(0, 0, 400, 400);
  canv.translate(200, 200);
  canv.rotate(-Math.PI / 2);
 
  // hour/minute lines
  canv.save();
  canv.lineWidth = 4;
  for (i = 0; i < 60; i++) {
    canv.beginPath();
    if (i % 5 === 0) {
      // hour line
      canv.strokeStyle = "gray";
      canv.moveTo(131, 0);
    }
    else{
      // minute & second line
      canv.strokeStyle = "lightblue";
      canv.moveTo(140, 0);
    }
    canv.lineTo(150, 0);
    canv.stroke();
    canv.rotate(Math.PI / 30);
  }
  canv.restore();

  // circle
  canv.save();
  canv.beginPath();
  canv.lineWidth = 14;
  canv.strokeStyle = "lightblue";
  canv.arc(0, 0, 170, 0, Math.PI * 2, true);
  canv.stroke();
  canv.restore();

  return canv;
 }

function clock_run(canv){

  // clear clock-field
  canv.save();
  canv.beginPath();
  canv.lineWidth = 1;
  canv.fillStyle = "white";
  canv.arc(0, 0, 130, 0, Math.PI * 2, true);
  canv.fill();
  canv.restore();

  // current time
  const now = new Date(); 
  const hh = now.getHours() % 12;
  const mm = now.getMinutes();
  const ss = now.getSeconds();

  // set hours
  canv.save();
  canv.rotate(hh * Math.PI / 6 + mm * Math.PI / 360);
  canv.fillStyle = "gray";
  canv.lineWidth = 14;
  canv.beginPath();
  canv.moveTo(0, 0);
  canv.lineTo(80, 0);
  canv.stroke();
  canv.restore();

  // set minutes
  canv.save();
  canv.rotate(mm * Math.PI / 30  + ss * Math.PI / 1800) ;
  canv.lineWidth = 10;
  canv.beginPath();
  canv.moveTo(0, 0);
  canv.lineTo(112, 0);
  canv.stroke();
  canv.restore();

  // set seconds
  canv.save();
  canv.rotate(ss * Math.PI / 30);
  canv.strokeStyle = "red";
  canv.fillStyle = "red";
  canv.lineWidth = 4;
  canv.beginPath();
  canv.moveTo(-30, 0);
  canv.lineTo(125, 0);
  canv.stroke();
  canv.beginPath();
  canv.arc(0, 0, 10, 0, Math.PI * 2, true);
  canv.fill();
  canv.restore();
 }

clock_canv = clock_draw();
clock_run(clock_canv);

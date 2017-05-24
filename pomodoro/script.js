var breakI = 5;
var sessionI = 25;
var clockStarted = false;
var timer = sessionI * 60;
var timerBreak = breakI * 60;
var sessionOn = true;
var progress_circle;

$(document).ready(function() {
  startProgressBar("session");
  $('#breakLength').html(breakI);
  $('#sessionLength').html(sessionI);
});

document.getElementById("increaseBreak").addEventListener("click", increaseBreak, false);
document.getElementById("decreaseBreak").addEventListener("click", decreaseBreak, false);
document.getElementById("increaseSession").addEventListener("click", increaseSession, false);
document.getElementById("decreaseSession").addEventListener("click", decreaseSession, false);
document.getElementById("reset").addEventListener("click", resetClock, false);
document.getElementById("progressCircle").addEventListener("click", startClock, false);

function startClock() {

  if (!clockStarted) {
    console.log("Started clock");
    clockStarted = true;
    //console.log("timerBreak, 60breakI, timer, 60sessionI: " + timerBreak + " " + 60*breakI + " " + timer + " " + 60*sessionI);;
    if (timerBreak == breakI * 60 && timer == sessionI*60) {startProgressBar("session")};
    var inter = setInterval(function(){
      if (!clockStarted) {
        clearInterval(inter);
      }
      if (sessionOn) {
        //console.log("setInterval was triggered for session" + timer);
        printCurrentTime(timer);
        timer--;
        //console.log("Percent: " + 100*(sessionI*60-timer)/(sessionI*60));
          progress_circle.gmpc('percent', 100*(sessionI*60-timer)/(sessionI*60));

        if (timer < 0) {
          progress_circle.gmpc('percent', 100);
          playSound();
          sessionOn = false;
          timerBreak = breakI * 60;
          timer = sessionI * 60;
          startProgressBar("break");
        }
      }
      else {
        //console.log("setInterval was triggered for break " + timerBreak);
        printCurrentTime(timerBreak);
        timerBreak--;
        //console.log("Percent: " +100*(breakI*60-timerBreak)/(breakI*60));
        progress_circle.gmpc('percent', 100*(breakI*60-timerBreak)/(breakI*60));
        if (timerBreak < 0) {
          progress_circle.gmpc('percent', 100);
          playSound();
          sessionOn = true;
          timerBreak = breakI * 60;
          timer = sessionI * 60;
          startProgressBar("session");
        }
      }
    }, 1000);

  }
  else {
    clockStarted = false;
  }
}

function resetClock() {
  clockStarted = false;
  timer = sessionI * 60;
  timerBreak = breakI * 60
//  printCurrentTime(timer);
  sessionOn = true;
//  progress_circle.gmpc('percent', 0);
  startProgressBar("session");
}

function printCurrentTime(localTimer){
  var min = Math.floor(localTimer / 60);
  var sec = localTimer - min*60 ;
  if (sec < 10) { sec = "0" + sec;}
  //console.log("Updating time");
  //console.log("Inside printCurrentTime for " + localTimer + ". Min and sec: " +
  //            min + ":" + sec);
  if (sessionOn) {
    $('.gmpc-percent-text').html("<span class='mode'>SESSION</span><br />" + min + ":" + sec);
  }
  else {
    $('.gmpc-percent-text').html("<span class='mode'>BREAK</span><br />" + min + ":" + sec);
  }
}


function startProgressBar(mode) {
  if (mode == "session") {
    var options = {
        height: "300px",
        width: "300px",
        line_width: 20,
        color: "#76323F",
        starting_position: 0,
        percent: 0,
        text: "START",
        font_size: "34px",
        font_family: "Raleway"
    }
  }
  else {
    var options = {
        height: "300px",
        width: "300px",
        line_width: 16,
        color: "#C09F80",
        starting_position: 0,
        percent: 0,
        text: "START BREAK",
        font_size: "34px",
        font_family: "Raleway"
    }
  }
  $('#start').empty();
  progress_circle = $("#start").gmpc(options);
}

function increaseBreak() {
  breakI++;
  $('#breakLength').html(breakI);
  timerBreak = timerBreak + 60;
}

function decreaseBreak() {
  if (breakI > 1 ) {
    breakI--;
    timerBreak = timerBreak - 60;
  }
  $('#breakLength').html(breakI);
}

function increaseSession() {
  sessionI++;
  $('#sessionLength').html(sessionI);
  timer = timer + 60;
}

function decreaseSession() {
  if (sessionI > 1 ) {
    sessionI--;
    timer = timer - 60;
  }
  $('#sessionLength').html(sessionI);
}

function playSound() {
      var sound = document.getElementById("audio");
      sound.play();
  }

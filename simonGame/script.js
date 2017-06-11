var poweron = false;
var currentGame = {};
var buttons= [["green","audio1"],
              ["red","audio2"],
              ["yellow","audio3"],
              ["blue","audio4"]]
var buttonsTemp= ["green", "red", "yellow","blue"];
var playbackEnded = true;

function Game() {
  console.log(this);
  this.buttonSequence = [];
  //todo: read strict setting
  this.strict = false;
  this.playSpeed = 1;
  this.order = 0;
  this.orderIn = 0;
  this.ended= false;
  // check strict
  if ($("#strictButton").hasClass("slideon")) {
    this.strict = true;
  }
  else {
    this.strict = false;
  }

};
Game.prototype = {
//  constructor:Game,
  addFirstMove: function() {
    this.buttonSequence.push(Math.floor(Math.random()*4));
  },
  addNextMove: function(){
    if (!this.ended){
      this.order ++;
      this.buttonSequence.push(Math.floor(Math.random()*4));
    }
  },
  playCurrentSequence: function(){
    if (!this.ended){
      this.displayOrder();
      console.log(this.buttonSequence);
      playbackEnded = false;
      this.playNextButton(0);
    }
  },
  playNextButton: function(i){
    if (!playbackEnded && poweron) {
      setTimeout(function(i){
        this.playSingleButton(this.buttonSequence[i]);
      //  console.log("Inside loop, i: " + i);
        if (i == this.buttonSequence.length -1 ) {
          playbackEnded = true
        }
        else {
        //  console.log("Playback not ended: i=", i , ", this.buttonSequence[i].length: ", this.buttonSequence[i].length);
          i++;
          this.playNextButton(i);
        }
      }.bind(this, i), 1000*this.playSpeed)
    }
  },
  playSingleButton: function(index){
    console.log("Now playing: ", index);
    $("#" + buttons[index][0]).addClass("on");
    var sound = document.getElementById(buttons[index][1]);
    sound.play();
    setTimeout(function(){
        $("#" + buttons[index][0]).removeClass("on");
    },700*this.playSpeed);
  },
  displayOrder: function(){
    if (!this.ended){
      var temp = this.order +1;
      if (temp<10) {
        $("#display").text("0" + temp);
      }
      else {
        $("#display").text(temp);
      }
    }
  },
  displayError: function(){
    if (!this.ended){$("#display").text("ERR")};
  },
  restartResponse: function(){
    this.orderIn = 0;
  },
  getStrict: function(){ return this.strict},
  changeStrict: function(){
    if (this.strict) {this.strict = false}
    else {this.strict = true }
  },
  getEnded: function(){return this.ended},
  checkMove: function(pressed){
  //  console.log("Checking move nr " +this.orderIn + ". Total moves in the sequence: " + this.order);
    if (!this.ended){
      console.log("Pressed: " + pressed + ", needed: " + this.buttonSequence[this.orderIn]);
      if (pressed == this.buttonSequence[this.orderIn]) {
        this.orderIn ++;
        if (this.orderIn == 10) {this.win()}; // change to 20
        return true;
      }
      else {
        var sound = document.getElementById("error");
        sound.play();
        return false}
      }
  },
  checkLastMove: function() {
    if (!this.ended){
      console.log("Checking if the last move: " + this.orderIn + " out of " + this.order + " moves");
      if (this.orderIn == this.order+1) {
        this.orderIn = 0;
        return true;
      }
      else {return false;}
    }
  },
  changePlaySpeed: function(){},
  fail: function(){
    console.log("Failed");
    $("#display").text("FAIL!");
    this.ended = true;
  },
  win: function(){
    console.log("Won!");
    $("#display").text("WON!");
    this.ended = true;
  }
}

$(document).ready(function() {

});

//user interaction - control panel
$("#onOff").click(function(){
  if (!poweron) {
    poweron = true;
    $("#display").text("--");
    $("#onOffButton").addClass("slideon");
  }
  else {
    poweron = false;
    currentGame = {};
    $("#display").text("");
    $("#onOffButton").removeClass("slideon");
  }
});

$("#strict").click(function(){
  if ($("#strictButton").hasClass("slideon")) {
    $("#strictButton").removeClass("slideon");
  }
  else {
    $("#strictButton").addClass("slideon");
  }
  if (poweron) {currentGame.changeStrict()};
});

$("#start").click(function(){
  if (poweron) {
    currentGame = new Game();
    $("#display").text("--");
    setTimeout(function(){
      $("#display").text("");
      setTimeout(function(){
        $("#display").text("--");
        setTimeout(function(){
          currentGame.addFirstMove();
//          currentGame.displayOrder();
          currentGame.playCurrentSequence();
        }, 500);
      }, 500);
    }, 200);

  }
});

//user interaction - play
$(".around").click(function(){
  if (playbackEnded && poweron) {
    var index = buttonsTemp.indexOf(this.id);
    currentGame.playSingleButton(index);
    var correct = currentGame.checkMove(index);
    if (correct) {
      console.log("Correct response");
      if (currentGame.checkLastMove()) {
        console.log("Last move in the sequence");
        $("#display").text("OK!");
        setTimeout(function(){
          currentGame.addNextMove();
  //        currentGame.displayOrder();
          currentGame.playCurrentSequence();
        },1000);
      }
    }
    else if (!correct && !currentGame.strict) {
      console.log("Non strict fail, replaying sequence");
      currentGame.restartResponse();
      currentGame.displayError();
      setTimeout(function(){
        currentGame.playCurrentSequence();
      },1000)
      }
    else if (!currentGame.getEnded()){ currentGame.fail(); };
  }
});

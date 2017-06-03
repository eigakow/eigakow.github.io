var active = "X" // X or 0

var field = [];
var score1 = 0;
var score2 = 0;
var players = ["X", "0"];
var playersNames = ["Player 1", "Player 2"];
var computerMode = true;
var ended = false;


var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
context.strokeStyle = '#05262d';
context.beginPath();
context.moveTo(120, 20);
context.lineTo(120, 340);
context.stroke();
context.moveTo(240, 20);
context.lineTo(240, 340);
context.stroke();
context.moveTo(20, 120);
context.lineTo(340, 120);
context.stroke();
context.moveTo(20, 240);
context.lineTo(340, 240);
context.stroke();

$(document).ready(function() {
  startGame();
  $(".field").on("click", clickAction);

})

function clickAction(event) {
  id = event.currentTarget.id;
  if (fieldEmpty(id)) {
    if (!computerMode) {
      actOnClick(id);
    }
    else if (computerMode && (active !== players[1])) {
      console.log("In computer mode, active is " + active);
      actOnClick(id);
    }
  }
  return false;
}

function actOnClick(id) {
  var sel = '#' + id + ' > span';
  $(sel).html(active);
  processMove(id);
  prepareNextMove();
}

$(".reset").click(function() {
  startGame();
});

$(".startButton").click(function() {
  if (this.id === "oneM") {
    computerMode = true;
    playersNames = ["Player 1", "Computer"];
  }
  else {
    computerMode = false;
    playersNames = ["Player 1", "Player 2"];
  }
  $("#player1").html("Player 1");
  $(".score > #player2").html(playersNames[1]);
  secondPanel();
  console.log("Names: "+ playersNames)
});

$(".symbolButton").click(function() {
  if (this.id === "X") {
    players = ["X", "0"];
    active = "X";
  }
  else {
    players = ["0", "X"];
    active = "0";
  }
  console.log("symbols: " + players);
  score1 = 0;
  score2 = 0;
  initializeBoard();
  prepareNextMove();
});

function prepareNextMove() {
  printTurn();
  if (computerMode && active == players[1]) {
    setTimeout(function(){
        computerMove();
    },750);
  }
}

function computerMove(){
  var id = chooseNextMove();
  console.log("inside computerMove, id chosen: " + id);
  actOnClick(id);

}

function startGame() {
  $("#secondPanel").fadeOut(400);
  $(".field").fadeOut(400);
  $("#endGame").fadeOut(400);
  $(".reset").fadeOut(400);
  $(".score").fadeOut(400);
  $(".turn").fadeOut(400);
  $("canvas").fadeOut(400, function(){
    $("#startGame").fadeIn(800);
  });

}

function secondPanel() {

  $("#startGame").fadeOut(400, function(){
    $("#secondPanel").fadeIn(400);
    $(".reset").fadeIn(400);
  });

}

function initializeBoard() {

  ended = false;
  $("#secondPanel").fadeOut(800);
  $("canvas").fadeOut(400);
  $(".field").fadeOut(400);
  $(".turn").fadeOut(400);

  field = [["", "", ""], ["", "", ""], ["", "", ""]];
  $('.field').children().html("");
  $(".score > #result").html(score1 + ":" + score2);
  $('.field').children().removeClass("highlighted");
  $('.field').removeClass("highlighted");

  $("#endGame").fadeOut(800, function(){
      $("canvas").fadeIn(800);
      $(".field").fadeIn(800);
      $(".score").fadeIn(800);
      $(".turn").fadeIn(800);
  });

}

function fieldEmpty(id) {
  if (field[id[0]][id[1]] === "X" || field[id[0]][id[1]] ==="0") {
    return false;
  }
  else {
    return true;
  }
}

function processMove(id) {
//  if (!ended) {
    field[id[0]][id[1]] = active;
    checkResult(id);
    active = nextActive();
//  }
}

function checkResult(id){

  //horizontal
  if (field[id[0]][0] === active && field[id[0]][1]  === active && field[id[0]][2]  === active) {
    console.log(active + " wins!");
    drawLine(id[0], "h");
    endGame(active);
  }
  //verdical
  else if (field[0][id[1]] === active && field[1][id[1]]  === active && field[2][id[1]]  === active) {
    console.log(active + " wins!");
    drawLine(id[1], "v");
    endGame(active);
  }
  // first diagonal
  else if (field[0][0] === active && field[1][1] === active && field[2][2] === active) {
    console.log(active + " wins!");
    drawLine(0, "d");
    endGame(active);
  }
  // second diagonal
  else if (field[2][0] === active && field[1][1] === active && field[0][2] === active) {
    console.log(active + " wins!");
    drawLine(2, "d");
    endGame(active);
  }
  // tied
  else if (allFilled()){
    console.log("Tied!");
    endGame(null);
  }
  else {
  //  console.log("Nobody wins...");
  }
}

function endGame(winner){
  ended = true;
  console.log("winner passed to endgame "+winner);
  if (winner === null) {
    console.log("tied!");
  }
  else if (players[0] === winner) {
    console.log(playersNames[0] + " wins");
    score1 ++;
  }
  else if (players[1] === winner) {
    console.log(playersNames[1] + " wins");
    score2 ++;
  }
  else {
    console.log("error");
  }

  printWinScreen(winner);

  $(".score > #result").html(score1 + ":" + score2);
  setTimeout(function(){
    initializeBoard();
    prepareNextMove();
  },4000);
}

function drawLine(x,type){
  console.log("Inside draw line");
  if (type == "h"){
    var arr = [ "#"+x+"0", "#"+x+"1", "#"+x+"2"];
  }
  else if (type == "v"){
    var arr = [ "#0"+x, "#1"+x, "#2"+x];
  }
  else if (type == "d" && x=="0"){
    var arr = [ "#00", "#11", "#22"];
  }
  else {
    var arr = [ "#20", "#11", "#02"];
  }
  for (i=0; i<arr.length; i++) {
    $(arr[i]).children().addClass("highlighted");
    $(arr[i]).addClass("highlighted");
  }
}

function printWinScreen(winner) {
  console.log("Inside printwinscreen");
  $("#endGame").fadeIn(2000);

  if (winner === null){
    $("#endGame").html("Tie! There is<br />no winner...");
  }
  else if (winner == players[0]){
    $("#endGame").html(playersNames[0] + " won this game!");
  }
  else if (winner == players[1]){
    $("#endGame").html(playersNames[1] + " won this game!");
  }
  else {
    console.log("error")
  }
}

function printTurn(){
  if(active === players[0])
  {
  //  console.log(playersNames[0] + " turn");
    $(".turn > span").html(playersNames[0] + " turn: " + active);
  }
  else {
    $(".turn > span").html(playersNames[1] + " turn: " + active);
  //  console.log(playersNames[1] + " turn");
  }
}

function nextActive() {
  if (active === "X"){
    return "0";
  }
  else {
    return "X";
  }
}

function allFilled() {
  var notFilled = false;
  for (i=0; i<3; i++) {
    if (field[i][0] === "" || field[i][1] === "" || field[i][2] === "") {
      notFilled = true;
    }
  }
  return !notFilled;
}


function chooseNextMove (){
  //find if i can win
  var myoptions = searchForTwo(active);
  if (myoptions.length > 0) {
    return myoptions[0][2];
  }
  //find if opponent can win
  var theiroptions = searchForTwo(nextActive());
  if (theiroptions.length > 0) {
    return theiroptions[0][2];
  }
  //choose other
  return chooseRandomFreeField();
}

function searchForTwo(symbol) {
  var result = [];
  for (var i=0; i<3; i++) {
    //horizontal
    var hor = 0;
    var free = 0;
    var freefield = "";
    for (var j=0; j<3; j++) {
      if (field[i][j] === symbol) { hor++ }
      if (field[i][j] === "") {
        free++;
        freefield = i.toString() + j.toString();
      }
    }
    if (hor == 2 && free == 1) { result.push(["hor", i, freefield])}
    //verdical
    var ver = 0;
    free = 0;
    for (var k=0; k<3; k++) {
      if (field[k][i] === symbol) { ver++ }
      if (field[k][i] === "") {
        free++;
        freefield = k.toString() + i.toString();
      }
    }
    if (ver == 2 && free == 1) { result.push(["ver", i, freefield])}
  }
  // diagonal 1
  free = 0;
  var diag1 = 0;
  for (var l=0; l<3; l++) {
    if (field[l][l] === symbol) { diag1++ }
    if (field[l][l] === "") {
      free++;
      freefield = l.toString() + l.toString();
    }
  }
  if (diag1 == 2 && free == 1) { result.push(["diag1", 1, freefield])}
  // diagonal 2
  free = 0;
  var diag2 = 0;
  for (var m=0; m<3; m++) {
    if (field[2-m][m] === symbol) { diag2++ }
    if (field[2-m][m] === "") {
      free++;
      freefield = (2-m).toString() + m.toString();
    }
  }
  if (diag2 == 2 && free == 1) { result.push(["diag2", 1, freefield])}

  console.log("Lines with two fields filled in for " +symbol + " : ", result);
  return result;
}

function chooseRandomFreeField() {
  var result = []
  for (var i=0; i<3; i++) {
    for (var j=0; j<3; j++) {
      if (field[i][j] === "" ) {
        result.push(i.toString()+j.toString());
        console.log("Found a free field " + i.toString()+j.toString());
      }
    }
  }
  var one = result[Math.floor(Math.random()*result.length)];
  console.log("Random move chosen: " + one);
  return one
}

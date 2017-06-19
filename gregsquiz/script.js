var question_template = [["What is a relative minor key of major key "],
                ["What is a relative major key of minor key "],
                ["What is the ", " chord in major key "],
                ["What is the ", " chord in minor key "],
                ["What are the notes in chord "]];

var keysMajor = ["A", "B", "C", "D", "E", "F", "G", "Ab", "Bb", "Db", "Eb", "Gb", "F#"];
var keysMinor = ["a", "b", "c", "d", "e", "f", "g", "bb", "c#", "d#", "eb", "f#", "g#"];
var chordY = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"];
var chordZ = ["A", "B", "C", "D", "E", "F", "G",
              "Am", "Bm", "Cm", "Dm", "Em", "Fm", "Gm",
              "Amaj7", "Bmaj7", "Cmaj7", "Dmaj7", "Emaj7", "Fmaj7", "Gmaj7",
              "Amin7", "Bmin7", "Cmin7", "Dmin7", "Emin7", "Fmin7", "Gmin7",
              "A7", "B7", "C7", "D7", "E7", "F7", "G7"];

var resp0 = ["f#", "g#", "a", "b", "c#", "d", "e", "f", "g", "bb", "c", "eb", "d#"];
var resp1 = ["C", "D", "Eb", "F", "G", "Ab", "Bb", "Db", "E", "F#", "Gb", "A", "B"];
var resp2 = [[["A"],["Bm"],["C#m"],["D"],["E7"],["F#m"],["G#dim"]],
            [["B"],["C#m"],["D#m"],["E"],["F#7"],["G#m"],["A#dim"]],
            [["C"],["Dm"],["Em"],["F"],["G7"],["Am"],["Bdim"]],
            [["D"],["Em"],["F#m"],["G"],["A7"],["Bm"],["C#dim"]],
            [["E"],["F#m"],["G#m"],["A"],["B7"],["C#m"],["D#dim"]],
            [["F"],["Gm"],["Am"],["Bb"],["C7"],["Dm"],["Edim"]],
            [["G"],["Am"],["Bm"],["C"],["D7"],["Em"],["F#dim"]],
            [["Ab"],["Bbm"],["Cm"],["Db"],["Eb7"],["Fm"],["Gdim"]],
            [["Bb"],["Cm"],["Dm"],["Eb"],["F7"],["Gm"],["Adim"]],
            [["Db"],["Ebm"],["Fm"],["Gb"],["Ab7"],["Bbm"],["Cdim"]],
            [["Eb"],["Fm"],["Gm"],["Ab"],["Bb7"],["Cm"],["Ddim"]],
            [["Gb"],["Abm"],["Bbm"],["Cb"],["Db7"],["Ebm"],["Fdim"]],
            [["F#"],["G#m"],["A#m"],["B"],["C#7"],["D#m"],["E#dim"]]];
var resp3 = [[["Am"],["Bdim"],["C"],["Dm"],["Em"],["F"],["G7"]],
            [["Bm"],["C#dim"],["D"],["Em"],["F#m"],["G"],["A7"]],
            [["Cm"],["Ddim"],["Eb"],["Fm"],["Gm"],["Ab"],["Bb7"]],
            [["Dm"],["Edim"],["F"],["Gm"],["Am"],["Bb"],["C7"]],
            [["Em"],["F#dim"],["G"],["Am"],["Bm"],["C"],["D7"]],
            [["Fm"],["Gdim"],["Ab"],["Bbm"],["Cm"],["Db"],["Eb7"]],
            [["Gm"],["Adim"],["Bb"],["Cm"],["Dm"],["Eb"],["F7"]],
            [["Bbm"],["Cdim"],["Db"],["Ebm"],["Fm"],["Gb"],["Ab7"]],
            [["C#m"],["D#dim"],["E"],["F#m"],["G#m"],["A"],["B7"]],
            [["D#m"],["E#dim"],["F#"],["G#m"],["A#m"],["B"],["C#7"]],
            [["Ebm"],["Fdim"],["Gb"],["Abm"],["Bbm"],["Cb"],["Db7"]],
            [["F#m"],["G#dim"],["A"],["Bm"],["C#m"],["D"],["E7"]],
            [["Abm"],["Bbdim"],["Cb"],["Dbm"],["Ebm"],["Fb"],["Gb7"]]];
var resp4 = ["A C# E", "B D# F#", "C E G", "D F# A", "E G# B", "F A C", "G B D",
              "A C E", "B D F#", "C Eb G", "D F A", "E G B", "F Ab C", "G Bb D",
              "A C# E G#", "B D# F# A#", "C E G B", "D F# A C#", "E G# B D#", "F A C E", "G B D F#",
              "A C E G", "B D F# A", "C Eb G Bb", "D F A C", "E G B D", "F Ab C Eb", "G Bb D F",
              "A C# E G", "B D# F# A", "C E G Bb ", "D F# A C", "E G# B D", "F A C Eb", "G B D F"];

var curr_q_id = 0;
var curr_key_id = 0;
var curr_cor_resp = "";
var questionsolved = true;
var rounds = 20;
var questionCount = 0;
var win = 0;
var fail = 0;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


$(document).ready(function() {
  generateQuestion();
});

function generateQuestion() {
  if (!questionsolved) {
    fail++;
    console.log("FAIL: next question before solving previous one: ", fail);
  }

  questionCount++;

  if (questionCount == rounds +1) {
    endQuiz();
  }
  else {
    $('#questionCount').html(questionCount);
  }

  //var questionNr = getRandomInt(0,question_template.length-1);
  var questionNr = getRandomInt(0,question_template.length-1);

  switch (questionNr) {
    case 0:
      var keyNr = getRandomInt(0,keysMajor.length-1);
      var questionStr = question_template[questionNr][0] + keysMajor[keyNr] + "?";
      break;
    case 1:
      var keyNr = getRandomInt(0,keysMinor.length-1);
      var questionStr = question_template[questionNr][0] + keysMinor[keyNr] + "?";
      break;
    case 2:
      var keyNr = [getRandomInt(0,keysMajor.length-1), getRandomInt(0,6)];
      var questionStr = question_template[questionNr][0] + chordY[keyNr[1]] +
          question_template[questionNr][1] + keysMajor[keyNr[0]] + "?";
      break;
    case 3:
      var keyNr = [getRandomInt(0,keysMinor.length-1), getRandomInt(0,6)];
      var questionStr = question_template[questionNr][0] + chordY[keyNr[1]] +
        question_template[questionNr][1] + keysMinor[keyNr[0]] + "?";
      break;
    case 4:
      var keyNr = getRandomInt(0,chordZ.length-1);
      var questionStr = question_template[questionNr][0] + chordZ[keyNr] + "?";
      break;
  }
  $( ".form-group" ).removeClass( "has-error has-success" );
  $( "#response" ).val("");
  $('#question').html(questionStr);
  $('#solution').html("");
  console.log(questionNr, keyNr);
  curr_q_id  = questionNr;
  curr_key_id = keyNr;
  questionsolved = false;
//  return [questionNr, keyNr];
}

document.getElementById("nextQuestion").addEventListener("click", generateQuestion, false);

document.getElementById("seeanswerclick").addEventListener("click", showAnswer, false);

$('body').keypress(function (event) {
  if (event.which == 13 && questionsolved ) {
    event.preventDefault();
    console.log("questionsolved: ", questionsolved);
    generateQuestion();
  }
  else if (event.which == 13 && !questionsolved) {
    event.preventDefault();
    var response = $( "#response" ).val();
    console.log(response);
    console.log("questionsolved: ", questionsolved)
    checkAnswer(response);
  }
  else {
    console.log("questionsolved: ", questionsolved)
  }
});

function getAnswer() {
  console.log("inside get answer for: ", curr_q_id , curr_key_id );
  switch (curr_q_id) {
    case 0:
      curr_cor_resp = resp0[curr_key_id]; break;
     case 1:
      curr_cor_resp = resp1[curr_key_id]; break;
    case 2:
      console.log("Question type 3, curr_cor_resp: " + resp2[curr_key_id[0]][curr_key_id[1]][0] + ", type of ", typeof resp2[curr_key_id[0]][curr_key_id[1]]);
      curr_cor_resp = resp2[curr_key_id[0]][curr_key_id[1]][0]; break;
    case 3:
      console.log("Question type 4, curr_cor_resp: " + resp3[curr_key_id[0]][curr_key_id[1]][0] + ", type of ", typeof resp3[curr_key_id[0]][curr_key_id[1]]);
      curr_cor_resp = resp3[curr_key_id[0]][curr_key_id[1]][0]; break;
    case 4:
      curr_cor_resp = resp4[curr_key_id]; break;
    }
}

function showAnswer(){
  if (!questionsolved) {
    getAnswer();
    $('#solution').html("Response: " + curr_cor_resp);
//    $( ".form-group" ).prop("disabled", true);
    questionsolved = true;
    fail++;
    console.log("FAIL: show answer without solving question or wrong answer: ", fail);
  }
  else {
    generateQuestion();
  }
}

function checkAnswer(givenAnswer) {
  getAnswer();
  if ((givenAnswer == curr_cor_resp) || ( givenAnswer.toLowerCase() == curr_cor_resp.toLowerCase() && (curr_q_id == 2 || curr_q_id == 3 || curr_q_id == 4))) {
    $( ".form-group" ).addClass( "has-success" );
    win++;
    $('.score').html(win + "/" + rounds);
    console.log("WIN: correct answer", win);
  }
  else {
    $( ".form-group" ).addClass( "has-error" );
    showAnswer();
  }
  questionsolved= true;
}

function endQuiz() {
  $(".solution").remove();
  $(".seeanswer").remove();
  $(".response").remove();
  $(".question").remove();
  $(".header").remove();
  $("body").append('<div class="container endscreen"><div class="col-xs-1 col-md-1 col-lg-3">'+
      '</div><div class="col-xs-10 col-md-10 col-lg-6"><p>Your score is:</p>'+
      '<span class="scorefull">'+ win + '/' + rounds + '</span></div></div>'+
      '<p class="retake">Reload the page to retake the quiz</p>');
 };

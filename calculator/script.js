var currentDigit = "";
var totalDigit="";
var operationAllowed = false;
var prevResultAvailable = false;
var fullDecimal = true; // used to make sure there is only one '.' is a decimal



$(document).ready(function() {

  $("button").click(function() {
    switch (this.id){
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
      case ".":
        numberPressed(this.id);
        break;
      case "+":
      case "-":
      case "/":
      case "*":
        operationPressed(this.id);
        break;
      case "ac":
        allClearPressed();
        break;
      case "ce":
        clearEntryPressed();
        break;
      case "=":
        finalizeCalc();
        break;
    }
  });
})

function numberPressed(d) {
  if (prevResultAvailable) {
    prevResultAvailable = false;
    totalDigit = "";
  }
  if (!operationAllowed) { //so beginning of a new number
    console.log("Pressed as a first digit of a number: " + d);
    if (d == ".") {
      currentDigit += "0.";
      totalDigit += "0.";
      fullDecimal = false;
      operationAllowed = true;
    }
    else if (d === "0") {
      // skip adding it, still beginning of a new number
    }
    else {
      console.log("Inside 'else'");
      currentDigit += d;
      totalDigit += d;
      operationAllowed = true;
    }
  }
  else {  //in the middle of a word
    console.log("Pressed as a non-first digit of a number: " + d);
    if ( d == "." && !fullDecimal) {
      // second dot in a decimal, do nothing
    }
    else if (d == "." && fullDecimal) {
      currentDigit += d;
      totalDigit += d;
      fullDecimal = false;
    }
    else {
      currentDigit += d;
      totalDigit += d;
    }
  }
  printOut(currentDigit, totalDigit);
}

function operationPressed(o) {
  if (prevResultAvailable) {
    prevResultAvailable = false;
    operationAllowed = true;
  }
  if (operationAllowed) {
    currentDigit = "";
    totalDigit += o;
    printOut(o, totalDigit);
    operationAllowed = false;
    fullDecimal = true;
  }
  else {
    totalDigit = totalDigit.slice(0, -1);
    totalDigit += o;
    printOut(o, totalDigit);
  }
}

function allClearPressed() {
  currentDigit = "";
  totalDigit = "";
  printOut(0, 0);
  operationAllowed = false;
  prevResultAvailable = false;
  fullDecimal = true;
}

function clearEntryPressed() {
  if (prevResultAvailable) {
    allClearPressed();
  }
  if (totalDigit.length != 0) {
    totalDigit = totalDigit.slice(0, currentDigit.length * -1);
    currentDigit = "";
    printOut(0, totalDigit);
    operationAllowed = false;
    fullDecimal = true;
  }
}

function printOut(c, t) {
  //As evaluation returns number
  c = c.toString();
  t = t.toString();
  // max current 14 digits printed outline

  if (c.length >= 15) {
    // How many digits cannot be printed?
//    console.log("Too long input for current: " + c);
    var over = c.length - 14;
    c = "~" + c.substring(over+1);
  }
  else if (c === ""){
    c = "0";
  }
  $('.currentPressed').html(c);

   // max total 35 digits
  if (t.length >= 36) {
    console.log("Too long input for total: " + t);
    var over = t.length - 35;
    t = "~" + t.substring(over+1);
  }
  else if (t === ""){
    t = "0";
  }
  $('.totalPressed').html(t);
}

function finalizeCalc() {
  var last = totalDigit[totalDigit.length-1];
  if ( last == "+" || last == "-" || last == "/" || last == "*") {
    totalDigit = totalDigit.slice(0, -1);
    console.log(totalDigit);
  }
  var result = roundResult(eval(totalDigit));
  totalDigit = totalDigit + "=" + result;
  printOut(result, totalDigit);
  totalDigit = result;
  currentDigit = "";
  operationAllowed = false;
  prevResultAvailable = true;
  fullDecimal = true;
}

function roundResult(res){
  //Round correctly if it's a decimal
  if (res.toString().indexOf(".") !== -1) {
    return parseFloat(res.toFixed(5).toString());
  }
  else {
    return res;
  }
}

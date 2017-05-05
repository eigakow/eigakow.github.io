$(document).ready(function(){

  var ftemp;
  var ctemp;
  var current = "c";

  if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(function(position) {

     // find out the weather
     var url2 = "https://api.darksky.net/forecast/817b8097d69a596bac190f7b046ce942/"+ position.coords.latitude + "," + position.coords.longitude + "?units=si&&callback=?";
   console.log(url2);
   $.getJSON(url2, function(json) {
     console.log("Successfully received weather info from DarkSky");
     console.log(json);
     ctemp = Math.round(json.currently.temperature);
     ftemp = Math.round(json.currently.temperature * 9 / 5 + 32);
     $("#ptemp").html(Math.round(ctemp));
     $("#pwind").html(json.currently.windSpeed);
     $("#phumid").html(Math.round(json.currently.humidity*100));
     $("#pweather").html(json.currently.summary);
     icons.add("picon", json.currently.icon);
   })

     // find out the city
     var url1 = "https://www.mapquestapi.com/geocoding/v1/reverse?key=GNyRhY4BQseIphmgAfxKScrZVwmq9YIT&location=" + position.coords.latitude + "," + position.coords.longitude + "&outFormat=json&thumbMaps=false";
//      console.log(url1);
   $.getJSON(url1, function(json) {
//     console.log("Successfully received data from mapquest");
//    console.log(json);
     $("#city").html(json.results[0].locations[0].adminArea5 + ", " + json.results[0].locations[0].adminArea1);
   })
 });
} //end geoloc
  else {
    alert("No geolocation enabled!");
  }
 $("#dtemp").click(function(){
   if ( current == "c"){
      $("#ptemp").html(ftemp);
      $(".scale").removeClass("wi-celsius");
      $(".scale").addClass("wi-fahrenheit");
      current = "f";
   }
   else {
      $("#ptemp").html(ctemp);
      $(".scale").removeClass("wi-fahrenheit");
      $(".scale").addClass("wi-celsius");
      current = "c";
   }
 })
}) // end ready doc

//var search="poland";
// var url="https://en.wikipedia.org/w/api.php?action=query&titles=" + search + "&rvprop=content&format=json";

$(document).ready(function() {
  $( "form" ).submit(function( event ) {
    // prevent the page reloading:
    event.preventDefault();
    // alert( "Handler for .submit() called." );
    var search = $( "#searchPhrase" ).val();
    console.log(search);

    if (search !== null && search !== undefined && search !== ""){
      //Remove old search
      $( "#searchResult" ).empty();

      //API details at https://www.mediawiki.org/wiki/API:Opensearch
      var url="https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + search +
      "&callback=?";

      $.getJSON(url, (function(data) {
        console.log(data);
        for (i=0; i<data[1].length ; i++) {
          var link = data[3][i];
          var title = data[1][i];
          var desc = data[2][i];
          $("#searchResult").append( //[1]title [2]header [3]link
            '<a href="'+ link +'" target="_blank"><div class="panel panel-default"><div class="panel-body">' +
            '<h4 class="maintitle">' + title + '</h4><span class="subtitle">' + desc +
            '</span></div></div></a>');
          }
      }
    )).fail(function(d, textStatus, error) {
      console.error("getJSON failed, status: " + textStatus + ", error: "+error)
      });
    }

  });

})

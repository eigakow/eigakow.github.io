var streamList = [["ESL_SC2"],[ "OgamingSC2"],
                  ["cretetion"], ["freecodecamp"],
                  ["storbeck"], ["habathcx"],
                  ["RobotCaleb"], ["noobs2ninjas"], ["comster404"]]

$(document).ready(function() {
  var streamListOnline = [];
  var streamListOffline = [];
  var streamListAll = [];

  for (var x=0; x< streamList.length; x++) {
    var state = "N/A";
    var content = "" ;
    var url_user = "https://wind-bow.gomix.me/twitch-api/users/" + streamList[x][0] + "?callback=?";
    var url = "https://wind-bow.gomix.me/twitch-api/streams/" + streamList[x][0] + "?callback=?";

  var channel = $.getJSON(url_user, (function(data) {
    console.log(data);
    }
  )).fail(function(d, textStatus, error) {
    console.error("getJSON failed, status: " + textStatus + ", error: "+error)
    });

    var stream = $.getJSON(url, (function(data) {
      console.log(data);
      }
    )).fail(function(d, textStatus, error) {
      console.error("getJSON failed, status: " + textStatus + ", error: "+error)
      });


    $.when(channel, stream)
      .done(function(returnChannel, returnStream) {
        console.log(returnChannel);
        console.log(returnStream);
        console.log("end channel and stream")

        //Printing logo
        if (returnChannel[0].logo === null || returnChannel[0].logo === undefined) {
          logo="images/no_image.png";
        }
        else {
          logo=returnChannel[0].logo;
        }
        var link = '<a href=https://www.twitch.tv/'+ returnChannel[0].name +' target="_blank" >';

        // Defining the status and printing row
        if (returnStream[0].stream!= null) {
          console.log ("Found online stream!");
          state = "online";
          col_state = "success";
          label_state = "success";
          content = returnStream[0].stream.channel.game + ": " + returnStream[0].stream.channel.status ;
          $("#tableBody_on").append('<tr class="'+ col_state +'">'+link+'<td class="smallCell">'+link+'<img src="'+logo+'   " /></td><td><h4>' + link + returnChannel[0].display_name +'</h4><span class="label label-'+ label_state +'">'+ state +'</span><br /><br /><small class="text-muted">'+content+'</small></td></tr>');
        }
        else if (returnChannel[0].error !== undefined) {
          state = "channel not exisiting";
          label_state ="warning"
          col_state = "";
          console.log(returnChannel[0].error);
          content="";
          }
        else {
          state = "offline";
          col_state = "";
          label_state = "default";
          content="";
          $("#tableBody_off").append('<tr class="'+ col_state +'">'+link+'<td class="smallCell">'+link+'<img src="'+logo+'   " /></td><td><h4>' + link + returnChannel[0].display_name +'</h4><span class="label label-'+ label_state +'">'+ state +'</span><br /><br /><small class="text-muted">'+content+'</small></td></tr>');
        }

  //      $("#tableBody").append('<tr class="'+ col_state +'">'+link+'<td>'+link+'<img src="'+logo+'   " /></td><td><h4>' + link + returnChannel[0].display_name +'</h4><span class="label label-'+ label_state +'">'+ state +'</span><br /><br /><small class="text-muted">'+content+'</small></td></tr>');
        $("#tableBody_all").append('<tr class="'+ col_state +'">'+link+'<td class="smallCell">'+link+'<img src="'+logo+'   " /></td><td><h4>' + link + returnChannel[0].display_name +'</h4><span class="label label-'+ label_state +'">'+ state +'</span><br /><br /><small class="text-muted">'+content+'</small></td></tr>');

      })
  }
});

$(document).ready(function(){
	$("#signButton").button({
		label: "Log out"
	});
	$("#addFriendButton").button({
		label: "Add friend"
	});
	$("#boredButton").button({
		label: "I'm bored!"
	});
	$("#notificationsButton").button({
		label: "Notifications"
	});
	$("#addFriendButton").click( function() {
		$("#dialog-friend").dialog( "open" );
	});
	
	$( "#boredButton" ).click(function() {
      $( "#dialog-activity" ).dialog( "open" );
    });
    
    $( "#notificationsButton" ).click(function() {
      $( "#dialog-notifications" ).dialog( "open" );
    });
	
	$( "#dialog-activity" ).dialog({
	  autoOpen: false,
      resizable: false,
	  width: 300,
	  height: 200,
      modal: true,
      buttons: {
        "Ok": function() {
          $( this ).dialog( "close" );
        },
        "Cancel": function() {
          $( this ).dialog( "close" );
        }
      }
    });
    
    
    $( "#dialog-friend" ).dialog({
	  autoOpen: false,
      resizable: false,
	  width: 300,
	  height: 200,
      modal: true,
      buttons: {
        "Ok": function() {
          $( this ).dialog( "close" );
        }
      }
    });    
    
    
    $( "#dialog-notifications" ).dialog({
	  autoOpen: false,
      resizable: false,
	  width: 300,
	  height: 300,
      modal: true,
      buttons: {
        "Ok": function() {
          $( this ).dialog( "close" );
        }
      }
    });
});

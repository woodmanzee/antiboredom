$(document).ready(function(){
	$("#addFriendButton").click( function() {
		alert("hi");
	});
	
	$( "#boredButton" ).click(function() {
      $( "#dialog-confirm" ).dialog( "open" );
    });
	
	$( "#dialog-confirm" ).dialog({
	  autoOpen: false,
      resizable: false,
	  width: 400,
      modal: true,
      buttons: {
        "Ok": function() {
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }
    });
});

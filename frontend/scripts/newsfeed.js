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
	
	function create_activity() {
	  // get the values from the form
	  var what = $('#dialog-activity #what_field input').val();
	  var where = $('#dialog-activity #where_field input').val();
	  var when = $('#dialog-activity #when_field input').val();
	  var details = $('#dialog-activity #details_field textarea').val();
	  
	  // debugging, look at the values
	  console.log(what);
	  console.log(where);
	  console.log(when)
	  console.log(details)
	  
	  // create a newsfeed item with the values
	  var newsItem = $('#news_item_placeholder').clone();
	  // TODO: populate the new values with the json returned from
	  // the server after a successful add
	  newsItem.attr('id', 'newID');
	  newsItem.find('img.news_user_icon').attr('id', 'newID');
	  newsItem.find('span.news_user_name').text('Someone');
	  newsItem.find('span.news_activity_name').text(what);
	  $('#boredFeedBox').prepend(newsItem);
	  newsItem.show();
	  
	}
	
	/* Note: At present, using .val() on textarea elements strips carriage return 
	characters from the browser-reported value. When this value is sent to the 
	server via XHR however, carriage returns are preserved (or added by browsers 
	which do not include them in the raw value). A workaround for this issue can 
	be achieved using a valHook as follows:
	http://api.jquery.com/val/
	*/
	$.valHooks.textarea = {
	  get: function( elem ) {
		return elem.value.replace( /\r?\n/g, "\r\n" );
	  }
	};
	
	$( "#dialog-activity" ).dialog({
	  autoOpen: false,
      resizable: false,
	  width: 350,
	  height: 550,
	  title: "Create Activity",
      modal: true,
      buttons: {
        "Create": function() {
		  create_activity();
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
        "Add Friend": function() {
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
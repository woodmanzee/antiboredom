$(document).ready(function(){

	get_friends();	
	get_notifications();
	get_activities();
	
	$("#logoutButton").button({
		label: "Log out"
	});
	
	$("#logoutButton").click(function(){
		$.ajax({
			type:"DELETE",
			url:"http://localhost:3000/users/sign_out",
			success: function(data) {
				console.log("Logged out");
			}
		});
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
		
	function get_activities() {
		$.ajax({
			type:"GET",
			url:"http://localhost:3000/activities.json",
			success: function(data) {
				$.each( data, function(i) {
					console.log(data[i].location);
					display_activity(data[i].title);
				});
			}
		});
	}
	
	function display_activity(what){
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
	
	function create_activity() {
	  // get the values from the form
	  var what = $('#dialog-activity #what_field input').val();
	  var where = $('#dialog-activity #where_field input').val();
	  var start_time = $('#dialog-activity #start_field input').val();
	  var end_time = $('#dialog-activity #end_field input').val();
	  var details = $('#dialog-activity #details_field textarea').val();
	  
	  // debugging, look at the values
	  console.log(what);
	  console.log(where);
	  console.log(start_time)
	  console.log(end_time)
	  console.log(details)
	  
	  display_activity(what);
	  
	  $.ajax({
			type: "POST",
			url: "http://antiboredom.herokuapp.com/activities/new",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			processData: false, // we don't want jquery to urlencode the json we send
			data: JSON.stringify({ userid: "1", title: what, location: where, start: start_time, end: end_time }),
			success: function(data, status, obj) {
				alert( "Returned with: " + data + " and " + status + " and " + obj);
			},
			error: function() {
				alert("Something went wrong");
			}
	  })
	  
	}
	
	function add_friend(){
		var email = $('#dialog-friend #email-field input').val();
 		//TODO send email/notification to another person
			$.getJSON( "http://antiboredom.herokuapp.com/activities.json", function( data ) {
			  var items = [];
			  $.each( data, function( key, val ) {
				items.push( "<li id='" + key + "'>" + val + "</li>" );
			  });
			 
			  $( "<ul/>", {
				"class": "my-new-list",
				html: items.join( "" )
			  }).appendTo( "body" );
			});
			
			/*$.ajax({
			  dataType: "jsonp",
			  url: "http://antiboredom.herokuapp.com/activities.json",
			  success: function( data ) {
			  var items = [];
			  $.each( data, function( key, val ) {
				items.push( "<li id='" + key + "'>" + val + "</li>" );
			  });
			 
			  $( "<ul/>", {
				"class": "my-new-list",
				html: items.join( "" )
			  }).appendTo( "body" );
			},
			error: function() {
				alert("Something went wrong");
			} 
			});*/
	}
	
	function get_friends(){	
		var friends = [ "Piggy","Kermit","Someone"];
		for ( var i = 0; i < friends.length; i = i + 1 ) {
			var friend = $('#friends_placeholder').clone();
			friend.attr('id', 'newID');
			friend.find('img.friend_icon').attr('id','newID');
			friend.find('span.friend_name').text(friends[i]);
			$('#friends_list').append(friend);
			friend.show();
		}
	}
	
	function get_notifications(){
		var accepted = ["Piggy"];
		for(var i = 0; i < accepted.length; i = i + 1 ){
			var accept = $('#accept_placeholder').clone();
			accept.attr('id','newID');
			accept.find('img.friend_icon').attr('id','newID');
			accept.find('span.friend_name').text(accepted[i]);
			$('#notifications_list').append(accept);
			accept.show();
		}
		
		var confirmed = ["Kermit"];
		for(var i = 0; i < confirmed.length; i = i + 1 ){
			var confirm = $('#confirm_placeholder').clone();
			confirm.attr('id','newID');
			confirm.find('img.friend_icon').attr('id','newID');
			confirm.find('span.friend_name').text(confirmed[i]);
			$('#notifications_list').append(confirm);
			confirm.show();
		}
		
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
      title: "Add Friend",
	  width: 300,
	  height: 350,
      modal: true,
      buttons: {
        "Add Friend": function() {
          add_friend();
          $( this ).dialog( "close" );
        },
        "Cancel": function() {
          $( this ).dialog( "close" );
        }
      },
      open: function(){
        $('#email-field').val("");
        console.log($('#email-field').val());
      }
    });    
    
    
    $( "#dialog-notifications" ).dialog({
	  autoOpen: false,
      resizable: false,
      title: "Notifications",
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

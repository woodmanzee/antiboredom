$(document).ready(function(){

  get_friends();	
  get_activities();
  welcome();

  $("#logoutButton").button({
    label: "Log Out"
  });

  $("#logoutButton").click(function(){
    $.ajax({
      type:"DELETE",
      url:"http://localhost:3000/users/sign_out",
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      success: function(data) {
        console.log("Logged out");
        location.href = "http://localhost:3000"
      }
    });
  });

  $("#addFriendButton").button({
    label: "Add Friend"
  });

  $("#boredButton").button({
    label: "I'm Bored!"
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
      //url: "http://antiboredom.herokuapp.com/activities/create",
      url: "http://localhost:3000/activities/create",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      processData: false, // we don't want jquery to urlencode the json we send
      data: JSON.stringify({ userid: "1", title: what, location: where, start: start_time, end: end_time }),
      success: function(data, status, obj, response) {
        alert( "Returned with: " + data + " and " + status + " and " + obj);
      },
      error: function(msg) {
        alert("Something went wrong: " + msg.statusText);
      }
    });
  }

  function welcome(){
    var url = "http://localhost:3000/user/cur.json";
    $.getJSON(url, function(data){
      name = data.email;
      var welcome2 = $('#welcome_placeholder').clone();
      welcome2.find('span.cur_user_name').text(name);
      $('#welcome').replaceWith(welcome2.html());
    });
  }

  function get_activities() {
    $.ajax({
      type:"GET",
      url:"http://localhost:3000/activities.json",
      success: function(data) {
        $.each( data, function(i) {
          var id = data[i].userid;
          if (id <= 0){
            id = 1;
          }
          var url = "http://localhost:3000/user/" + id +".json";
          $.getJSON(url, function(data2){
            name = data2.email;
            display_activity(data[i].title,name);
          });
        });
      }
    });
  }

  function display_activity(what, who){
    // create a newsfeed item with the values
    var newsItem = $('#news_item_placeholder').clone();
    // TODO: populate the new values with the json returned from
    // the server after a successful add
    newsItem.attr('id', 'newID');
    newsItem.find('img.news_user_icon').attr('id', 'newID');
    newsItem.find('span.news_user_name').text(who);
    newsItem.find('span.news_activity_name').text(what);
    $('#boredFeedBox').prepend(newsItem);
    newsItem.show();
  }

  function add_friend(){
    var email = $('#dialog-friend #email-field input').val();
    //TODO send email/notification to another person
    $.ajax({
      type:"POST",
      url:"http://localhost:3000/friends/new",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      processData: false, // we don't want jquery to urlencode the json we send
      data: JSON.stringify({ userid: "1", title: what, location: where, start: start_time, end: end_time }),
      success: function(data, status, obj) {
        alert( "Returned with: " + data + " and " + status + " and " + obj);
      },
      error: function() {
        alert("This address is not registered with us.");
      }
    });

  }

  function get_friends(){	
    $.ajax({
      type:"GET",
      url:"http://localhost:3000/friends.json",
      success: function(data) {
        $.each( data, function(i) {
          var id = data[i].userid;
          var url = "http://localhost:3000/user/" + id +".json";
          $.getJSON(url, function(data2){
            name = data2.email;
            display_friend(name);
          });

        });
      }
    });
  }

  function display_friend(name){
    var friend = $('#friends_placeholder').clone();
    friend.attr('id', 'newID');
    friend.find('img.friend_icon').attr('id','newID');
    friend.find('span.friend_name').text(name);
    $('#friends_list').prepend(friend);
    friend.show();
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
});

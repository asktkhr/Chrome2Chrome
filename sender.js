function enablePushUrl(){
  displayReceivers();
  var url = "";
　chrome.tabs.getSelected(null, function(tab) {
    url = tab.url;
  });
  $('div#pc_name').remove()
  $('#status_label').append('<span id=status></span>')
  $('#status').text(bg.pusher.connection.state);
  $("button#push").text('push')
  $("button#push").unbind('click')

  $("button#push").bind('click', function(event) {
    var receivers = [];
    $('input:checked').each(function(){
      receivers.push(this.value);
    });
    $('#status').text("sending...");
    var button = $("button#push");
    button.attr("disabled","disabled");
    $.post(
      "http://localhost:3000/websocket/send_url",
      //"http://push-server.herokuapp.com/websocket/send_url",
      {
        url: url,
        socket_id: bg.socketId,
        receivers: receivers 
      },
      function(data, status) {
        $('#status').text(bg.pusher.connection.state);
        button.removeAttr("disabled");
      },
      "text"
    );
  });
}

function displayReceivers(){
  $.get(
    "http://localhost:3000/websocket/receivers",
    //"http://push-server.herokuapp.com/websocket/receivers",
    {name: localStorage.registerName},
    function(data, status) {
      $('div#container').prepend(data);
    }
  );
}

function register(){
  $("div#container").html("<div id='pc_name'>pc name: <input id=pc_name type='text'></div>");
  $("#status_container").remove();
  $("button").text("register");
  $("button").bind('click',function(event){
    localStorage.registerName = $("input#pc_name").val();
    $.post(
      "http://localhost:3000/websocket/register",
      { name: localStorage.registerName },
      function(data, status) {
        if(data == 'success') enablePushUrl();
      },
      "text"
    );
  });
}

$(document).ready(
  function(){
    $.get(
      "http://localhost:3000/websocket/register_info",
      {name: localStorage.registerName},
      function(data, status) {
        if(data == null){
          register();
        }
        else {
          enablePushUrl();
        }
      }
    );
  }
);

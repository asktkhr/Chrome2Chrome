function enablePushUrl(){
  displayReceivers();
  var url = "";
　chrome.tabs.getSelected(null, function(tab) {
    url = tab.url;
  });
  $('div#pc_name').remove()
  $("#status_container").show();
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
      "http://localhost:3000/message/send_message",
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

  $("button#delete").show().bind('click', function(event){
    var data = {
      _method : "delete",
      name : localStorage.registerName
    }

    $.ajax({
      url: "http://localhost:3000/devises/delete",
      type: 'post',
      data: data
    })
    .success(function() {
      delete localStorage.registerName;
      location.reload();
    })
    .error(function() {
      alert('error');
    });
  });
}

function displayReceivers(){
  $.get(
    "http://localhost:3000/devices/receivers?format=json",
    {name: localStorage.registerName},
    function(data, status) {
      $('div#container').prepend(data);
    }
  );
}

function register(){
  $("div#container").html("<div id='pc_name'>pc name: <input id=pc_name type='text'></div>");
  $("#status_container").hide();
  $("button#delete").hide();
  $("button#push").unbind('click')
  $("button#push").text("register");
  $("button#push").bind('click',function(event){
    localStorage.registerName = $("input#pc_name").val();
    $.post(
      "http://localhost:3000/devices/register",
      { name: localStorage.registerName },
      function(data, status) {
        if(data == 'success') location.reload();
      },
      "text"
    );
  });
}

$(document).ready(
  function(){
    $.get(
      "http://localhost:3000/devices/register_info",
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

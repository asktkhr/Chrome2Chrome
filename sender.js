function enablePushUrl(){
  var url = "";
　chrome.tabs.getSelected(null, function(tab) {
    url = tab.url;
  });
  $('div#pc_name').remove()
  $('div#container').prepend('<div id=status></div>')
  $('div#status').text(bg.status);
  $("button#push").text('push')
  $("button#push").unbind('click')

  $("button#push").bind('click', function(event) {
    $('div#status').text("sending...");
    var button = $("button#push");
    button.attr("disabled","disabled");
    $.post(
      "http://localhost:3000/websocket/send_url",
      {
        url: url,
        socket_id: bg.socketId,
        receivers: [] 
      },
      function(data, status) {
        if(status == 'success'){
          $('div#status').text(bg.status);
        }
        else {
          $('div#status').text(bg.status);
        }
        button.removeAttr("disabled");
      },
      "text"
    );
  });
}


function register(){
  $("div#container").html("<div id='pc_name'>pc name: <input id=pc_name type='text'></div>");
  $("div#status").remove();
  $("button").text("register");
  $("button").bind('click',function(event){
    $.post(
      "http://localhost:3000/websocket/register",
      { name: $("input#pc_name").val() },
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

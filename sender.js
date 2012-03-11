$(document).ready(
  function(){
    var url = "";
  　chrome.tabs.getSelected(null, function(tab) {
      url = tab.url;
    });

    $('div#status').text(bg.status);

    $("button#push").bind('click', function(event) {
      $('div#status').text("seding...");
      var button = $("button#push");
      button.attr("disable","disable");
      $.ajax({
        url: "http://localhost:3000/websocket/send_url",
        type: "post",
        data: {
          url: url,
          socket_id: bg.socketId,
          receivers: [] 
        },
        success: function(data) {
          $('div#status').text(bg.status);
          button.attr("disable","");
        },
        error: function(xhr, error) {
          $('div#status').text(bg.status);
          button.attr("disable","");
        }
      });
    });
  }
);

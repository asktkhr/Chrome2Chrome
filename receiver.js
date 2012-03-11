function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        return regexp.test(s);
}

(function(){
  var channel = pusher.subscribe('channel_name');
  channel.bind('event_name', function(data) {
    if(isUrl(data)){
      chrome.tabs.create(
        {
          url: data,
          selected: true
        },
        function(tab) {
          
        }
      );
    }
  });
})();

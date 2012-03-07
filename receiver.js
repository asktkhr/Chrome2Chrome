function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        return regexp.test(s);
}

(function(){
  var pusher = new Pusher('app-key');
  var channel = pusher.subscribe('my_channel');
  channel.bind('my_event', function(data) {
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

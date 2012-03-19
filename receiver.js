function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        return regexp.test(s);
}

function isRecipient(receivers){
  console.log(receivers);
  var myName = localStorage.registerName;
  return receivers.indexOf(myName) != -1;
}

(function(){
  var channel = pusher.subscribe('chrome2chrome');
  channel.bind('open_url', function(data) {
    console.log(data);
    if(isUrl(data.url) && isRecipient(data.receivers)){
      chrome.tabs.create(
        {
          url: data.url,
          selected: true
        },
        function(tab) {
          
        }
      );
    }
  });
})();

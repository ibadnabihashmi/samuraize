setTimeout(function(){
  $(document).ready(function () {
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        $.ajax({
          method: 'post',
          url: 'http://localhost:3005/samuraize',
          dataType: 'json',
          data: {
            uri:document.location.href
          },
          success: function (res) {
            console.log(res);
          }
        });
      });
  });
}, 1000);

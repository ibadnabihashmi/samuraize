$(document).ready(function () {
  $('#samuraize').click(function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action:'GET_LOCATION'}, function(response) {
        $.ajax({
          method: 'post',
          url: 'http://localhost:3004/samuraize',
          dataType: 'json',
          data: {
            uri:response.location
          },
          success: function (res) {
            chrome.tabs.sendMessage(tabs[0].id,{
              action:'INIT_MODAL',
              summary: res.summary,
              title: res.title
            },function (response) {

            });
          }
        });
      });
    });
  });
});
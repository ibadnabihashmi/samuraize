$(document).ready(function () {
  $('#loader-cont').hide();
  $('#samuraize').click(function () {
    $('#loader-cont').show();
    $('#samuraize').hide();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action:'GET_LOCATION'}, function(response) {
        $.ajax({
          method: 'post',
          url: 'http://107.170.243.227:3004/samuraize',
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
              $('#loader-cont').hide();
              $('#samuraize').show();
            });
          }
        });
      });
    });
  });
});
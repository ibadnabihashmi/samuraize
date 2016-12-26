setTimeout(function(){
  $(document).ready(function () {
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        switch(request.action){
          case 'GET_LOCATION':
            sendResponse({location: document.location.href});
            break;
          case 'INIT_MODAL':
            var css = '.modal { display: none; /* Hidden by default */ position: fixed; /* Stay in place */ z-index: 1; /* Sit on top */ left: 0; top: 0; width: 100%; /* Full width */ height: 100%; /* Full height */ overflow: auto; /* Enable scroll if needed */ background-color: rgb(0,0,0); /* Fallback color */ background-color: rgba(0,0,0,0.4); /* Black w/ opacity */ -webkit-animation-name: fadeIn; /* Fade in the background */ -webkit-animation-duration: 0.4s; animation-name: fadeIn; animation-duration: 0.4s } /* Modal Content */ .modal-content { position: fixed; bottom: 0; background-color: #fefefe; width: 100%; -webkit-animation-name: slideIn; -webkit-animation-duration: 0.4s; animation-name: slideIn; animation-duration: 0.4s } /* The Close Button */ .close { color: white; float: right; font-size: 28px; font-weight: bold; } .close:hover, .close:focus { color: #000; text-decoration: none; cursor: pointer; } .modal-header { padding: 2px 16px; background-color: #5cb85c; color: white; } .modal-body {padding: 2px 16px;} .modal-footer { padding: 2px 16px; background-color: #5cb85c; color: white; } /* Add Animation */ @-webkit-keyframes slideIn { from {bottom: -300px; opacity: 0} to {bottom: 0; opacity: 1} } @keyframes slideIn { from {bottom: -300px; opacity: 0} to {bottom: 0; opacity: 1} } @-webkit-keyframes fadeIn { from {opacity: 0} to {opacity: 1} } @keyframes fadeIn { from {opacity: 0} to {opacity: 1} }';
            style = document.createElement('style');

            if (style.styleSheet) {
              style.styleSheet.cssText = css;
            } else {
              style.appendChild(document.createTextNode(css));
            }
            var summary = request.summary.split('\n');
            var _summary = '';
            summary.forEach(function (sum) {
              _summary += '<p>'+sum+'</p>';
            });
            var e = document.createElement('div');
            e.innerHTML = '<div id="myModal" class="modal"> ' +
                '<div class="modal-content"> ' +
                '<div class="modal-header">' +
                '<span class="close">&times;</span> ' +
                '<h2>'+request.title+'</h2> ' +
                '</div> ' +
                '<div class="modal-body"> ' +
                '<p>'+_summary +'</p>'+
                '</div> ' +
                '</div> ' +
                '</div>';

            document.getElementsByTagName('head')[0].appendChild(style);
            document.getElementsByTagName('body')[0].appendChild(e);
            var myModal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];
            span.onclick = function() {
              myModal.style.display = "none";
            };
            window.onclick = function(event) {
              if (event.target == myModal) {
                myModal.style.display = "none";
              }
            };
            myModal.style.display = "block";
            break;
        }
      });
  });
}, 1000);

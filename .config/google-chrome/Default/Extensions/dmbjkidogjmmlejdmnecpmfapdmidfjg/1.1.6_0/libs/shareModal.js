function ShareModal(){let e=+localStorage.getItem("vk_downloaded_count")||0;e++,localStorage.setItem("vk_downloaded_count",String(e)),4!==e&&27!==e&&47!==e&&100!==e||chrome.storage.local.get(["vk_openTimes","vk_rateClicked"],(function(e){let{vk_openTimes:o,vk_rateClicked:n}=e;o?o+=1:o=1,chrome.storage.local.set({vk_openTimes:o}),n||o%1!=0||document.getElementById("xxdialog-rate")||(document.querySelector("body").insertAdjacentHTML("beforeend",t),function(){for(var e=document.querySelectorAll("[i18n]"),t=0;t<e.length;++t)e[t].textContent=chrome.i18n.getMessage(e[t].getAttribute("i18n"));e=document.querySelectorAll("[i18n-alt]");for(t=0;t<e.length;++t){var o=chrome.i18n.getMessage(e[t].getAttribute("i18n-alt"));e[t].alt=o,e[t].title=o}}(),document.querySelector("#xxdialog-yes").addEventListener("click",(function(){chrome.storage.local.set({vk_rateClicked:!0});document.getElementById("xxdialog-rate").remove(),window.open("https://chrome.google.com/webstore/detail/web-music-downloader/dmbjkidogjmmlejdmnecpmfapdmidfjg/reviews","_blank").focus()})),document.querySelector("#xxdialog-no").addEventListener("click",(function(){document.getElementById("xxdialog-rate").remove()})))}));const t='<div id="xxdialog-rate" class="xxflex-container">    <div class="xxdialog">       <h2 class="xxdialog-header" i18n="rateDialogTitle"></h2>         <div class="xxdialog-content">            <p i18n="rateDialogDesc"></p>    </div>        <div class="xxdialog-button">            <a href="#" id="xxdialog-yes" class="xxcancel" i18n="rateDialogYes"></a>        <a href="#" id="xxdialog-no" i18n="rateDialogNo"></a>\n      </div>\n    </div>\n  </div>\n'}document.addEventListener("DOMContentLoaded",(function(e){ShareModal()}));
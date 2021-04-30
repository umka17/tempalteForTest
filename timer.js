function countdown( elementName, minutes, seconds ) {
  var element, endTime, hours, mins, msLeft, time;

  function twoDigits( n )
  {
    return (n <= 9 ? "0" + n : n);
  }

  function updateTimer()
  {
    msLeft = endTime - (+new Date);
    if ( msLeft < 1000 ) {
      element.innerHTML = "Time is up!";
    } else {
      time = new Date( msLeft );
      hours = time.getUTCHours();
      mins = time.getUTCMinutes();
      element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
      setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
    }
  }

  element = document.getElementById( elementName );
  endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
  updateTimer();
}

countdown( "ten-countdown", 180, 0 );

const resultBtn = document.querySelector('#result-btn');
const iframe = document.querySelector('#frame')
const editor = document.querySelector('.editor')

const myCodeMirror = CodeMirror(editor, {
  theme: 'darcula',
  lineNumbers: true,
  autoCloseTags: true,
  keyMap: "sublime",
  scrollbarStyle: "overlay",
  autoCloseBrackets: true,
  extraKeys: {
    "F11": function(cm) {
      cm.setOption("fullScreen", !cm.getOption("fullScreen"));
    },
    "Esc": function(cm) {
      if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
    },
    "F1": function (cm) {
      cm.setValue(
        `<!doctype html>
<html lang="en">
<head>
   <style>
   
    </style>
	<title>Document</title>
</head>
<body>

</body>
</html>`)
    }
  }
});
function showResult(iframe, editorRoot) {
  const iframePage = iframe.contentDocument ||  iframe.contentWindow.document;
  iframePage.open();
  iframePage.write(editorRoot.getValue());
  iframePage.close();
}


resultBtn.addEventListener('click', () =>  {
  showResult(iframe, myCodeMirror)
})


let delay;
myCodeMirror.on("change", function() {
  clearTimeout(delay);
  delay = setTimeout(() => {
      showResult(iframe, myCodeMirror)
  }, 500);
});


self.onmessage = function(event) {
  importScripts(event.data.hugo.Site.BaseURL + 'js/highlight.pack.js');
  var result = [].map.call(event.data.codeblocks, function (code) {
      return self.hljs.highlightAuto(code);
  });
  postMessage(result);
}
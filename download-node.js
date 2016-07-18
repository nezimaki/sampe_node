
//URLにあるファイルをsavepathふぉるだにダウンロードする


download(
    "http://www.aozora.gr.jp/index_pages/persion81.html",
    "miyazawakenj.html",
    function(){ console.log("ok, kenji.");}
);

download(
    "http://www.aozora.gr.jp/index_pages/persion148.html",
    "natumesoseke.html",
    function(){ console.log("ok, soseki.");}
);


function download(url, savepath, callback){
  var http = require('http');
  var fs = require('fs');
  var outfile = fs.createWriteStream(savepath);
  var req = http.get(url, function(res) {
    res.pipe(outfile);
    res.on('end', function() {
      outfile.close();
      callback();
    });
  });
}

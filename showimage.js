
//モジュールの読み込み
var client = require('cheerio-httpcli');
var URL = require('url');
var fs = require('fs');
var request = require('request');

var savedir = __dirname + "/img";
if(!fs.existsSync(savedir)){
  fs.mkdirSync(savedir);
}

//ダウンロード
var url = 'https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%8C';
var param = {};

client.fetch(url,param,function(err, $, res){
  if(err){
    console.log("error："+err);
    return;
  }

  $("img").each(function(idx){
    var src = $(this).attr('src');
    src = URL.resolve(url,src);
    var fname = URL.parse(src).pathname;
    fname = savedir + "/" + fname.replace(/[^a-zA-Z0-0\.]+/g,'_');
    request(src).pipe(fs.createWriteStream(fname));
    console.log(src);
  });

});

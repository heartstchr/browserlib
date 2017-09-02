'use strict';
var exec = require('exec');
var baseUrl= ' https://api.browserstack.com/4';

module.exports = {
  getBrowsers:getBrowsers
}

function getBrowsers(usr,pass,flat,all,callback){
  var baseAuth= '"'+usr+':'+pass +'"';
  if(!!flat){
    var cmd ='curl -u '+baseAuth+ baseUrl +'/browsers?flat='+flat;
  }
  if(!!all){
    var cmd ='curl -u '+baseAuth+ baseUrl +'/browsers?flat='+flat;
  }
  console.log(cmd);
  exec(cmd, function(err, out, code) {
    if (err instanceof Error)
      throw err;
    try{
      return callback(null,JSON.parse(out));
    }
    catch (e){
      return callback(out,null);
    }
  });
};

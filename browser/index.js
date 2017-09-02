'use strict';
var exec = require('exec');
var baseUrl= ' https://api.browserstack.com/4';

module.exports = {
  getBrowsers:getBrowsers
}

function getBrowsers(usr,pass,option,callback){
  if(!option){
    return callback('Option not Defined',null);
  }
  var query='';
  var total = Object.keys(option).length;
  Object.keys(option).forEach(function (ele,index) {
    if(index !== total-1){
      query += ele + '='+ option[ele] +'&&'
    }else{
      query += ele + '='+ option[ele]
    }
  });
  var baseAuth= '"'+usr+':'+pass +'"';
  var cmd ='curl -u '+baseAuth+ baseUrl +'/browsers?'+query;
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

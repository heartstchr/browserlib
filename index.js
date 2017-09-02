'use strict';

var brow = require ('./browser/index.js');
var work = require ('./workers/index.js');
var http = require('http');
// var curl = require('curl-cmd');
var exec = require('exec');

module.exports = {
    getauthentication:getauthentication,
    browser:browser,
    workers: workers
};

function getauthentication(usr,pass,fn) {
    if(!usr){
       return fn("Define Username",null) ;
    }
    if(!pass){
        return fn("Define Access Key",null) ;
    }
    var baseAuth= '"'+usr+':'+pass +'"';
    var baseUrl= ' https://api.browserstack.com/4';
    var cmd ='curl -u '+baseAuth+ baseUrl;
    exec(cmd, function(err, out, code) {
        if (err instanceof Error)
            throw err;
        try{
            return fn(null,JSON.parse(out));
        }
        catch (e){
            return fn(out,null);
        }
    });
}

function browser(usr,pass,fn) {
    getauthentication(usr,pass,function (err,res) {
        if(err){
            return fn(err,null);
        }else{
            // console.log(typeof res);
            if(typeof res == 'object'){
                brow.getBrowsers(res);
            }else{
                return fn('Internal server Error',null);
            }

        }
    });
}
function workers(fn){
    getauthentication(usr,pass,function (err,res) {
        if(err){
            return fn(err,null);
        }else{
            if(typeof res == 'object'){
                return work.getWorkers();
            }else{
                return fn('Internal server Error',null);
            }
        }
    });
}

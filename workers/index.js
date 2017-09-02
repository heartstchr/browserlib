'use strict';
var exec = require('exec');
var baseUrl= ' https://api.browserstack.com/4';

module.exports = {
    getWorkers:getWorkers
}

function getWorkers(usr,pass,callback){
    var baseAuth= '"'+usr+':'+pass +'"';
    var cmd ='curl -X POST -u '+baseAuth+ baseUrl +'/workers';
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

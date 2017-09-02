'use strict';
var exec = require('exec');
var baseUrl= ' https://api.browserstack.com/4';

module.exports = {
    getWorkers:getWorkers
}

function getWorkers(usr,pass,option,callback){
    console.log(option);
    if(!option){
        return callback('Option not Defined',null);
    }
    if(option.os ==='undefined'){return callback("Os is not defined",null)}
    if(option.os_version==='undefined'){return callback("Os Version is not defined",null)}
    if(option.browser==='undefined'){return callback("Browser is not defined",null)}
    if(option.device==='undefined'){return callback("Device is not defined",null)}
    if(option.browser_version==='undefined'){return callback("Browser Version is not defined",null)}
    var query='';
    var total = Object.keys(option).length;
    Object.keys(option).forEach(function (ele,index) {
        if(index !== total-1){
            query += ele + '='+ option[ele] +'&'
        }else{
            query += ele + '='+ option[ele]
        }
    });
    console.log(query);
    var baseAuth= '"'+usr+':'+pass +'"';
    var cmd ='curl -X POST -u '+baseAuth+ ' -sS '+baseUrl +'/workers?'+query;
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

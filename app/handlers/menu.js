var baseURL = '/menu';
var path = require('path');

var handlerWebRequest = require(path.join(__dirname, '..', 'provider', 'lib', 'handlerWebRequest'));


var doubleQuotesRegex = /"/g;


require(path.join(__dirname,'..','provider','lib','atajo.fork')).init({

    req: function(obj, cb, dbi, api) {
        console.log("object for getusers : "+obj.method);
        obj.method = obj.method ? obj.method : '';
        switch (obj.method) {
            
            case 'getMenu':
                console.log("->Uri get menu: "+baseURL);
                
                var heads = {
                    authorization: "Bearer "+obj.headers.replace(doubleQuotesRegex,'')
                };
                
                console.log("Getting menu from api");            
                
                handlerWebRequest.get(baseURL, null, heads).then(function(data) {
                    obj.RESPONSE = data;
                    cb(obj);
                });
                break;
            default:
                _log.e("unknown handler method " + obj.method);
                obj.RESPONSE = { error: true, message: 'no such method' };
                cb(obj);
                break;
        }

    }
});
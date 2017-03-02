var baseURL = '/users';
var path = require('path');

var handlerWebRequest = require(path.join(__dirname, '..', 'provider', 'lib', 'handlerWebRequest'));


var doubleQuotesRegex = /"/g;


require(path.join(__dirname,'..','provider','lib','atajo.fork')).init({

    req: function(obj, cb, dbi, api) {
    
        obj.method = obj.method ? obj.method : '';
        switch (obj.method) {
            
            case 'getProfile':
                
                var heads = {
                    //authorization: "Bearer "+obj.headers.replace(doubleQuotesRegex,'')
                    authorization: "Bearer " +obj.headers
                };
                console.log("profile.js token: "+JSON.stringify(heads));

                handlerWebRequest.get(baseURL+"/"+obj.params, null, heads).then(function(data) {
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
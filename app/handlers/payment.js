var baseURL = '/credits';
var path = require('path');

var handlerWebRequest = require(path.join(__dirname, '..', 'provider', 'lib', 'handlerWebRequest'));


var doubleQuotesRegex = /"/g;


require(path.join(__dirname,'..','provider','lib','atajo.fork')).init({

    req: function(obj, cb, dbi, api) {
    
        obj.method = obj.method ? obj.method : '';
        
        switch (obj.method) {
            
            case 'performPayment':
                console.log("->Uri : "+baseURL +"/"+obj.params);
                
                var heads = {
                    authorization: "Bearer "+obj.headers.replace(doubleQuotesRegex,'')
                };
                
                console.log("------------------------- ");
                console.log("Uri : "+baseURL+"/"+obj.params);
                console.log("Body :"+JSON.stringify(obj.data));
                console.log("Auth header "+JSON.stringify(heads));            
                
                handlerWebRequest.post(baseURL+"/"+obj.params, obj.data, null, heads).then(function(data) {
                    obj.RESPONSE = data;
                    cb(obj);
                });
                break;
            case 'getBeanBalance':
                
                var heads = {
                    authorization: "Bearer "+obj.headers.replace(doubleQuotesRegex,'')
                };
                var filter = "?sender="+obj.params;
                console.log("------------------------- ");
                console.log("BeanBalance Uri : "+baseURL+"/"+filter);  
                
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
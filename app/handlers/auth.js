var baseURL = '/login';
var path = require('path');

var handlerWebRequest = require(path.join(__dirname, '..', 'provider', 'lib', 'handlerWebRequest'));
//console.log("Dir Auth.js : "+__dirname);
require(path.join(__dirname,'..','provider','lib','atajo.fork')).init({


    req: function(obj, cb, dbi, api) {
       
        var username = "";
        username = obj.credentials.uname;
        var password = "";
        password = obj.credentials.pword;
        console.log('->Username : '+username);
        console.log('->Password : '+password);

        
        var stringToEncode = username+":"+password;
        // var covertBase64 = Base64.encodeBase64("Test".get)
        // var encodedString = btoa(stringToEncode);
        var encodedString = (new Buffer(stringToEncode).toString('base64'));
        console.log("->Base64 Conversion : "+encodedString);

        /*
        var heads = {
            authorization: "Basic "+encodedString
        };*/

        var heads = {
            authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InNvaGFpbC5tYWhvbWVkQGJyaXRlaG91c2UuY28uemEifQ.5U9ZLYFYfgN1lPzqDEuOU4LT0LqLmHCK9mKyXrDHhBk"
        };

        // var headBasicAuth = "authorization: 'Basic c29oYWlsLm1haG9tZWRAYnJpdGVob3VzZS5jby56YTpzb2hhaWwubWFob21lZEBicml0ZWhvdXNlLmNvLnph'";
        
        //-->for promiseAuth
        console.log("->header : "+heads.authorization);
        handlerWebRequest.post(baseURL, null, null, heads).then(function(data) {
            if(data.error)
            {
                obj.RESPONSE = false;
            }
            else
            {
                obj.RESPONSE = data;
            }
            obj.message = data.message;
            console.log("OBJ : "+obj.RESPONSE);
            console.log("Data body: "+data);
            cb(obj);
        });
       
    }

});
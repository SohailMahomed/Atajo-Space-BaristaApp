module.factory('LoginServices', ['HandlerAPI', function(HandlerAPI) {
    //My Basic Auth cred { headers: "Authorization: Basic c29oYWlsLm1haG9tZWRAYnJpdGVob3VzZS5jby56YTpzb2hhaWwubWFob21lZEBicml0ZWhvdXNlLmNvLnph"}
        return {
        login: function(credentials) {
            console.log('Creds :    '+credentials.uname);
            return HandlerAPI.promiseAuth(credentials);
        }
    }
}]);
;;

module.factory('ProfileService', ['HandlerAPI', '$rootScope', function(HandlerAPI, $rootScope) {
        var handlerName = "profile";
        return {
            getProfile: function(userEmail, userToken) {
               return HandlerAPI.promiseRequest(handlerName, 'getProfile', {params : userEmail, headers : userToken });
            }
        }

}]);
;;


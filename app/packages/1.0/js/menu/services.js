module.factory('MenuService', ['HandlerAPI', '$rootScope', function(HandlerAPI, $rootScope) {
        var handlerName = "menu";
        return {
            getMenu: function() {
               return HandlerAPI.promiseRequest(handlerName, 'getMenu', {headers : $rootScope.tokenHeader() });
            }
        }

}]);
;;
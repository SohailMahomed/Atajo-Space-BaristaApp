module.factory('PaymentService', ['HandlerAPI', '$rootScope', function(HandlerAPI, $rootScope) {
        var handlerName = "payment";
        return {
            performPayment: function(receiver, transferData) {
               return HandlerAPI.promiseRequest(handlerName, 'performPayment', {params : receiver, data: transferData, headers : $rootScope.tokenHeader() });
            },
            getBeanBalance: function(account) {
               return HandlerAPI.promiseRequest(handlerName, 'getBeanBalance', {params : account, headers : $rootScope.tokenHeader() });
            }
        }

}]);
;;
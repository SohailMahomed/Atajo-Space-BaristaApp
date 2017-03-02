module.factory('HandlerAPI', ['$q', function($q) {
    return {
        promiseRequest: function(name, method, handlerData) {
            //complete data obj
            handlerData = handlerData || {};
            handlerData.method = method;
            //----------------
            var deferred = $q.defer();
            atajo.api.get(name, handlerData, function(data) {
                if (!data.error) {
                    deferred.resolve(data);
                } else {
                    deferred.reject(data);
                }
            });
            return deferred.promise;
        },

        promiseAuth: function(credentials) {
            var deferred = $q.defer();
            atajo.api.auth(credentials, function(valid, data) {
                atajo.log.d("AUTH: " + valid + " / " + JSON.stringify(data));
                if (valid) {
                    deferred.resolve({ error: false, data: data });
                } else {
                    deferred.reject({ error: true, message: data.message });
                }
            });
            return deferred.promise;
        }
    };
}]);;;
module.controller('TabsCtrl', ['$log', '$q', '$rootScope', '$scope', '$state',
function($log, $q, $rootScope, $scope, $state) {
    var ctrl = this;

    $scope.logout = function() {

        $rootScope.clearProfile();
        $scope.isLoading = false; 
        $state.go('login');
        console.log('Logged out');
    };

    ctrl.init = function() {

    };

    //------INIT--------
    ctrl.init();
}]);;;
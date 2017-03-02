var module = angular.module('AtajoApp', [
    'atajoui',
    'ngStorage',
    'ngMessages'
]);

module.run(['$atajoUiPlatform', function($atajoUiPlatform) {
    $atajoUiPlatform.ready(function() {
        atajo.log.d("ATAJO-UI INIT: platform " + atajoui.Platform.platform());

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        if (window.StatusBar) { // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
            if (atajoui.Platform.isAndroid()) {
                StatusBar.backgroundColorByHexString("#455A64");
            }
            else if (atajoui.Platform.isIOS()) {
                StatusBar.overlaysWebView(true);
            }
        }
        
    });
}]);

module.config(['$atajoUiConfigProvider', function($atajoUiConfigProvider) {
    // Remove back button text completely
    $atajoUiConfigProvider.backButton.previousTitleText(false).text('');
}]);

module.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  
  
    $urlRouterProvider.otherwise("/login");

  $stateProvider
        .state('login', {
            url: '/login',
            controller: 'LoginCtrl',
            templateUrl: 'login.html'
        }).state('tab', {
            url: '/tab',
            controller: 'TabsCtrl',
            abstract: true,
            templateUrl: atajoui.Platform.isIOS() ? 'tabs-ios.html' : 'tabs.html'
        }).state('tab.home',{
            url: '/home',
            views: {
                'tab-home':{
                    templateUrl: 'tab-home.html',
                    controller: 'HomeCtrl'
                }
            }
        }).state('tab.shoppingCart',{
            url: '/shoppingCart',
            views: {
                'tab-shoppingCart':{
                    templateUrl: 'tab-shoppingCart.html',
                    controller: 'ShoppingCartCtrl'
                }
            }
        }).state('tab.report',{
            url: '/report',
            views: {
                'tab-report':{
                    templateUrl: 'tab-report.html',
                    controller: 'ReportCtrl'
                }
            }
        }).state('tab.captureCredentials',{
            url: '/captureCredentials/:eventDetails',
            views: {
                'tab-shoppingCart':{
                    templateUrl: 'captureCredentials.html',
                    controller: 'CaptureCredentialsCtrl'
                }
            }
        }).state('tab.eventDetails',{
            url: '/eventDetails/:cartItems',
            views: {
                'tab-shoppingCart':{
                    templateUrl: 'eventDetails.html',
                    controller: 'EventDetailsCtrl'
                }
            }
        });     
    
}]);;;
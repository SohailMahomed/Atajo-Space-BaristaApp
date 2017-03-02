module.controller('LoginCtrl', ['$scope', '$rootScope', '$state', 'LoginServices', 'ProfileService','$localStorage',
function($scope, $rootScope, $state, LoginServices, ProfileService, $localStorage) {
        var ctrl = this;
        $scope.isLoading = false;

        $scope.login = {
            credentials:{}
        };

        $scope.listOfUsers = [];

        $scope.submitLogin = function() {
            $scope.isLoading = true;

            LoginServices.login($scope.login.credentials).then( function(data) {
                if(data.data.token == "\"Unauthenticated\"") 
                {
                    $scope.isLoading = false;
                    console.log("failed getting token");
                    $state.go('login');     
                    $rootScope.alertTitle("Login Error","There was a problem logging in, please check your username and password!");             
                }
                else
                {
                     var userToken = data.data.token.replace(/"/g, '');
                     //var regExpression = /\r?\n|\r/g;            
                     //var checkTokenAuth = userToken.replace(regExpression,'');
                     // $scope.saveToken(userToken);
                      
                     console.log("userToken : "+userToken);
                     console.log("useremail : "+$scope.login.credentials.uname);
                     
                     ProfileService.getProfile($scope.login.credentials.uname, userToken).then( function(data){
                           
                           console.log("get profile from service:" +JSON.stringify(data));
                           console.log("get profile from service2:" +data);
                           if(data == "\"Unauthenticated\"") //if Unauthenticated and profile Not found wont continue 
                           {  
                               $scope.isLoading = false;
                               console.log("failed getting profile");
                               $state.go('login');
                           }
                           else if(data == "\"Not found\"")
                           {                    
                               $scope.isLoading = false;
                               console.log("failed getting profile");
                               $state.go('login');
                           }
                           else
                           { 
                               console.log("user role : "+data.roles);
                               if(data.roles.find(x => x == "*"))//|| (data.roles.indexOf("Barista") > 0  || data.roles.indexOf("barista") >0 ) )
                               {
                                    console.log("get profile before save:" +data.name + "  "+ data.surname);
                                    ctrl.onSuccessfullLogin(userToken, data);
                               } 
                               else if(data.roles.find(x => x == "Barista") || data.roles.find(x => x == "barista"))
                               {
                                    console.log("get profile before save:" +data.name + "  "+ data.surname);
                                    ctrl.onSuccessfullLogin(userToken, data);
                               } 
                               else 
                               {
                                    $rootScope.alertTitleMessage("Login Error","Unauthorized credentials");
                               }                                       
                           }
                       }, function(err) {
                           console.log("error getting profile");
                           console.log(err);
                           $scope.isLoading = false;
                       }); 
                }              
            }, function(err) {
                console.log("not login ");
                console.log(err);
                $scope.isLoading = false;
            });

        };

        ctrl.onSuccessfullLogin = function(userToken,userProfile) {
             if(userProfile == "Unauthenticated")
             {
                $rootScope.alertTitleMessage("Login Error","There was a problem logging in, please check your username and password!");
             }
             else
             {
                console.log("before saving token: "+userProfile); 
                $rootScope.saveToken(userToken); 
                $rootScope.saveProfile(userProfile);
                //ctrl.getAllUsers();
                $state.go('tab.home');                
             }
        };

}]);
;;
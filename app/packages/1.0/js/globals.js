module.run(['$rootScope', '$localStorage', '$log', '$q',
    function($rootScope, $localStorage, $log, $q) {

        //on login
        $rootScope.authBasic = function(creds) {
            return { "Authorization ": "Basic "+ creds};
        };

        $rootScope.saveProfile = function(profile) {
            $localStorage.profile = profile;
            //console.log("Profile saved : "+JSON.stringify(profile));           
        };

        $rootScope.saveListOfUsers = function(listOfUsers) {
            $localStorage.listOfUsers = listOfUsers;
        };

        $rootScope.saveMenuList = function(menuList) {
            $localStorage.menuList = menuList;
        };

        $rootScope.getMenuList = function() {
            return $localStorage.menuList;
        };

        $rootScope.saveToken = function(token) {
            $localStorage.token = token;
            $localStorage.isLoggedIn = true;
            console.log("Token saved local storage : "+$localStorage.token);
        };

        $rootScope.getList = function() {
            return $localStorage.listOfUsers;
        };

        $rootScope.tokenHeader = function() {
            return $localStorage.token;
        };
        
        $rootScope.clearCart = function() {
            delete $localStorage.cart;
            delete $localStorage.amount;
            delete $localStorage.numberItem;
        };

        $rootScope.getCartDetails = function() {
            if($localStorage.cart)
            {
                return $localStorage.cart;
            }
            else
            {
                return 0;
            }
        };

        $rootScope.saveCart = function(cartDetails) {
            delete $localStorage.cart;
            $localStorage.cart = cartDetails;
        };

        $rootScope.saveSummary = function(amt,num) {
            delete $localStorage.amount;
            delete $localStorage.numberItem;

            $localStorage.amount = amt;
            $localStorage.numberItem = num;
            console.log("saved summary Items "+num+" , Total : "+amt);
        };

        $rootScope.getSummaryAmount = function() {
            if($localStorage.amount)
            {
                return $localStorage.amount;
            }
            else{
                return 0;
            }
        };

        $rootScope.getSummaryItem = function() {
            if($localStorage.numberItem)
            {
                return $localStorage.numberItem;
            }
            else{
                return 0;
            }
        };

        $rootScope.getDivisionList = function(){
            $localStorage.divisionList = [
                {'name':'Test', 'account':'TestAccount'},
                {'name':'Test2', 'account':'TestAccount2'},
                {'name':'Test3', 'account':'TestAccount3'}
                ];
            return $localStorage.divisionList;
        };

        $rootScope.isLoggedIn = function() {
            return $localStorage.isLoggedIn && $localStorage.profile; //extra redundant checks to help with update
        };

        //on logout
        $rootScope.clearProfile = function() {
            delete $localStorage.profile;
            delete $localStorage.token;
            console.log("Profile and Token deleted");
            $localStorage.isLoggedIn = false;
        };

        $rootScope.getUserFullName = function() {
            if ($localStorage.profile) {
                return $localStorage.profile.firstName + " " + ($localStorage.profile.lastName ? $localStorage.profile.lastName : '');
            } else {
                return "";
            }
        };

        $rootScope.getProfile = function() {
            return $localStorage.profile;
        };

        $rootScope.getProfileId = function() {
            if ($localStorage.profile) {
                return $localStorage.profile._id;
            } else {
                return "";
            }
        };

        $rootScope.getUsername = function() {
            if ($localStorage.profile) {
                return $localStorage.profile.email;
            } else {
                return "";
            }
        };


        $rootScope.getRole = function() {
            if ($localStorage.profile) {
                return $localStorage.profile.role;
            } else {
                return "user";
            }
        };

        //--------------------------------------------------------+
        //                     START-UP LOADS                     |
        //--------------------------------------------------------+


    }
]);

//helpers
module.run(['$rootScope', '$atajoUiPopup', '$atajoUiModal', '$sce', function($rootScope, $atajoUiPopup, $atajoUiModal, $sce) {

    //zooming constants
    $rootScope.maxImageZoom = 5;
    $rootScope.minImageZoom = 1;

    $rootScope.alertTitleMessage = function(titleText, message) {
        var alertPopup = $atajoUiPopup.alert({
            title: titleText,
            template: message,
            okType: 'button-royal'
        });
        alertPopup.then(function(res) {
            //do nothing
        });
    };


    $rootScope.alertTitle = function(titleText) {
        var alertPopup = $atajoUiPopup.alert({
            title: titleText,
            okType: 'button-royal'
        });
        alertPopup.then(function(res) {
            //do nothing
        });
    };

    $rootScope.confirmPopup = function(titleText, message, opts) {
        var opts = opts || {}; //optional extra params

        opts.title = titleText;
        opts.template = message;
        opts.okType = opts.okType || 'button-royal';
        opts.cancelType = opts.cancelType || 'button-royal';
             
        return $atajoUiPopup.confirm(opts);
    };

    $rootScope.customPopup = function(titleText, message, template, opts) {
        var opts = opts || {}; //optional extra params

        opts.title = titleText;
        opts.subTitle = message;
        opts.template = template;

        return $atajoUiPopup.show(opts);
    };

    $rootScope.createModal = function(templateUrl, scope) {
        return $atajoUiModal.fromTemplateUrl(templateUrl, {
            scope: scope,
            animation: 'slide-in-up'
        });
    };

    $rootScope.getAddIcon = function() {
        if (atajoui.Platform.isAndroid())
            return 'ion-android-add';
        else if (atajoui.Platform.isIOS())
            return 'ion-ios-plus-empty';
        else
            return 'ion-plus';
    };

    $rootScope.getCheckIcon = function() {
        if (atajoui.Platform.isAndroid())
            return 'ion-android-done';
        else if (atajoui.Platform.isIOS())
            return 'ion-ios-checkmark-empty';
        else
            return 'ion-checkmark';
    };

    $rootScope.getCancelIcon = function() {
        if (atajoui.Platform.isAndroid())
            return 'ion-android-close';
        else if (atajoui.Platform.isIOS())
            return 'ion-ios-close-empty';
        else
            return 'ion-close';
    };

    $rootScope.getPersonIcon = function() {
        if (atajoui.Platform.isAndroid())
            return 'ion-android-person';
        else if (atajoui.Platform.isIOS())
            return 'ion-ios-person';
        else
            return 'ion-person';
    };

    $rootScope.getEditIcon = function() {
        if (atajoui.Platform.isAndroid())
            return 'ion-android-create';
        else if (atajoui.Platform.isIOS())
            return 'ion-ios-compose-outline';
        else
            return 'ion-edit';
    };

    $rootScope.getSubmitIcon = function() {
        if (atajoui.Platform.isAndroid())
            return 'ion-android-send';
        else if (atajoui.Platform.isIOS())
            return 'ion-ios-paperplane-outline';
        else
            return 'ion-android-send';
    };

}]);

;;
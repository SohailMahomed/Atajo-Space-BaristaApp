module.controller('HomeCtrl', [
    '$log', '$q', '$rootScope', '$scope', '$state', 'MenuService', '$window',
    function($log, $q, $rootScope, $scope, $state, MenuService, $window) {
        var ctrl = this;
        $scope.isLoading = false;

        $rootScope.clearCart();

        $scope.menuList = [];
        $scope.menuListCoffee = [];
        $scope.menuListTea = [];

        $scope.doRefresh = function() {
             console.log("getting menu");
             MenuService.getMenu().then(function(data){
               if(!data)
               {
                   console.log("failed getting list for menu");
               }
               else
               {
                    console.log("Array of menu "+data[1].name);
                    //$scope.menuList = data;
                    $rootScope.saveMenuList(data);
                    //console.log("Array of menuList 1 : "+$scope.menuList[1].name);
               }
              }, function(err) {
                console.log("error getting list of menu");
                console.log(err);
            });
            
             $scope.$broadcast('scroll.refreshComplete');
        };
        
        ctrl.init = function() {
            console.log("getting menu");
            MenuService.getMenu().then(function(data){
               if(!data)
               {
                   console.log("failed getting list for menu");
               }
               else
               {
                    console.log("Array of menu "+data[1].name);
                    //$scope.menuList = data;
                    $rootScope.saveMenuList(data);
                    //console.log("Array of menuList 1 : "+$scope.menuList[1].name);
               }
              }, function(err) {
                console.log("error getting list of menu");
                console.log(err);
            });

        };

        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();
        //---------------------------------------

        $scope.menuList = $rootScope.getMenuList();
        console.log("Array of menuList : "+JSON.stringify($scope.menuList));

        for(var x = 0; x < $scope.menuList.length;x++)
        {
            if($scope.menuList[x].category == "Coffee")
            {
                $scope.menuListCoffee.push($scope.menuList[x]);
            }
            else if($scope.menuList[x].category == "Tea")
            {
                $scope.menuListTea.push($scope.menuList[x]);
            }
        }

        $scope.divShow= "div1";

        $scope.show = function(arg){
            $scope.divShow = arg;
        };

        $scope.myCart = [];
        $scope.amount = 0;
        $scope.numberItem = 0;
        

        $scope.addToCart = function(item)
        {
            var index = 0;
            $scope.myCart = [];
            //$scope.myCart = $rootScope.getCartDetails();
            var cart = $rootScope.getCartDetails();
            $scope.amount = $rootScope.getSummaryAmount();
            $scope.numberItem = $rootScope.getSummaryItem();
            console.log("item from addToCart "+JSON.stringify(item));
            $scope.myCart = cart;
            console.log("current cart "+JSON.stringify($scope.myCart));
            console.log("current cart length "+cart.length);
            if(cart.length == 1)
            {
                console.log("cart at 0 "+JSON.stringify(cart[0]));
            }
            if(cart.length > 0) //if cart not empty update qty of item or add item to list
            {
                //index = $scope.myCart.findIndex(function(x) {return x.name == item.name});
                //console.log("index of cartitem: "+index);
                console.log("index of cartitem before: "+index);
                
                //index = cart.findIndex(function(x) {return x.name == item.name});
                index = cart.findIndex(x => x.name == item.name);
                console.log("index of cartitem after: "+index);
                if(index == -1) //add item to cart if it does not exist
                {
                    console.log("adding "+item.name+" to cart");
                    $scope.myCart.push({
                        name:item.name,
                        price:item.price,
                        qty:1
                    });
                }
                else
                {
                    if($scope.myCart[index].name == item.name) //add qty to item in cart
                    {
                        console.log("adding qty to cart item "+item.name);
                        $scope.myCart[index].qty++;
                        console.log("logic after cartitem[x] "+JSON.stringify(item));
                    }
                }
            }
            else //if cart list empty add item to cart
            {
                console.log("adding "+item.name+" to cart empty list");
                $scope.myCart = [];
                 $scope.myCart.push({
                    name:item.name,
                    price:item.price,
                    qty:1
                 });
            }

            $scope.amount += item.price; 
            $scope.numberItem += 1;           
            $rootScope.saveCart($scope.myCart);
            $rootScope.saveSummary($scope.amount, $scope.numberItem);
            console.log("Cart Saved : "+JSON.stringify($scope.myCart));
        };

    }
]);

module.controller('ShoppingCartCtrl', [
    '$log', '$q', '$rootScope', '$scope', '$state', '$window',
    function($log, $q, $rootScope, $scope, $state, $window) {
        var ctrl = this;
        $scope.isLoading = false;
        
        $scope.cartDetails = [];
        $scope.cartDetails = $rootScope.getCartDetails();

        $scope.amount = 0;
        $scope.numberItem = 0;
        $scope.amount = $rootScope.getSummaryAmount();
        $scope.numberItem = $rootScope.getSummaryItem();

        $scope.toggleGuest = {text:"Enable payment for guest", checked:false};

        console.log("Received Cart info : "+JSON.stringify($scope.cartDetails));

        $scope.removeFromCart = function(item)
        {
            var index = $scope.cartDetails.findIndex(function(x) {return x.name == item.name});
            var tmpAmount;
            var tmpNumberItems;
            console.log("going to remove : "+$scope.cartDetails[index].name)+ " ";

            if($scope.cartDetails[index].name == item.name)
            {
                tmpAmount = $scope.cartDetails[index].price  * $scope.cartDetails[index].qty;
                tmpNumberItems = $scope.cartDetails[index].qty;
                $scope.cartDetails.splice(index, 1); 

                if($scope.amount > 0)
                {
                      $scope.amount -= tmpAmount;
                }
                if($scope.numberItem > 0)
                {
                      $scope.numberItem -= tmpNumberItems;
                }
                $rootScope.saveSummary($scope.amount, $scope.numberItem);
            }
      
            $rootScope.saveCart($scope.cartDetails);
            console.log("Cart after item removed : "+JSON.stringify($scope.cartDetails));
            
        };

        $scope.incrementQty = function(item)
        {
            var index = $scope.cartDetails.findIndex(function(x) {return x.name == item.name});
            var tmpAmount;
            var tmpNumberItems;
            
            if($scope.cartDetails[index].name == item.name)
            {
                $scope.cartDetails[index].qty++;
                tmpAmount = $scope.cartDetails[index].price;
                tmpNumberItems = 1;

                if($scope.amount >= 0)
                {
                      $scope.amount += tmpAmount;
                }
                if($scope.numberItem >= 0)
                {
                      $scope.numberItem += tmpNumberItems;
                }
                $rootScope.saveSummary($scope.amount, $scope.numberItem);

            }
      
            $rootScope.saveCart($scope.cartDetails);
            console.log("Cart after item qty increased : "+JSON.stringify($scope.cartDetails));
            
        };

        $scope.decrementQty = function(item)
        {
            var index = $scope.cartDetails.findIndex(function(x) {return x.name == item.name});
            var tmpAmount;
            var tmpNumberItems;
            
            if($scope.cartDetails[index].name == item.name)
            {
                $scope.cartDetails[index].qty--;
                tmpAmount = $scope.cartDetails[index].price;
                tmpNumberItems = 1;
                
                if(item.qty == 0)
                {
                    console.log("item qty decrease"+item.qty);
                    console.log("item qty decrease amount"+$scope.amount);
                    console.log("item qty decrease no. item"+$scope.numberItem);
                    $scope.cartDetails.splice(index, 1);
                    if($scope.amount > 0)
                    {
                        $scope.amount -= tmpAmount;
                    }
                    if($scope.numberItem > 0)
                    {
                         $scope.numberItem -= tmpNumberItems;
                    }
                    $rootScope.saveSummary($scope.amount, $scope.numberItem);
                }
                else
                {
                    if($scope.amount > 0)
                    {
                        $scope.amount -= tmpAmount;
                    }
                    if($scope.numberItem > 0)
                    {
                         $scope.numberItem -= tmpNumberItems;
                    }
                    $rootScope.saveSummary($scope.amount, $scope.numberItem);
                }
                
            }
      
            $rootScope.saveCart($scope.cartDetails);
            console.log("Cart after item qty decreased : "+JSON.stringify($scope.cartDetails));
           
        };
/*
        $scope.getQRCode = function() {
            var template = ''
        }
*/
        $scope.submitGuestPayment = function(items)
        {
            $state.go('tab.eventDetails', {'cartItems': items});
            //$state.go('tab.captureCredentials', {});
        };

        $scope.processQRCode = function(items){
            var myElement = angular.element( document.querySelector( '#qrcode' ) );
            myElement.empty();

            payString = '';

            if(items && items.length)
            {
                for(var x in items)
                {
                    payString += items[x].name + " : " +items[x].qty+ " , ";
                }

                console.log("PayString is "+payString);
            //    atajo.code.qrCode(JSON.stringify(items),"qrcode", {width:_screen.W/2,height:_screen.W/2});
                atajo.code.qrCode(payString,"qrcode", {width:_screen.W/2,height:_screen.W/2});
            }
            
        };

        ctrl.init = function() {

        $scope.cartDetails = [];
        $scope.cartDetails = $rootScope.getCartDetails();

        $scope.amount = 0;
        $scope.numberItem = 0;
        $scope.amount = $rootScope.getSummaryAmount();
        $scope.numberItem = $rootScope.getSummaryItem();

        console.log("Received Cart info from sc : "+JSON.stringify($scope.cartDetails));
        };

        $scope.doRefresh = function() {
             //$scope.cartDetails = [];
             $scope.cartDetails = $rootScope.getCartDetails();

             //$scope.amount = 0;
             //$scope.numberItem = 0;
             $scope.amount = $rootScope.getSummaryAmount();
             $scope.numberItem = $rootScope.getSummaryItem();

             console.log("Received Cart info from sc refresh: "+JSON.stringify($scope.cartDetails));

             var myElement = angular.element( document.querySelector( '#qrcode' ) );
             myElement.empty();
            
             $scope.$broadcast('scroll.refreshComplete');
        };
        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();
        //---------------------------------------
    }
]);

module.controller('ReportCtrl', [
    '$log', '$q', '$rootScope', '$scope', '$state',
    function($log, $q, $rootScope, $scope, $state) {
        var ctrl = this;
        $scope.isLoading = false;


        ctrl.init = function() {

        };

        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();
        //---------------------------------------
    }
]);

module.controller('CaptureCredentialsCtrl', [
    '$log', '$q', '$rootScope', '$scope', '$state', '$stateParams', 'PaymentService',
    function($log, $q, $rootScope, $scope, $state, $stateParams, PaymentService) {
        var ctrl = this;
        $scope.isLoading = false;

        $scope.account = {};
        
        $scope.items = $rootScope.getCartDetails();
        $scope.eventDetails = $stateParams.eventDetails;
        console.log("eventDetails from capture page : "+JSON.stringify($scope.eventDetails));
        $scope.accountBalance = 0;

        $scope.submitPayment = function(){
            

            PaymentService.getBeanBalance($scope.account.username).then(function(data){
                        $scope.accountBalance = data;
                        console.log("Account Balance : "+$scope.accountBalance);
                        //return $scope.accountBalance;
                        var total = 0;
                        var itemsString = "";
                        if($scope.accountBalance > 0)
                        {
                             console.log("cart items "+JSON.stringify($scope.items));
                             for(var x in $scope.items)
                             {
                                 console.log("item : "+$scope.items[x].name+" "+$scope.items[x].price+" "+$scope.items[x].qty);
                                 total += parseInt($scope.items[x].price) * parseInt($scope.items[x].qty);
                                 itemsString += $scope.items[x].name +" "+parseInt($scope.items[x].qty)+" ,";
                             }
                             console.log("Total : "+total);
                             console.log("items : "+itemsString);
                             if($scope.accountBalance >= total)
                             {
                                 console.log("can pay for guest now");
                                 var params = $scope.account.username +"/_fistbump";
                                 var transferData = {
                                     topic: $scope.eventDetails,
                                     message: itemsString,
                                     credits: total

                                 };
                                 PaymentService.performPayment(params, transferData).then(function(data)
                                 {
                                    if(data[0].result == true)
                                    {
                                        $rootScope.alertTitleMessage("Message", "You have successfully made the purchase");
                                    }
                                    else if(data[0].result == false)
                                    {
                                        console.log("failed guest payment");
                                    }
                                    else{
                                        $rootScope.alertTitleMessage("Message", JSON.stringify(data));
                                    }
                                 },function(err){
                                     $rootScope.alertTitleMessage("Guest Payment Error", err.message);
                                 });
                             }
                        }

                    }, function(err){
                        $rootScope.alertTitleMessage("Account Balance Error", err.message);
                    });

        };

        ctrl.init = function() {

        };

        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();
        //---------------------------------------
    }
]);

module.controller('EventDetailsCtrl', [
    '$log', '$q', '$rootScope', '$scope', '$state', '$stateParams', 'PaymentService',
    function($log, $q, $rootScope, $scope, $state, $stateParams, PaymentService) {
        var ctrl = this;
        $scope.isLoading = false;
        
        $scope.event = {};
        $scope.items = [];
        $scope.items = $rootScope.getCartDetails();
        console.log('catrItems from event page '+JSON.stringify($scope.items[0]));
        $scope.accountBalance = 0;

        /*$scope.submitGuestPayment = function(items)
        {
            $state.go('tab.captureCredentials', {});
        };*/
        
        $scope.validateEvent = function()
        {
            console.log('catrItems from event page '+JSON.stringify($scope.items));
            console.log('event name from event page '+$scope.event.name);
            console.log('event division from event page '+$scope.event.division);
            var errorMsg = "";
            var divisionList = $rootScope.getDivisionList();
            console.log('division list : '+JSON.stringify(divisionList));
            if($scope.event.name.length > 0)
            {
                console.log("event name is not empty");
                if($scope.event.division.length > 0)
                {
                    console.log("ready to change state");
                    $state.go('tab.captureCredentials', {'eventDetails':$scope.event.name});
                }
                else
                {
                    errorMsg += "Please enter the division";
                }
            }
            else
            {
                errorMsg += "Please fill in the event you attending";
            }
            $scope.errMsg = "";
            $scope.errMsg = errorMsg;
            console.log("err "+$scope.errMsg);
            //$state.go('tab.captureCredentials', {});
        };


        ctrl.init = function() {

        };

        //---------------------------------------
        //---------------- INIT -----------------
        ctrl.init();
        //---------------------------------------
    }
]);;;
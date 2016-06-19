angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, IonicLogin, $ionicLoading, $state) {

  $scope.data = {} ;

  $scope.logout = function(){
       IonicLogin.logout();
  }

  $scope.login = function(){
       IonicLogin.login($scope.data.email, $scope.data.password);
  }

   $scope.signUp = function(){
     $state.go('signup');
  }

})

.controller('SplashController', function ($scope, $state, $window, $http){

    $scope.$on("$ionicView.enter", function(event) {
          $scope.checkSession();
    });

  $scope.checkSession = function () {

        if ( window.localStorage['session'] != null &&  window.localStorage['session'] != undefined )
        {
            var sesh = JSON.parse(window.localStorage['session']) ;

              $http.post("http://localhost:3000/checkSession",
                { params: { "session": JSON.stringify(sesh)}})
                  .success(function(response) {
                   if ( response == "error" || response == "LOGIN_FAIL" ){
                        $state.go('login');
                   }
                   else{
                       $state.go('tab.dash');
                  }
                })
                .error(function(response) {
                  $state.go('login');
            });
        }
        else{
           $state.go('login');
        }
     }
})

.controller('SignUpCtrl', function($log, $scope, $state, IonicLogin) {
  $log.info("SignUpCtrl");
  $scope.contactSupport = function(){
    $state.go('support');
  }
  $scope.patronRegisteration = function(){
    $state.go('patronRegisteration');
  }
  $scope.beneficiaryRegisteration = function(){
    $state.go('beneficiaryRegisteration');
  }
})

.controller('PatronCtrl', function($log, $scope, $state, IonicLogin) {
  $log.info("PatronCtrl");
})

.controller('BeneficiaryCtrl', function($log, $scope, $state, IonicLogin) {
  $log.info("BeneficiaryCtrl");
})

.controller('SupportCtrl', function($log, $scope, $stateParams, IonicLogin) {
  $log.info("SupportCtrl");
});

angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, IonicLogin, $ionicLoading, $state) {

  $scope.data = {} ;

  $scope.logout = function(){
       IonicLogin.logout();
  }

  $scope.login = function(){
       IonicLogin.login($scope.data.email, $scope.data.password);
       $state.go('serviceProviders')
  }

   $scope.signUp = function(){
     $state.go('signup');
  }

  $scope.forgotPassword = function(){
    $state.go('forgotPassword');
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

.controller('ServiceProviderCtrl', function($scope, $stateParams, IonicLogin, $state){
    $scope.chooseAmount = function(){
      $state.go('chooseAmount');
    }

    $scope.patronProfileSettings = function(){
      $state.go('patronProfileSettings');
    }

    $scope.beneficiaryPatronView = function(){
      $state.go('beneficiaryPatronView');
    }

    $scope.providers = [
    { pic: 'img/ionic.png', name: 'John Doe', profession: 'Valet Parking' },
    { pic: 'img/ionic.png', name: 'Cidy Smith', profession: 'Coat Check-In' },
    { pic: 'img/ionic.png', name: 'Bob Wilson', profession: 'Gold Cady' },
    { pic: 'img/ionic.png', name: 'John Doe', profession: 'Valet Parking' },
    { pic: 'img/ionic.png', name: 'John Doe', profession: 'Valet Parking' }
  ];
})

.controller('SignUpCtrl', function($scope, $stateParams, IonicLogin, $state){
  console.warn("Signup");

  $scope.patronReg = function(){
    $state.go('patron');
  }

  $scope.beneficiaryReg = function(){
    $state.go('beneficiary');
  }
})

.controller('ForgotPasswdCtrl', function($scope, $stateParams, IonicLogin, $state){
  console.warn("ForgotPassword");
})

.controller('PatronRegCtrl', function($scope, $stateParams, $log, $state){

})

.controller('BeneficiaryRegCtrl', function($scope, $stateParams, $state){

})

.controller('ChooseAmountCtrl', function($scope, $stateParams, $log, $state){
    $scope.paymentProcess = function(){
      $state.go('paymentProcess');
    }
})

.controller('PaymentProcessCtrl', function($scope, $stateParams, $state){

})

.controller('PatronProfileSettingsCtrl', function($scope, $stateParams, $state){
    $scope.patronEditProfile = function(){
      $state.go('patronEditProfile');
    }

    $scope.patronAnalytics = function(){
      $state.go('patronAnalytics');
    }

    $scope.patronNotifications = function(){
      $state.go('patronNotifications');
    }

    $scope.reportProblem = function(){
        $state.go('reportProblem');
    }
})

.controller('PatronEditProfileCtrl', function($scope, $stateParams, $state){

})

.controller('PatronAnalyticsCtrl', function($scope, $stateParams, $state){

})

.controller('PatronNotificationsCtrl', function($scope, $stateParams, $state){

})

.controller('ReportProblemCtrl', function($scope, $stateParams, $state){

})

/* Beneficiary Controllers */

.controller('BeneficiaryCtrl', function($scope, $stateParams, $state){

  $scope.beneficiaryProfileSettings = function(){
    $state.go('beneficiaryProfileSettings');
  }
})

.controller('BeneficiaryProfileSettingsCtrl', function($scope, $stateParams, $state){

  $scope.beneficiaryEditProfile = function(){
    $state.go('beneficiaryEditProfile');
  }

  $scope.beneficiaryAnalytics = function(){
    $state.go('beneficiaryAnalytics');
  }

  $scope.beneficiaryManualCharge = function(){
    $state.go('beneficiaryManualCharge');
  }

})

.controller('BeneficiaryEditProfileCtrl', function( $scope, $stateParams, $state){

})

.controller('BeneficiaryAnalyticsCtrl', function( $scope, $stateParams, $state){

})

.controller('BeneficiaryManualChargeCtrl', function( $scope, $stateParams, $state){

})

.controller('AccountCtrl', function($scope) {

});

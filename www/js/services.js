angular.module('starter.services', []).
    config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    }])

.factory('IonicLogin', function( $http, $state, $ionicPopup, $ionicLoading, $log) {
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';
  function add_auth_header(data, headersGetter){
      $http.defaults.xsrfHeaderName = 'X-CSRFToken';
      $http.defaults.xsrfCookieName = 'csrftoken';
      var headers = headersGetter();

      headers['Authorization'] = ('Basic ' + btoa(data.username +
                                  ':' + data.password));
      $log.warn(data);
  }
  function login(email, password){

      $ionicLoading.show({
              template: 'Creating Account...'
          });
          $log.warn(email + password);
      $http({method: 'POST', url: 'http://localhost:9090/api/auth/', data: {"email_id": email,
       "user_password": password}, header: add_auth_header})
      /*$http.post("http://localhost:9090/api/auth/",
          {
                        data: {"email_id": email,
                         "user_password": password},
                         transformRequest: add_auth_header
                       })*/
               .success(function(response) {

                    $ionicLoading.hide();

              if ( response == "LOGIN_FAIL" ){
                    $ionicPopup.alert({
                     title: 'Login Failed',
                      template: 'Wrong email and/or password.'
                    });
              }
             else{ // SUCCESS

                  window.localStorage['session'] = JSON.stringify(response);
                  $state.transitionTo('tab.dash');
             }
            })
            .error(function(response) {

                   $ionicLoading.hide();

                   $ionicPopup.alert({
                       title: 'Login',
                       template: 'Service unavailable, make sure you are online.'
                   });
            });
  }


  function logout(email){

        $ionicLoading.show({
              template: 'Logging Out...'
          });

        $http.post("http://localhost:3000/logout",
             { params: { "email": email }})
               .success(function(response) {

                    $ionicLoading.hide();

              if ( response == "LOGIN_FAIL" ){
                    $ionicPopup.alert({
                     title: 'Logout Failed',
                      template: 'Oops something went wrong.'
                    });
              }
             else{ // SUCCESS

                  window.localStorage['session'] = "";
                  $state.transitionTo('login');
             }
            })
            .error(function(response) { // IF THERE IS AN ERROR LOGOUT ANYWAY

                   $ionicLoading.hide();

                  window.localStorage['session'] = "";
                  $state.transitionTo('login');
            });
  }


  function signUp(email, password){

       $ionicLoading.show({
              template: 'Creating Account...'
          });

            $http.post("http://localhost:3000/signUp",
               { params: {
                           "email": email,
                           "password": password }
                           })
                 .success(function(response) {

                      $ionicLoading.hide();

                if ( response == "USER_EXISTS" ){
                      $ionicPopup.alert({
                       title: 'Username Taken',
                        template: 'Username taken, try another one.'
                      });
                }
               else{ // SUCCESS

                    window.localStorage['session'] = JSON.stringify(response);
                    $state.transitionTo('tab.dash');
               }
              })
              .error(function(response) {
                     $ionicLoading.hide();

                     $ionicPopup.alert({
                         title: 'Account',
                         template: 'Service unavailable, make sure you are online.'
                     });
              });
  }

  return {

    login: login,
    signUp: signUp,
    logout: logout

  };
});

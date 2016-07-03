// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'tmh.dynamicLocale', 'pascalprecht.translate'])

.constant('availableLanguages', ['en-US', 'de'])
.constant('defaultLanguage', 'en-US')

.run(function($ionicPlatform, tmhDynamicLocale, $translate, $cordovaGlobalization, availableLanguages, $rootScope, defaultLanguage, $locale) {

  function applyLanguage(language) {
    tmhDynamicLocale.set(language.toLowerCase());
  }

  function getSuitableLanguage(language) {
    for (var index = 0; index < availableLanguages.length; index++) {
      if (availableLanguages[index].toLowerCase() == language.toLowerCase())
        return availableLanguages[index];
    }
    return defaultLanguage
  }

  function setLanguage() {
    if (typeof navigator.globalization != "undefined") {
      $cordovaGlobalization.getPreferredLanguage().then(function (result) {
        var language = getSuitableLanguage(result.value);
        applyLanguage(language);
        $translate.use(language);
      });
    } else {
      applyLanguage(defaultLanguage);
    }
  }
  $ionicPlatform.ready(function() {
    setLanguage();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function (tmhDynamicLocaleProvider, $translateProvider, defaultLanguage) {
  tmhDynamicLocaleProvider
  .localeLocationPattern('locales/angular-locale_{{locale}}.js');
  $translateProvider
    .useStaticFilesLoader({
      prefix: 'i18n/',
      suffix: '.json'
    });
  $translateProvider
  .preferredLanguage(defaultLanguage)
  .useSanitizeValueStrategy('escapeParameters');
})

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {

  $ionicConfigProvider.backButton.text("{{ 'BACK_BTN' | translate }}");                    // default is 'Back'
  $ionicConfigProvider.backButton.previousTitleText(false);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  // Each tab has its own nav history stack:

  .state('serviceProviders',{
      url: '/serviceProviders',
      templateUrl: 'templates/service-Provider.html',
      controller: 'ServiceProviderCtrl'
  })

  .state('chooseAmount',{
      url: '/chooseAmount',
      templateUrl: 'templates/choose-Amount.html',
      controller: 'ChooseAmountCtrl'
  })
  .state('paymentProcess',{
      url: '/paymentProcess',
      templateUrl: 'templates/make-Payment.html',
      controller: 'PaymentProcessCtrl'
  })

  .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignUpCtrl'
  })

  .state('forgotPassword',{
      url: '/forgotPassword',
      templateUrl: 'templates/forgot-Password.html',
      controller: 'ForgotPasswdCtrl'
  })

  .state('patron', {
      url: '/patron',
      templateUrl: 'templates/patron-Registration.html',
      controller: 'PatronRegCtrl'
  })

  .state('beneficiary',{
      url: '/beneficiary',
      templateUrl: 'templates/beneficiary-Registration.html',
      controller: 'BeneficiaryRegCtrl'
  })

  .state('patronProfileSettings',{
      url: '/patron-profile-settings',
      templateUrl: 'templates/patron-Profile-Settings.html',
      controller: 'PatronProfileSettingsCtrl'
  })

  .state('patronEditProfile',{
      url: '/patron-Edit-Profile',
      templateUrl: 'templates/patron-Edit-Profile.html',
      controller: 'PatronEditProfileCtrl'
  })

  .state('patronAnalytics',{
      url: '/patronAnalytics',
      templateUrl: 'templates/patron-Analytics.html',
      controller: 'PatronAnalyticsCtrl'
  })

  .state('patronNotifications',{
      url: '/patronNotifications',
      templateUrl: 'templates/patron-Notifications.html',
      controller: 'PatronNotificationsCtrl'
  })

  .state('reportProblem',{
      url: '/reportProblem',
      templateUrl: 'templates/report-Problem.html',
      controller: 'ReportProblemCtrl'
  })

  .state('beneficiaryPatronView',{
      url: '/Patron-View',
      templateUrl: 'templates/beneficiary-Patron-View.html',
      controller: 'BeneficiaryCtrl'
  })

  .state('beneficiaryProfileSettings',{
      url: '/My-Account',
      templateUrl: 'templates/beneficiary-Profile-Settings.html',
      controller: 'BeneficiaryProfileSettingsCtrl'
  })

  .state('beneficiaryEditProfile',{
      url: '/Beneficiary-Edit-Profile',
      templateUrl: 'templates/beneficiary-Edit-Profile.html',
      controller: 'BeneficiaryEditProfileCtrl'
  })

  .state('beneficiaryAnalytics',{
      url: '/Beneficiary-Analytics',
      templateUrl: 'templates/beneficiary-Analytics.html',
      controller: 'BeneficiaryAnalyticsCtrl'
  })

  .state('beneficiaryManualCharge',{
      url: '/Beneficiary-Manual-Charge',
      templateUrl: 'templates/beneficiary-Manual-Charge.html',
      controller: 'BeneficiaryManualChargeCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

'use strict';
module.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('Dashboard', {
          url: "/",
          templateUrl: "backend/dashboard.html"
      })
      .state('hotels', {
          url: "/hotels",
          templateUrl: "backend/hotels.html"
      })
      .state('languages', {
          url: "/languages",
          templateUrl: "backend/languages.html"
      })
      .state('models', {
          url: "/models",
          templateUrl: "backend/models.html"
      }).state('data', {
          url: "/data",
          templateUrl: "backend/data.html"
      }).state('endpoints', {
          url: "/endpoints",
          templateUrl: "backend/endpoints.html"
      });
});
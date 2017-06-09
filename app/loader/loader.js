'use strict';
angular.module('EnoticeBoardWebApp.loader', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/loader', {
        templateUrl: 'loader/loader.html'
        , controller: 'loaderCtrl'
    });
}]).controller('loaderCtrl', [function ($scope) {}]);
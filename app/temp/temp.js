'use strict';
angular.module('EnoticeBoardWebApp.temp', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/temp', {
        templateUrl: 'temp/temp.html'
        , controller: 'tempCtrl'
    });
}]).controller('tempCtrl', ['$scope', '$timeout', 'CommonProp', '$firebaseArray', '$firebaseObject', '$firebaseAuth', function ($scope, $timeout, CommonProp, $firebaseArray, $firebaseObject, $firebaseAuth) {
    $scope.clickMe = function () {
        console.log("clicked");
        $scope.loading = true;
        $timeout(function () {
            $scope.loading = false
        }, 3000);
    }
  }])
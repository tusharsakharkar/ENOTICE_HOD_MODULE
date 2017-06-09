'use strict';
angular.module('EnoticeBoardWebApp.uploadpic', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/uploadpic', {
        templateUrl: 'uploadpic/uploadpic.html'
        , controller: 'uploadpicCtrl'
    });
}]).controller('uploadpicCtrl', ['$scope', function ($scope) {
    $scope.path = "/ViewerJS/#../uploadpic/CodeRelay.pdf";
}]);
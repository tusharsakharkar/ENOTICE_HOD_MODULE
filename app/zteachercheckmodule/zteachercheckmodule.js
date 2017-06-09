'use strict';
angular.module('EnoticeBoardWebApp.zteachercheckmodule', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/zteachercheckmodule', {
        templateUrl: 'zteachercheckmodule/zteachercheckmodule.html'
        , controller: 'zteachercheckmoduleCtrl'
    });
}]).controller('zteachercheckmoduleCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$firebaseAuth', function ($scope, CommonProp, $firebaseArray, $firebaseObject, $firebaseAuth) {
    $scope.username = CommonProp.getUser();
    var Department;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var reff = firebase.database().ref('/Users/' + userId).once('value').then(function (snapshot) {
                Department = snapshot.val().department;
                var ref = firebase.database().ref().child('posts').child(Department).child('Deptposts').orderByChild("UID").equalTo(userId);
                $scope.articles = $firebaseArray(ref);
            });
        }
    });
    $scope.logout = function () {
        console.log("DJDJDJJDJ");
        CommonProp.logoutUser();
    }
  }])
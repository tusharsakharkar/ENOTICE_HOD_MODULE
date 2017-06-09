'use strict';
angular.module('EnoticeBoardWebApp.newpost', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/newpost', {
        templateUrl: 'newpost/newpost.html'
        , controller: 'newpostCtrl'
    });
}]).controller('newpostCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$firebaseAuth', function ($scope, CommonProp, $firebaseArray, $firebaseObject, $firebaseAuth) {
    $scope.username = CommonProp.getUser();
    var Department;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var reff = firebase.database().ref('/Users/' + userId).once('value').then(function (snapshot) {
                Department = snapshot.val().department;
                var level = snapshot.val().level;
                if (level == 2) {
                    var ref = firebase.database().ref().child('posts').child(Department).child('Document');
                    $scope.articles = $firebaseArray(ref);
                }
                else {
                    alert("Not allowed use HOD Module")
                }
            });
        }
    });
    $scope.editPost = function (id) {
        var ref = firebase.database().ref().child('posts').child(Department).child('Deptposts').child(id);
        $scope.editPostData = "true";
        console.log($scope.editPostData);
        ref.update({}).then(function (ref) {
            console.log(ref);
        }, function (error) {
            console.log(error);
        });
    };
    $scope.logout = function () {
        console.log("DJDJDJJDJ");
        CommonProp.logoutUser();
    }
  }])
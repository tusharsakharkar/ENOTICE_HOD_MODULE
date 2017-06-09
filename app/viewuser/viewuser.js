'use strict';
angular.module('EnoticeBoardWebApp.viewuser', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/viewuser', {
        templateUrl: 'viewuser/viewuser.html'
        , controller: 'viewuserCtrl'
    });
}]).controller('viewuserCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', function ($scope, CommonProp, $firebaseArray, $firebaseObject) {
    $scope.username = CommonProp.getUser();
    var Department;
    var userId;
    var name;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userId = firebase.auth().currentUser.uid;
            var reff = firebase.database().ref('/Users/' + userId).once('value').then(function (snapshot) {
                Department = snapshot.val().department;
                name = snapshot.val().name;
                $scope.name = name; //username
                var level = snapshot.val().level;
                if (level == 2 || Level == 3) {
                    var ref = firebase.database().ref().child('Users').orderByChild('department').equalTo(Department);
                    $scope.articles = $firebaseArray(ref);
                }
                else {
                    alert("Not allowed use HOD module");
                }
            });
        }
    });
    $scope.unblock = function (id) {
        var ref = firebase.database().ref().child('Users').child(id);
        $scope.editPostData = 1;
        console.log(id);
        ref.update({
            block: "No"
        }).then(function (ref) {
            console.log(ref);
        }, function (error) {
            console.log(error);
        });
    };
    $scope.block = function (id) {
        var ref = firebase.database().ref().child('Users').child(id);
        $scope.editPostData = 1;
        console.log(id);
        ref.update({
            block: "Yes"
        }).then(function (ref) {
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
'use strict';
angular.module('EnoticeBoardWebApp.register', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html'
        , controller: 'registerCtrl'
    });
}]).controller('registerCtrl', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth', '$location', function ($scope, $firebaseArray, $firebaseObject, $firebaseAuth, $location) {
    $scope.signUp = function () {
        var username = $scope.user.email;
        var password = $scope.user.password;
        var name = $scope.user.username;
        var val = $scope.user.val;
        var post = $scope.user.post;
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = dd + '/' + mm + '/' + yyyy;
        console.log(today);
        if (username && password && name && val && post) {
            var auth = $firebaseAuth();
            auth.$createUserWithEmailAndPassword(username, password).then(function () {
                console.log("success");
                var userId = firebase.auth().currentUser.uid;
                console.log(userId);
                var ref = firebase.database().ref().child('Users').child(userId);
                $scope.articles = $firebaseArray(ref);
                console.log($scope.articles);
                firebase.database().ref('Users/' + userId).set({
                    DEST: post
                    , block: "No"
                    , department: val
                    , images: "http://s3.amazonaws.com/cdn.roosterteeth.com/default/tb/user_profile_male.jpg"
                    , level: 99
                    , name: name
                    , time: "2/10/1995"
                });
                $location.path('/home');
                console.log(userId);
            }).catch(function (error) {
                $scope.errMsg = true;
                $scope.errorMessage = error.message;
            });
        }
        else {
            alert("Input all values");
        }
    };
  }])
'use strict';
angular.module('EnoticeBoardWebApp.home', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html'
        , controller: 'HomeCtrl'
    });
}]).controller('HomeCtrl', ['$scope', '$timeout', '$firebaseAuth', '$firebaseArray', '$location', 'CommonProp', function ($scope, $timeout, $firebaseAuth, $firebaseArray, $location, CommonProp) {
    $scope.username = CommonProp.getUser();
    if ($scope.username) {
        $location.path('/dashboard');
    }
    $(".msg").hide();
    $(".msg1").show();
    $scope.signIn = function () {
            $scope.loading = true;
            var username = $scope.user.email;
            var password = $scope.user.password;
            var auth = $firebaseAuth();
            auth.$signInWithEmailAndPassword(username, password).then(function () {
                var userId = firebase.auth().currentUser.uid;
                var emailVerified;
                emailVerified = userId.emailVerified;
                console.log(emailVerified);
                console.log(userId);
                var reff = firebase.database().ref('/Users/' + userId).once('value').then(function (snapshot) {
                    var Department = snapshot.val().department;
                    var level = snapshot.val().level;
                    var block = snapshot.val().block;
                    $timeout(function () {
                        $scope.loading = false;
                        if (level == 99 || block == "Yes") {
                            $location.path('/report');
                        }
                        else {
                            $location.path('/dashboard');
                        }
                    }, 2500);
                });
                CommonProp.setUser($scope.user.email);
                //$location.path('/dashboard');
            }).catch(function (error) {
                $scope.errMsg = true;
                $scope.errorMessage = error.message;
            });
        }
        //signup
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
                var user = firebase.auth().currentUser;
                user.sendEmailVerification().then(function () {
                    console.log("email send");
                    // Email sent.
                }, function (error) {
                    // An error happened.
                });
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
                    , time: today
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
        $(".msg").show();
        $(".msg1").hide();
    };
}]).service('CommonProp', ['$location', '$firebaseAuth', function ($location, $firebaseAuth) {
    var user = "";
    var auth = $firebaseAuth();
    return {
        getUser: function () {
            if (user == "") {
                user = localStorage.getItem("userEmail");
            }
            return user;
        }
        , setUser: function (value) {
            localStorage.setItem("userEmail", value);
            user = value;
        }
        , logoutUser: function () {
            auth.$signOut();
            console.log("Logged Out Succesfully");
            user = "";
            localStorage.removeItem('userEmail');
            $location.path('/home');
        }
    };
}]);
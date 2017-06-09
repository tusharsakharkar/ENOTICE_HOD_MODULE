'use strict';
angular.module('EnoticeBoardWebApp.archive', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/archive', {
        templateUrl: 'archive/archive.html'
        , controller: 'archiveCtrl'
    });
}]).controller('archiveCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', function ($scope, CommonProp, $firebaseArray, $firebaseObject) {
    $scope.username = CommonProp.getUser();
    var Department;
    var name;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var reff = firebase.database().ref('/Users/' + userId).once('value').then(function (snapshot) {
                Department = snapshot.val().department;
                name = snapshot.val().name;
                $scope.name = name;
                var Level = snapshot.val().level;
                if (Level == 2 || Level == 3) {
                    var ref = firebase.database().ref().child('posts').child(Department).child('Pending').orderByChild("approved").equalTo("true");
                    $scope.articles = $firebaseArray(ref);
                    
                }
                else {
                    alert("Not allowed to user this module");
                }
            });
        }
    });
    $scope.editPost = function (id, type1) {
        var ref = firebase.database().ref().child('posts').child(Department).child('Pending').child(id);
        $scope.editPostData = "true";
        console.log($scope.editPostData);
        ref.update({
            approved: $scope.editPostData
        }).then(function (ref) {
            console.log(ref);
        }, function (error) {
            console.log(error);
        });
        var reff = firebase.database().ref().child('posts').child(Department).child('Pending').child(id).once('value').then(function (snapshot) {
            var Postusername = snapshot.val().department;
            var userDesc = snapshot.val().Desc;
            var userName = snapshot.val().username;
            var profile = snapshot.val().profileImg;
            var label = snapshot.val().label;
            var linkq = "this has no link";
            linkq = snapshot.val().link;
            var image = null;
            image = snapshot.val().images;
            var userId = snapshot.val().UID;
            console.log(image);
            var image = snapshot.val().images;
            var Title = snapshot.val().title;
            var d = new Date();
            var n = d.getTime();
            var a = parseInt(-1 * n);
            var reff = firebase.database().ref().child('posts').child(Department).child('Approved');
            $scope.article = $firebaseArray(reff);
            $scope.article.$add({
                Desc: userDesc
                , UID: userId
                , approved: "true"
                , profileImg: profile
                , department: Postusername
                , label: label
                , link: linkq
                , images: image
                , removed: 0
                , servertime: a
                , time: "12/01/2017"
                , title: Title
                , type: type1
                , username: userName
            }).then(function (ref) {
                console.log(ref);
            }, function (error) {
                console.log(error);
            });
        });
    };
    $scope.editcancel = function (id) {
        var ref = firebase.database().ref().child('posts').child(Department).child('Pending').child(id);
        $scope.editPostData = "false";
        console.log($scope.editPostData);
        ref.update({
            approved: $scope.editPostData
        }).then(function (ref) {
            console.log(ref);
        }, function (error) {
            console.log(error);
        });
    };
    $scope.logout = function () {
        console.log("DJDJDJJDJ");
        CommonProp.logoutUser();
    };
	}])
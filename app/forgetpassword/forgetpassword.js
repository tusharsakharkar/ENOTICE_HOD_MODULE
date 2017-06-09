'use strict';
angular.module('EnoticeBoardWebApp.forgetpassword', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/forgetpassword', {
        templateUrl: 'forgetpassword/forgetpassword.html'
        , controller: 'forgetpasswordCtrl'
    });
}]).controller('forgetpasswordCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$firebaseAuth', '$location', function ($scope, CommonProp, $firebaseArray, $firebaseObject, $firebaseAuth, $location) {
    $scope.username = CommonProp.getUser();
    $scope.email = "Enter Registered Email"
    var Department;
    var name;
    
   var auth = firebase.auth();

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
      $scope.deleteCnf = function (user) {
        $scope.deleteArticle = user;
        console.log($scope.deleteArticle.username);

    };
   $scope.viewCnf = function () {
       var title = $scope.articles.password;
        console.log(title);
         var auth = firebase.auth();
        auth.sendPasswordResetEmail(title).then(function() {
              // Email sent.
               console.log(title);
          }, function(error) {
  // An error happened.
   console.log("error");
           });

        $scope.articles.password = "Request send to mail" 
    };
      $scope.deletepost = function (deleteArticle) {

        $scope.articles.$remove(deleteArticle);
        $("#deleteModal").modal('hide');
    };

  }])
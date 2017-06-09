'use strict';
angular.module('EnoticeBoardWebApp.report', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/report', {
        templateUrl: 'report/report.html'
        , controller: 'reportCtrl'
    });
}]).controller('reportCtrl', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth', function ($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {
    var ref;
    var downloadURL;
    var Department;
    var profileimg;
    var Name;
    var userId;
    var useremail;
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
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userId = firebase.auth().currentUser.uid;
            useremail = firebase.auth().currentUser.email;
            var reff = firebase.database().ref('/Users/' + userId).once('value').then(function (snapshot) {
                Department = snapshot.val().department;
                Name = snapshot.val().name;
                name = snapshot.val().name;
                $scope.block = snapshot.val().block;
                $scope.app = snapshot.val().level;
                console.log($scope.block);
                profileimg = snapshot.val().images;
                $scope.name = Name;
                ref = firebase.database().ref().child('posts').child(Department).child('Pending');
                $scope.articles = $firebaseArray(ref);
            });
        }
    });
    $scope.upload = function () {
        //alert("dj")
        var file = document.getElementById('pic').files[0];
        var filename = file.name;
        var storageRef = firebase.storage().ref('/dogimages/' + filename);
        var uploadTask = storageRef.put(file);
        uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            var elem = document.getElementById("myBar");
            var width = 0;
            var id = setInterval(frame, 10);

            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                }
                else {
                    width++;
                    elem.style.width = width + '%';
                }
            }
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, function (error) {
            // Handle unsuccessful uploads
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            downloadURL = uploadTask.snapshot.downloadURL;
            $scope.path = "https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/tick_green.png";
            console.log(downloadURL);
        });
    };
    $scope.createPost = function () {
        var d = new Date();
        var n = d.getTime();
        var a = parseInt(-1 * n);
        var title = $scope.articles.titletxt;
        var post = $scope.articles.posttxt;
        console.log(useremail);
        $scope.articles.$add({
            title: title
            , Desc: post
            , UID: userId
            , approved: "pending"
            , images: downloadURL
            , link: downloadURL
            , label: "Urgent"
            , time: today
            , username: Name
            , department: Department
            , email: useremail
            , servertime: a
            , type: 2
            , profileImg: profileimg
        }).then(function (ref) {
            console.log(ref);
        }, function (error) {
            console.log(error);
        });
    };
    }]);
angular.module('MyApp').controller('AppCtrl', function ($scope) {
    $scope.users = ['Fabio', 'Leonardo', 'Thomas', 'Gabriele', 'Fabrizio', 'John', 'Luis', 'Kate', 'Max'];
});
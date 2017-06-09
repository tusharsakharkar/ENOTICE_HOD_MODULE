'use strict';
angular.module('EnoticeBoardWebApp.otherpdf', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/otherpdf', {
        templateUrl: 'otherpdf/otherpdf.html'
        , controller: 'otherpdfCtrl'
    });
}]).controller('otherpdfCtrl', ['$scope', '$timeout', 'CommonProp', '$firebaseArray', '$firebaseObject', '$firebaseAuth', function ($scope, $timeout, CommonProp, $firebaseArray, $firebaseObject, $firebaseAuth) {
    $scope.loading = false;
    $("#prog").hide();
    var ref;
    var downloadURL = "http://www.freeiconspng.com/uploads/document-extension-file-file-format-filename-text-txt-icon--20.png";
    var Department;
    var Name;
    var PF;
    var userId
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
                PF = snapshot.val().images;
            });
        }
    });
    $scope.upload = function () {
        //alert("dj")
        $("#prog").show();
        var file = document.getElementById('pic').files[0];
        var filename = file.name;
        var storageRef = firebase.storage().ref('/dogimages/' + filename);
        var uploadTask = storageRef.put(file);
        var width, elem;
        uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            elem = document.getElementById("myBar");
            width = 0;
            var id = setInterval(frame, 10);

            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                }
                else if (width < 80) {
                    width += 0.5;
                    elem.style.width = width + '%';
                }
                else if (width >= 80 && width <= 95) {
                    width += 0.5;
                    elem.style.width = width + '%';
                }
                else if (width > 95 && progress == 100) {
                    width = 100;
                    elem.style.width = width + '%';
                }
                else {
                    elem.style.width = width + '%';
                }
                //progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //console.log('Upload is ' + progress + '% done');
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
            $scope.path = downloadURL;
            width = 100;
            elem.style.width = width + '%';
            console.log(downloadURL);
        });
    };
    $scope.logout = function () {
        console.log("DJDJDJJDJ");
        CommonProp.logoutUser();
    }
    $scope.createPost = function () {
        $scope.loading = true;
        var d = new Date();
        var n = d.getTime();
        var a = parseInt(-1 * n);
        var title = $scope.articles.titletxt;
        var post = $scope.articles.posttxt;
        var Dept123 = $scope.articles.val;
        var ntype = $scope.articles.ntype;
        if (!title && !post && !Dept123 && !downloadURL) {
            alert("DJ");
        }
        else {
            alert("sdsds");
        }
        ref = firebase.database().ref().child('posts').child(Dept123).child('Pending');
        $scope.articles = $firebaseArray(ref);
        console.log(useremail);
        $scope.articles.$add({
            title: title
            , Desc: post
            , UID: userId
            , profileImg: PF
            , approved: "pending"
            , images: downloadURL
            , link: downloadURL
            , time: today
            , username: Name
            , department: Department
            , email: useremail
            , servertime: a
            , type: 2
            , label: ntype
        }).then(function (ref) {
            $timeout(function () {
                console.log("fasla");
                $scope.loading = false;
                $('#deleteModal').modal('toggle');
                $('#deleteModal').modal('show');
            }, 3000);
            document.getElementById('postmatter').innerHTML = 'Success';
            console.log(ref);
        }, function (error) {
            $scope.loading = false;
            $('#deleteModal').modal('toggle');
            $('#deleteModal').modal('show');
            document.getElementById('postmatter').innerHTML = 'Error';
            console.log(error);
        });
    };
    }]);
angular.module('MyApp').controller('AppCtrl', function ($scope) {
    $scope.users = ['Fabio', 'Leonardo', 'Thomas', 'Gabriele', 'Fabrizio', 'John', 'Luis', 'Kate', 'Max'];
});
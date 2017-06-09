'use strict';
angular.module('EnoticeBoardWebApp.blank', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/blank', {
        templateUrl: 'blank/blank.html'
        , controller: 'blankCtrl'
    });
}]).controller('blankCtrl', ['$scope', '$timeout', '$firebaseArray', '$firebaseObject', '$firebaseAuth', function ($scope, $timeout, $firebaseArray, $firebaseObject, $firebaseAuth) {
    $scope.loading = false;
    $("#prog").hide();
    //document.getElementById('myBar').hide();
    var ref;
    var ref1;
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
                profileimg = snapshot.val().images;
                $scope.name = Name;
                ref = firebase.database().ref().child('posts').child(Department).child('Approved');
                $scope.articles = $firebaseArray(ref);
                ref1 = firebase.database().ref().child('posts').child(Department).child('Pending');
                $scope.pending = $firebaseArray(ref1);
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
                    width += 1;
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
    $scope.createPost = function () {
        //$('#deleteModal').modal('hide');
        //alert("createpost");
        $scope.loading = true;
        var d = new Date();
        var n = d.getTime();
        var a = parseInt(-1 * n);
        var title = $scope.articles.titletxt;
        var post = $scope.articles.posttxt;
        var ntype = $scope.articles.ntype;
        console.log(useremail);
          

        $scope.articles.$add({
            title: title
            , Desc: post
            , UID: userId
            , approved: "true"
            , images: downloadURL
            , link: downloadURL
            , label: ntype
            , time: today
            , username: Name
            , department: Department
            , email: useremail
            , servertime: a
            , type: 2
            , profileImg: profileimg
        }).then(function (ref) {
            //$("#postmatter").append("Success");
            $timeout(function () {
                console.log("fasla");
                $scope.loading = false;
                $('#deleteModal').modal('toggle');
                $('#deleteModal').modal('show');
            }, 3000);
            //$("#postmatter").show();
            document.getElementById('postmatter').innerHTML = 'Success';
            console.log(ref);
        }, function (error) {
            //$("#postmatter").append("Error");
            $scope.loading = false;
            $('#deleteModal').modal('toggle');
            $('#deleteModal').modal('show');
            document.getElementById('postmatter').innerHTML = 'Error';
            console.log(error);
        });




         $scope.pending.$add({
            title: title
            , Desc: post
            , UID: userId
            , approved: "true"
            , images: downloadURL
            , link: downloadURL
            , label: ntype
            , time: today
            , username: Name
            , department: Department
            , email: useremail
            , servertime: a
            , type: 2
            , profileImg: profileimg
        }).then(function (ref) {
            //$("#postmatter").append("Success");
            console.log(ref);
        }, function (error) {
            //$("#postmatter").append("Error");
            console.log(error);
        });
    };
}]);
angular.module('MyApp').controller('AppCtrl', function ($scope) {
    $scope.users = ['Fabio', 'Leonardo', 'Thomas', 'Gabriele', 'Fabrizio', 'John', 'Luis', 'Kate', 'Max'];
});
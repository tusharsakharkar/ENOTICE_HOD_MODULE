'use strict';
// Declare app level module which depends on views, and components
angular.module('EnoticeBoardWebApp', [
  'ngRoute'
  , 'EnoticeBoardWebApp.home'
  , 'EnoticeBoardWebApp.welcome'
  , 'EnoticeBoardWebApp.pending'
  , 'EnoticeBoardWebApp.profile'
  , 'EnoticeBoardWebApp.viewuser'
  , 'EnoticeBoardWebApp.addtext'
  , 'EnoticeBoardWebApp.temp'
  , 'EnoticeBoardWebApp.loader'
  , 'EnoticeBoardWebApp.dashboard'
  , 'EnoticeBoardWebApp.register'
  , 'EnoticeBoardWebApp.blank'
  , 'EnoticeBoardWebApp.newpost'
  , 'EnoticeBoardWebApp.uploadpic'
  , 'EnoticeBoardWebApp.viewdocument'
  , 'EnoticeBoardWebApp.principal'
  , 'EnoticeBoardWebApp.otherdepartment'
  , 'EnoticeBoardWebApp.othertext'
  , 'EnoticeBoardWebApp.otherpdf'
  , 'EnoticeBoardWebApp.editprofile'
  , 'EnoticeBoardWebApp.pdf'
  , 'EnoticeBoardWebApp.report'
  , 'EnoticeBoardWebApp.archive'
  , 'EnoticeBoardWebApp.forgetpassword'
  , 'EnoticeBoardWebApp.newdocument'



]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);
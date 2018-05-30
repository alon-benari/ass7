'use strict';

var cs142App = angular.module('cs142App', ['ngRoute', 'ngMaterial','ngResource']);

cs142App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/users', {
                templateUrl: 'components/user-list/user-listTemplate.html',
                controller: 'UserListController'
            }).
            when('/users/:userId', {
                templateUrl: 'components/user-detail/user-detailTemplate.html',
                controller: 'UserDetailController',
                
            }).
            when('/photos/:userId', {
                templateUrl: 'components/user-photos/user-photosTemplate.html',
                controller: 'UserPhotosController'
            }).
            when('/photos/:userId', {
                templateUrl: 'components/user-photos/user-photosTemplate.html',
                controller: 'UserPhotosController'
            }).
            when('/admin/login', {
                templateUrl: 'components/login-register/login-registerTemplate.html',
                controller: 'LoginRegisterController'
            }).
 	         otherwise({
                redirectTo: '/users'
            });
    }]);
    // broadcasting

cs142App.controller('MainController', ['$scope','$resource','$location',
    function ($scope, $resource,$location) {
        $scope.main = {};
        $scope.main.title = 'Users';
        $scope.main.show = true;
        var info = $resource('test/info',{},{action:{method:'GET'}});
        // var data = info.get().$promise.then(function(d, $scope ){
        //      console.log(d.__v)
        //      $scope.main.version = d.__v
        // })
        var data = info.get(function(d){
            console.log(d); // logs the data nicely
            $scope.main.version = d; // does not update 
        });
        console.log($scope.main.version); // return undefined?!
        // logout the user ie destroy the session
        
        $scope.logout = function (){
            console.log('trying to logout')
            var logout = $resource('/admin/logout')
            console.log('coming back from resource')
            logout.save(function(err){
                console.log('inside save')
                if (!err){
                    console.log('killing the session')
                    console.log(err)
                    $scope.main.loggedUser = ''
                    console.log('$location:')
                    $location.path('/admin/login')
                    console.log($location.path())
                    $scope.main.logoutError = err
                } else {
                    console.log('cannot reach session')
                    console.log(err)
                    $scope.main.loggedUser = ''
                    $location.path('/admin/login')
                    console.log($location.path())
                    $scope.main.logoutError = err

                }
               
             
         }, function erroHandler(err){
             console.log('trouble')
             $scope.main.logoutError = err
             
         })
  
         } 
         //
       
         // figure out if anyone is logged in
        $scope.whoLoggedIn = function(){
            if ($scope.main.loggedUser === ''){
                return false
            } else {
                return true
            }
        }
       //
       // dealing with photos upload
       
       var selectedPhotoFile;   // Holds the last file selected by the user
        console.log('updloading.....')
       // Called on file selection - we simply save a reference to the file in selectedPhotoFile
       $scope.inputFileNameChanged = function (element) {
           selectedPhotoFile = element.files[0];
           console.log(selectedPhotoFile)
       };
       
       // Has the user selected a file?
       $scope.inputFileNameSelected = function () {
           return !!selectedPhotoFile;
       };
       
       // Upload the photo file selected by the user using a post request to the URL /photos/new
       $scope.uploadPhoto = function () {
           if (!$scope.inputFileNameSelected()) {
               console.error("uploadPhoto called will no selected file");
               return;
           }
           console.log('fileSubmitted', selectedPhotoFile);
       
           // Create a DOM form and add the file to it under the name uploadedphoto
           var domForm = new FormData();
           domForm.append('uploadedphoto', selectedPhotoFile);
       
           // Using $http to POST the form
           $http.post('/photos/new', domForm, {
               transformRequest: angular.identity,
               headers: {'Content-Type': undefined}
           }).then(function successCallback(response){
               // The photo was successfully uploaded. XXX - Do whatever you want on success.
           }, function errorCallback(response){
               // Couldn't upload the photo. XXX  - Do whatever you want on failure.
               console.error('ERROR uploading photo', response);
           });
       
       };
    }]);

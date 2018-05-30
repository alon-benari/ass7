'use strict';

cs142App.controller('LoginRegisterController', ['$scope','$resource','$location',
    
    function ($scope, $resource, $location) {
      
      $scope.processForm = function(){
             var users = $resource('/admin/login',{});
             users.save({login:$scope.formData.login,pswd:$scope.formData.pswd},function(data){
                 $scope.formData.posting = data
                 $scope.main.loggedUser = data.first_name
                 console.log($scope.main.loggedUser)
                 console.log($scope.formData.posting)
                 $location.path('/users/'+data._id)
              
               },function errorHandling(err){
                 $scope.formData.error = err.data.err //'User Was not found consider registering.'
               })
                 
             }

         $scope.register = function(){
             console.log('wanting to register')
             $scope.register.registerMe = true
        }
        
        $scope.regUser = {loginName:$scope.register.loginName,
          first_name:$scope.register.firstName,
          last_name:$scope.register.lastName,
          password:$scope.register.password0,
          location:$scope.register.location,
          description:$scope.register.description,
          occupation:$scope.register.occupation}

        var originalUser = angular.copy($scope.regUser)

        $scope.resetForm = function(){
          console.log('trying to clear the form')
          // $scope.regUser = angular.copy(originalUser)
          $scope.register.loginName = '';
          $scope.register.firstName = '';
          $scope.register.lastName = '';
          $scope.register.password0 = '';
          $scope.register.password1 = '';
          $scope.register.location= '';
          $scope.register.description = '';
          $scope.register.occupation = '';
        }

        $scope.processRegistration = function(){
          if ($scope.register.password0 ===$scope.register.password1){
             var registration = $resource('/user')
             registration.save({login_name:$scope.register.loginName,
                              first_name:$scope.register.firstName,
                              last_name:$scope.register.lastName,
                              password:$scope.register.password0,
                              location:$scope.register.location,
                              description:$scope.register.description,
                              occupation:$scope.register.occupation},function(regStatus){
              // console.log('regStatus: ',regStatus)
              // $scope.resetForm()
              $scope.register.err = regStatus.err
              
            }, function errorHandling(err){
               $scope.register.err = err.data.err
               
            })
          } else {
            $scope.register.err ='Passwords mis-match, try again'
          }
         
          
        }
      
    }]);
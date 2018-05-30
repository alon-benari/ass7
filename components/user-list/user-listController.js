'use strict';

cs142App.controller('UserListController', ['$scope','$resource',
    function ($scope, $resource) {
    
    
       
        //  $scope.main.userList =  window.cs142models.userListModel();
        var users = $resource('/user/list',{},{'method':'get', isArray:true});
        
        var data = users.query(function(d){
            $scope.main.userListModel = d;
        });

       
    }]);


'use strict';

cs142App.controller('UserDetailController', ['$scope', '$routeParams','$resource',
  function ($scope, $routeParams,$resource) {
    /*
     * Since the route is specified as '/users/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    $scope.main.show = false;
    var userId = $routeParams.userId;
    console.log('UserDetail of ', userId);
    
    
    // console.log('window.cs142models.userModel($routeParams.userId)',
        // window.cs142models.userModel(userId));

    // $scope.main.usersModel =  window.cs142models.userModel(userId)
    $scope.main.uId = userId;
    // console.log($scope.main)
    $scope.main.context = 'now scoping: ';
    //
    var userById = $resource('/user/:_id',{_id:'@id'},{action:{method:'get'}});
    userById.get({_id:userId},function(userDetails){
        $scope.main.usersModel = userDetails;
    });
  }]);

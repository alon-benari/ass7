'use strict';

cs142App.controller('UserPhotosController', ['$scope', '$routeParams','$resource',
  function($scope, $routeParams, $resource) {
    /*
     * Since the route is specified as '/photos/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    var userId = $routeParams.userId;
    //
    // var number = $routeParams.photoId
    //
    console.log('UserPhoto of ', $routeParams.userId);

    $scope.main.context = 'Photos of: ';
    var userPhotos = $resource('/photosOfUser/:_id',{_id:'@id'},{method:'get'});
    userPhotos.query({_id:userId},function(userPhotoList){
        $scope.main.photoData = userPhotoList;
        console.log(userPhotoList)
        console.log('userPhotoList: ',userPhotoList);
    });
   
    $scope.addComment = function(){
      
      var img_id = this.x._id
      console.log($scope.addComment.img_id)
      console.log('loggedUser:',$scope.main.loggedUser)
      $scope.addComment.photoResource=this.x
      //
      $scope.addComment.newLine = {
        date_time:Date(),
        comment:$scope.addComment.newComment
      }
      $scope.addComment.existingComment = this.x.comments 
      // figure out last name of logged in user
      var loggedInDetails = $resource('/user/list')
     
       loggedInDetails.query(function(result){
         result.forEach(function(el){
           if (el.first_name.toLowerCase() === $scope.main.loggedUser.toLowerCase()){
             console.log('we have a match')
             var user = {
                user_id:el._id,
                first_name:el.first_name,
                last_name:el.last_name
             }
             console.log('user: ',user)
             console.log('exisitngComments before: ',$scope.addComment.existingComment)
             $scope.addComment.newLine.user = user
             
             console.log('newComment: ',$scope.addComment.newLine)
             $scope.addComment.existingComment.push($scope.addComment.newLine)
             
             console.log('exisitngComments after: ',$scope.addComment.existingComment)
             //pack it in.
             console.log("photo_id: ",img_id)
             console.log('updated comment array: ',$scope.addComment.existingComment)
            // make the update
             var photoToCommentOn = $resource('/commentsOfPhoto/:photo_id')
             photoToCommentOn.save({photo_id:img_id},{comments:$scope.addComment.existingComment}, function (comment){
               console.log(comment)
             })

             return
           } else {
             console.log('we have an error')
             return
           }
         })
       })
    
    

      
    }
    

  }]);

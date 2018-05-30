'use strict';

cs142App.controller('UserPhotosByIdController', ['$scope', '$routeParams','$location','$resource',
  function($scope, $routeParams,$location, $resource) {


    /*
     * Since the route is specified as '/photos/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    var id = $routeParams.userId;
    var photoId = $routeParams.photoId;
    
    // console.log('UserPhoto of ', $routeParams.userId);
    // console.log('photo Id: ' ,$routeParams.photoId);


    // make a POST request to the server
    var userPhotos = $resource('/photos/:user_id')
    // var userPhotos = $resource('/photosOfUser/:_id',{_id:'@id'},{method:'get'});
    console.log(userPhotos)
    userPhotos.query({user_id:id},function(photoInfo){
      console.log(photoInfo)
    })

//     $scope.main.context = 'Photos of: ';
//     //console.log($scope.main.photoDataById)
//     //
//     //Make a call to the server
//     $scope.doneCallBack = function(model){
//       $scope.$apply(function(){
//           $scope.main.photoDataById= model; // The update happens here.
//           // console.log($scope.main.photoDataById);
       
//           //console.log('***Get Photo by userid and photoId****')
//       });
//   };


//   $scope.FetchModel = function(url,doneCallBack){
//       var xhttp2 = new XMLHttpRequest();
//       xhttp2.onreadystatechange = function(){
//           if (this.readyState === 4 && this.status === 200) {
//             $scope.data = JSON.parse(this.responseText);
//             $scope.doneCallBack($scope.data);
//         }
//        };
//        xhttp2.open("GET",url,true);
//        xhttp2.send();
       
       
//       };

  
//    $scope.FetchModel("photosOfUser/"+userId+"/photo/"+photoId, $scope.doneCallBack);
   

// //Figure out how many images there are.
// $scope.doneCallBack2 = function(model){
//   $scope.$apply(function(){
//       $scope.main.photoData= model; // The update happens here.
//       console.log($scope.main.photoData);
//       $scope.main.photoStack = $scope.main.photoData.length;
//   });
// };

// $scope.getPhotoStack = function(url,doneCallBack){
//   var xhttp2 = new XMLHttpRequest();
//   xhttp2.onreadystatechange = function(){
//       console.log(this.readyState, this.status);
//       if (this.readyState === 4 && this.status === 200) {
//         $scope.data = JSON.parse(this.responseText);
//         $scope.doneCallBack2($scope.data);
//     }
//    };
//    xhttp2.open("GET",url,true);
//    xhttp2.send();

//   };

// $scope.getPhotoStack("photosOfUser/"+userId, $scope.doneCallBack2);
//    //$scope.main.photoStack = 4;

      $scope.nextPhoto = function(){
        var pid =  $location.url().split('/')[4];
        var uid = $location.url().split('/')[2];
        pid = parseInt(pid)+1;
        // console.log(pid)
        if (pid< $scope.main.photoStack){
          document.getElementById("nextPhoto").disabled = false;
          $location.path('/photos/'+uid+'/photo/'+pid);
        }else {
            document.getElementById("nextPhoto").disabled = true;
        }
      };
   
      $scope.prevPhoto = function(){
        var pid =  $location.url().split('/')[4];
        var uid = $location.url().split('/')[2];
        pid = parseInt(pid)-1;
        console.log(pid);
       
        if (pid >=0){
          document.getElementById("nextPhoto").disabled = false;
          $location.path('/photos/'+uid+'/photo/'+pid);
          if (pid === 0){
            document.getElementById("prevPhoto").disabled = true;
          }
          
        }else{
          console.log('to disable from prev');
          document.getElementById("prevPhoto").disabled = true;
        }
      };

  }]);


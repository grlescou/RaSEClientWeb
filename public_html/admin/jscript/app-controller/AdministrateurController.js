



app.controller('AdmCntr', function($scope,$location, $http ) {
  
  $scope.toshow = true;

  $scope.message= "loading...";
  $scope.listAmin= [];
  $scope.listZone= [];
   console.log("Page Controller Utilisateur");

  var conf = {
      headers : {
            'Content-Type' : 'application/json'
        }
    };
    
    var apiServer = new ApiServer();
    
    


    $http.get(apiServer.getURLAdministrateur(),conf)
        .success(function (data, status, headers, conf)
        {
        	 $scope.message= " i'm in";
          console.log(data);
          $scope.listAmin= data;
         
      if (data.leng){
        console.log(data);
        $scope.message = "read";
        //$location.path('/home');
      }
      else{
        $scope.message = data.message
      }
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
        });

 
   // get departement
       $http.get(apiServer.getURLZone(),conf)
        .success(function (data, status, headers, conf)
        {
           $scope.message= " i'm in";
           console.log(data);
           $scope.listZone= data;
     // $scope.symptomefilter=function(selectSymptome){   
      if (data.length){
        console.log(data);
        $scope.message = "read";
        //$location.path('/home');
      }
      else{
        $scope.message = data.message
      }
 // } 
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
        });  



    
});













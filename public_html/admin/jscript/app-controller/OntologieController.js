





app.controller('ontoCntr', function($scope,$route,$location, $http ) {
  
  $scope.toshow = true;

  $scope.message= "loading...";
  $scope.listMaladie= [];
  $scope.listCategorie= [];
  $scope.listSymptome= [];

  $scope.tab = [true,false,false];

   console.log("Page Controller Utilisateur");

  var conf = {
      headers : {
            'Content-Type' : 'application/json'
        }
    };
  
    var apiServer = new ApiServer();

    
       // get Categorie
       $http.get(apiServer.getURLCategeorie(),conf)
        .success(function (data, status, headers, conf)
        {
        	 $scope.message= " i'm in";
          console.log(data);
           $scope.listCategorie= data;
         
      if (data.leng){
        console.log(data);
        $scope.message = "read";
        //$location.path('/home');
      }
      else{
        $scope.message = data.message;
      }
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
        });
        
        
  /*      

    // get maladie
    $http.get(apiServer.getURLMaladie(),conf)
        .success(function (data, status, headers, conf)
        {
        	 $scope.message= " i'm in";
          console.log(data);
          $scope.listMaladie= data;

         
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





        // get Symptome
       $http.get(apiServer.getURLSymptome(),conf)
        .success(function (data, status, headers, conf)
        {
        	 $scope.message= " i'm in";
          console.log(data);
           $scope.listSymptome= data;
         
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


 */

 
   
        $scope.onClick = function($tab){

        	//$location.path('/ontologie');
			//$route.reload();

        	$scope.tab = [false,false,false];
        	$scope.tab[$tab] = true;
                
                
                if($tab === 0)
                {
                                // get Categorie
                    $http.get(apiServer.getURLCategeorie(),conf)
                     .success(function (data, status, headers, conf)
                     {
                              $scope.message= " i'm in";
                       console.log(data);
                        $scope.listCategorie= data;

                   if (data.leng){
                     console.log(data);
                     $scope.message = "read";
                     //$location.path('/home');
                   }
                   else{
                     $scope.message = data.message;
                   }
                     })
                     .error(function (data, status, headers, conf)
                     {
                       $scope.message = "SUBMIT ERROR";
                     });

   
                }
                 if($tab === 1)
                {
                    
                                    // get maladie
                  $http.get(apiServer.getURLMaladie(),conf)
                      .success(function (data, status, headers, conf)
                      {
                               $scope.message= " i'm in";
                        console.log(data);
                        $scope.listMaladie= data;


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

                    
                }
                 if($tab === 2)
                {
                    
                                // get Symptome
                  $http.get(apiServer.getURLSymptome(),conf)
                   .success(function (data, status, headers, conf)
                   {
                            $scope.message= " i'm in";
                     console.log(data);
                      $scope.listSymptome= data;

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


                    
                }
                
                
			


			console.log("table onClick result "+ $tab);
			


		}



    
});













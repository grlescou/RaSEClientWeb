





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
  

    // get maladie
    $http.get("http://192.168.127.140:8080/rasehtserver/api/v1/maladie/",conf)
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



       // get Categorie
       $http.get("http://192.168.127.140:8080/rasehtserver/api/v1/categorie/",conf)
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
        $scope.message = data.message
      }
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
        });


        // get Symptome
       $http.get("http://192.168.127.140:8080/rasehtserver/api/v1/symptome/",conf)
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


 

 
   
        $scope.onClick = function($tab){

        	//$location.path('/ontologie');
			//$route.reload();

        	$scope.tab = [false,false,false];
        	$scope.tab[$tab] = true;
			


			console.log("table onClick result "+ $tab)
			


		}



    
});













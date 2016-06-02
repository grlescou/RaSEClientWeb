



app.controller('AnalyseReportCntr', function($rootScope,$location, $http ) {
  
  //$scope.toshow = true;

  $rootScope.message= "loading...";
  $rootScope.listCasMaladie= [];
   console.log("Page Controller Utilisateur");

  var conf = {
      headers : {
            'Content-Type' : 'application/json'
        }
    };
    
    var apiServer = new ApiServer();
    
    
    $rootScope.onClickAnalyse = function(){


    $http.get(apiServer.getURLCasMaladie(),conf)
        .success(function (data, status, headers, conf)
        {
        	 $rootScope.message= " i'm in";
          console.log(data);
          $rootScope.listCasMaladie= data;
         
      if (data.leng){
        console.log(data);
        $rootScope.message = "read";
        //$location.path('/home');
      }
      else{
        $rootScope.message = data.message
      }
        })
        .error(function (data, status, headers, conf)
        {
          $rootScope.message = "SUBMIT ERROR";
        });

 
    };



    
});













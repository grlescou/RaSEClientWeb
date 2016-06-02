
app.controller('mentionCntr', function($scope,$location, $http ) {
  
  $scope.toshow = true;

  $scope.message= "loading...";
  $scope.listMention= [];
   console.log("Page Controller Utilisateur");

  var conf = {
      headers : {
            'Content-Type' : 'application/json'
        }
    };
    
    var apiServer = new ApiServer();
    
    

//Get Mention
  // get Mention
                $http.get(apiServer.getURLMention(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                     $scope.listMention= data;
                   
                    //$scope.categorieInstance.changeData($scope.listCategorie);
                    //$route.reload();
            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });
 
  



    
});













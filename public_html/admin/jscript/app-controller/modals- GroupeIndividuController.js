
// I control the root of the application.
     angular.module('RaseApp').controller('ModalGroupeIndividuCtrl', function ($scope,$route, $uibModal, $log,$location,$http) {
         var apiServer = new ApiServer();
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.groupeNew={}
  $scope.groupeEdit = {};
  $scope.groupeEdit.nom = "google";
  
  $scope.listMention=[];
  
  $scope.groupeNew.m={};
  $scope.groupeNew.m.mention={};
  $scope.groupeNew.listMention=[];
   


  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });





    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

 
   $scope.openEdit = function (size, role) {

     $scope.roleEdit = role;
     //console.log(user);
     //console.log($scope.userEdit);

   var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'editmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.roleEdit;
        }
      }
    });






     modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;

 	   console.log('in isntance result categorie');
 	   console.log($scope.selected);
           
           
        var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
          
          // PUT GroupeIndividu 
       $http.put(apiServer.getURLGroupeIndividu()+$scope.selected.id,$scope.selected,conf)
        .success(function (data, status, headers, conf)
        {
        	
          console.log(data);
         
        $scope.message= data.message;
        $scope.success= data.success;
         
        
         
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
           $scope.success= false;
        });


         
           


    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openNew = function (size) {
      $scope.groupeNew.m={};
      $scope.groupeNew.m.mention = {};
    
        var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
    
                // get Mention
                $http.get(apiServer.getURLMention(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log("listMention");
                   console.log(data);
                    $scope.groupeNew.listMention= data;
                    //window.location.reload();
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });



    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'newmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.groupeNew;
        }
      }
    });


     modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      
    
      //-------------------------
      
       console.log('in isntance result Groupe Individu');
       console.log($scope.selected);
           
           
        var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
          
          // POST Groupe Individu 
       $http.post(apiServer.getURLGroupeIndividu(),$scope.selected,conf)
        .success(function (data, status, headers, conf)
        {
        	
        console.log(data);
         
        $scope.message= data.message;
        $scope.success= data.success;
         
          if(data.success === true){
              console.log("most be reload");
            //$location.path('/ontologie');
		//$route.reload();
              //$scope.refresh();
              
         
              
          // $scope.categorieInstance.api.reloadData(callback,restPaging);
           
            // get GroupeIndividu
                $http.get(apiServer.getURLGroupeIndividu(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                     $scope.listGIndividu= data;
                   
                    //$scope.categorieInstance.changeData($scope.listCategorie);
                    //$route.reload();
            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });

                 
//
//        	$scope.tab = [false,false,false];
//        	$scope.tab[2] = true;
         }
      
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
           $scope.success= false;
        });

        $scope.roleNew ={};
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


 $scope.openDel = function (size,groupeDel) {

 	$scope.groupeDel = groupeDel;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'delmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.groupeDel;
        }
      }
    });


     modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      
      console.log('in isntance result categorie');
 	   console.log($scope.selected);
           
           
        var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
          
          // delete role 
       $http.delete(apiServer.getURLGroupeIndividu()+$scope.selected.id,conf)
        .success(function (data, status, headers, conf)
        {
        	
          console.log(data);
         
        $scope.message= data.message;
        $scope.success= data.success;
         
          if(data.success === true){
              console.log("most be reload");
            
            // get Role
                $http.get(apiServer.getURLGroupeIndividu(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                    $scope.listGIndividu= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });



        	$scope.tab = [false,false,false];
        	$scope.tab[0] = true;
         }
      
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
           $scope.success= false;
        });

        $scope.roleNew ={};
         
         


    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  $scope.openDetails = function (size,groupeDetails) {

 	$scope.groupeDetails = groupeDetails;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'detailsmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.groupeDetails;
        }
      }
    });


     modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;



    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };




  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('RaseApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };




$scope.EditSave= function(){
 		console.log("edit save action");
    	console.log($scope.items);
    	 $uibModalInstance.close($scope.items);
    };
 

});
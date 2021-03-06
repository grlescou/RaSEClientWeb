

// I control the root of the application.
    angular.module('RaseApp').controller('ModalParamCtrl', function ($scope,$route, $uibModal, $log,$location,$http) {

var apiServer = new ApiServer();
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.paramNew={};
  $scope.paramEdit = {};
  $scope.paramEdit.nom = "google";


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

 
   $scope.openEdit = function (size, param) {

     $scope.paramEdit = param;
     //console.log(user);
     //console.log($scope.userEdit);

   var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'editmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.paramEdit;
        }
      }
    });






     modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;

 	   console.log('in isntance result parametre');
 	   console.log($scope.selected);
           
           
        var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
          
          // PUT categorie 
       $http.put(apiServer.getURLParametre()+$scope.selected.id,$scope.selected,conf)
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

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'newmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.paramNew;
        }
      }
    });


     modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      
    
      //-------------------------
      
       console.log('in isntance result Parametre');
       console.log($scope.selected);
           
           
        var conf = {
            headers : {
                  'Content-Type' : 'application/json'
              }
         };
          
          // POST parametre 
       $http.post(apiServer.getURLParametre(),$scope.selected,conf)
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
           
            // get Parametre
                $http.get(apiServer.getURLParametre(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                     $scope.listParametre= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
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

        $scope.paramNew ={};
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


 $scope.openDel = function (size,paramDel) {

 	$scope.paramDel = paramDel;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'delmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.paramDel;
        }
      }
    });


     modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      
      console.log('in isntance result paramètre');
 	   console.log($scope.selected);
           
           
        var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
          
          // delete Parametre 
       $http.delete(apiServer.getURLParametre()+$scope.selected.id,conf)
        .success(function (data, status, headers, conf)
        {
        	
          console.log(data);
         
        $scope.message= data.message;
        $scope.success= data.success;
         
          if(data.success === true){
              console.log("most be reload");
            
            // get Parametre
                $http.get(apiServer.getURLParametre(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                    $scope.listParametre= data;
                    
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

        $scope.paramNew ={};
         
         


    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  $scope.openDetails = function (size,paramDetails) {

 	$scope.paramDetails = paramDetails;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'detailsmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.paramDetails;
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
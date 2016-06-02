

// I control the root of the application.
    angular.module('RaseApp').controller('ModalUserCtrl', function ($scope,$route, $uibModal, $log,$location,$http) {
        var apiServer = new ApiServer();
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.userNew={}
        $scope.userEdit = {};
        $scope.userEdit.nom = "google";
        
        // role in user
        $scope.userNew.selectRole=[];
        $scope.userNew.m={};
        $scope.userNew.m.role = {};
        
        $scope.userEdit.selectRole = [];//[{id:"1232",nom:"c1",description:"c1"},{id:"123232",nom:"c2",description:"c2"},{id:"12787732",nom:"c3",description:"c3"}];
        $scope.userEdit.m={};
        $scope.userEdit.m.role = {};
        
        //mention
        $scope.userNew.selectMention=[];
        $scope.userNew.m={};
        $scope.userNew.m.nom = {};
        
        $scope.userEdit.selectMention = [];//[{id:"1232",nom:"c1",description:"c1"},{id:"123232",nom:"c2",description:"c2"},{id:"12787732",nom:"c3",description:"c3"}];
        $scope.userEdit.m={};
        $scope.userEdit.m.nom = {};
        
        $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
         $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
     

 

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

 
   $scope.openEdit = function (size, user) {

     $scope.userEdit = user;
     
       var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
    
                // get Role
                $http.get(apiServer.getURLRole(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log("selectRole");
                   console.log(data);
                    $scope.userEdit.selectRole= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });
                  // get Mention
                $http.get(apiServer.getURLMention(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log("selectRole");
                   console.log(data);
                    $scope.userEdit.selectMention= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });


    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'editmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.userEdit;
        }
      }
    });






     modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      
         //-------------------------
      
       console.log('in isntance result Maladie');
 	   console.log($scope.selected);
           
           
        
          
          var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
          
          
          // PUT Utilisateur 
       $http.put(apiServer.getURLUtilisateur()+$scope.selected.id,$scope.selected,conf)
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
           
                 // get Maladie
                $http.get(apiServer.getURLUtilisateur(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                    $scope.listUser= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });



        	
         }
      
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
           $scope.success= false;
        });

        $scope.userEdit ={};
         
      
      //-----------------------------------
         
      

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  $scope.openNew = function (size) {
      
        $scope.userNew.m={};
        $scope.userNew.m.role = {};
        //get role
        var conf = {
      headers : {
            'Content-Type' : 'application/json'
        }
    };
    
    var apiServer = new ApiServer();
    //get Role
     $http.get(apiServer.getURLRole(),conf)
        .success(function (data, status, headers, conf)
        {
        	 $scope.message= " i'm in";
          console.log(data);
          $scope.userNew.selectRole= data;
         
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
        //get Mention
     $http.get(apiServer.getURLMention(),conf)
        .success(function (data, status, headers, conf)
        {
        	 $scope.message= " i'm in";
          console.log(data);
          $scope.userNew.selectMention= data;
         
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
        
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'newmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.userNew;
        }
      }
    });


     modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      
    
      //-------------------------
      
       console.log('in isntance result Utilisateur');
       console.log($scope.selected);
           
           
        var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
          
          // POST Utilisateur 
          
       $http.post(apiServer.getURLUtilisateur(),$scope.selected,conf)
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
           
            // get Symptome
                $http.get(apiServer.getURLUtilisateur(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                     $scope.listUser= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });



        	$scope.tab = [false,false,false];
        	$scope.tab[2] = true;
         }
      
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
           $scope.success= false;
        });

        $scope.userNew ={};
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


 $scope.openDel = function (size,userDel) {

 	$scope.userDel = userDel;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'delmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.userDel;
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
          
          // delete Utilisateur 
       $http.delete(apiServer.getURLUtilisateur()+$scope.selected.id,conf)
        .success(function (data, status, headers, conf)
        {
        	
          console.log(data);
         
        $scope.message= data.message;
        $scope.success= data.success;
         
          if(data.success === true){
              console.log("most be reload");
            
            // get Utilisateur
                $http.get(apiServer.getURLUtilisateur(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                    $scope.listUser= data;
                    
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

        $scope.userNew ={};
         
         


    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



  $scope.openDetails = function (size,userDetails) {

 	$scope.userDetails = userDetails;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'detailsmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.userDetails;
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


// I control the root of the application.
     angular.module('RaseApp').controller('ModalMentionCtrl', function ($scope,$route, $uibModal, $log,$location,$http) {
         var apiServer = new ApiServer();
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.mentionNew={}
  $scope.mentionEdit = {};
  $scope.mentionEdit.nom = "google";
  
  $scope.listMention=[];
  
  $scope.mentionNew.m={};
  $scope.mentionNew.m.groupeIndividu={};
  $scope.mentionNew.selectGIndividu=[];
   


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

 
   $scope.openEdit = function (size, mention) {

     $scope.mentionEdit = mention;
     //console.log(user);
     //console.log($scope.userEdit);

   var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'editmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.mentionEdit;
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
          
          // PUT Mention 
       $http.put(apiServer.getURLMention()+$scope.selected.id,$scope.selected,conf)
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
      $scope.mentionNew.m={};
      $scope.mentionNew.m.groupeIndividu = {};
    
        var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
    
                // get Groupe Individu
                $http.get(apiServer.getURLGroupeIndividu(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log("listGroupeIndividu");
                   console.log(data);
                    $scope.mentionNew.selectGIndividu= data;
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
          return $scope.mentionNew;
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
          
          // POST Mention
       $http.post(apiServer.getURLMention(),$scope.selected,conf)
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

        $scope.mentionNew ={};
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


 $scope.openDel = function (size,mentionDel) {

 	$scope.mentionDel = mentionDel;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'delmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.mentionDel;
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
          
          // delete Mention 
       $http.delete(apiServer.getURLMention()+$scope.selected.id,conf)
        .success(function (data, status, headers, conf)
        {
        	
          console.log(data);
         
        $scope.message= data.message;
        $scope.success= data.success;
         
          if(data.success === true){
              console.log("most be reload");
            
            // get Mention
                $http.get(apiServer.getURLMention(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                    $scope.listMention= data;
                    
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

        $scope.mentionNew ={};
         
         


    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  $scope.openDetails = function (size,mentionDetails) {

 	$scope.mentionDetails = mentionDetails;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'detailsmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.mentionDetails;
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
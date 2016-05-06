



// I control the root of the application.
     angular.module('RaseApp').controller('ModalOntoCtrl', function ($scope,$route, $uibModal, $log,$location,$http) {
         var apiServer = new ApiServer();
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.userEdit = {};
  

  $scope.userEdit.nom = "google";

  $scope.CategorieNew ={};
  $scope.categorieEdit= {};
  $scope.categorieDel ={};
  $scope.categorieInstance={};
  
  $scope.MaladieNew ={};
   $scope.MaladieEdit ={};
   $scope.MaladieDel ={};
   
    $scope.MaladieNew.selectCategories = [];//[{id:"1232",nom:"c1",description:"c1"},{id:"123232",nom:"c2",description:"c2"},{id:"12787732",nom:"c3",description:"c3"}];
    $scope.MaladieNew.m={};
     $scope.MaladieNew.m.categorie = {};
     
       $scope.MaladieEdit.selectCategories = [];//[{id:"1232",nom:"c1",description:"c1"},{id:"123232",nom:"c2",description:"c2"},{id:"12787732",nom:"c3",description:"c3"}];
    $scope.MaladieEdit.m={};
     $scope.MaladieEdit.m.categorie = {};
     
    $scope.SymptomeNew  = {};
     $scope.SymptomeEdit  = {};
      $scope.SymptomeDel  = {};

     $scope.LaMaladie = {};
     $scope.LaMaladie.maladie ={};
     
     $scope.ListSymptomeInstance ={};

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



  	// partie commande Maladide
 
   $scope.openEditMaladide = function (size, maladie) {

    
     //console.log(user);
     //console.log($scope.userEdit);
     
      $scope.MaladieEdit.m= maladie;
     /// $scope.MaladieEdit.m.categorie = {};
    
        var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
    
                // get Categorie
                $http.get(apiServer.getURLCategeorie(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log("selectCategories");
                   console.log(data);
                    $scope.MaladieEdit.selectCategories= data;
                    
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
          return $scope.MaladieEdit;
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
          
          // PUT categorie 
       $http.put(apiServer.getURLMaladie()+$scope.selected.id,$scope.selected,conf)
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
                $http.get(apiServer.getURLMaladie(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                    $scope.listMaladie= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });



        	$scope.tab = [false,false,false];
        	$scope.tab[1] = true;
         }
      
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
           $scope.success= false;
        });

        $scope.MaladieEdit ={};
         
      
      //-----------------------------------
         
      

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  $scope.openNewMaladide = function (size) {
      $scope.MaladieNew.m={};
      $scope.MaladieNew.m.categorie = {};
    
        var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
    
                // get Categorie
                $http.get(apiServer.getURLCategeorie(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log("selectCategories");
                   console.log(data);
                    $scope.MaladieNew.selectCategories= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });


  // = $scope.selectCategories;
       


    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'newmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return  $scope.MaladieNew;
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
          
          // POST Maladie 
       $http.post(apiServer.getURLMaladie(),$scope.selected,conf)
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
                $http.get(apiServer.getURLMaladie(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                    $scope.listMaladie= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });



        	$scope.tab = [false,false,false];
        	$scope.tab[1] = true;
         }
      
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
           $scope.success= false;
        });

        $scope.MaladieNew ={};
         
      
      //-----------------------------------
      
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


 $scope.openDelMaladide = function (size,maladie) {

 	$scope.MaladieDel = maladie;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'delmodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.MaladieDel;
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
          
          // delete Maladie
       $http.delete(apiServer.getURLMaladie()+$scope.selected.id,conf)
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
                $http.get(apiServer.getURLMaladie(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                    $scope.listMaladie= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });



        	$scope.tab = [false,false,false];
        	$scope.tab[1] = true;
         }
      
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
           $scope.success= false;
        });

        $scope.MaladieDel={};
         
         

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



  $scope.openDetailsMaladide = function (size,userDetails) {

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







// partie commande Categorie
 
   $scope.openEditCategorie = function (size, categorie) {

     $scope.categorieEdit = categorie;
     //console.log(user);
     //console.log($scope.userEdit);

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'editCategoriemodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.categorieEdit;
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
          
          // PUT categorie 
       $http.put(apiServer.getURLCategeorie()+$scope.selected.id,$scope.selected,conf)
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


  $scope.openNewCategorie = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'newCategoriemodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return  $scope.CategorieNew;
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
          
          // POST categorie 
       $http.post(apiServer.getURLCategeorie(),$scope.selected,conf)
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
              
              var restPaging = false;
              function callback(json){
             console.log(json);
         }
              
          // $scope.categorieInstance.api.reloadData(callback,restPaging);
           
            // get Categorie
                $http.get(apiServer.getURLCategeorie(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                    $scope.listCategorie= data;
                    
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

        $scope.CategorieNew ={};
         
         
      
      
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  

 $scope.openDelCategorie = function (size,categorieDel) {

 	$scope.categorieDel = categorieDel;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'delCategoriemodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.categorieDel;
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
          
          // delete categorie 
       $http.delete(apiServer.getURLCategeorie()+$scope.selected.id,conf)
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
           
            // get Categorie
                $http.get(apiServer.getURLCategeorie(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                    $scope.listCategorie= data;
                    
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

        $scope.CategorieNew ={};
         
         


    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



  $scope.openDetailsCategorie = function (size,userDetails) {

 	$scope.userDetails = userDetails;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'detailsCategoriemodal.html',
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





// partie commande Symptome
 
   $scope.openEditSymptome = function (size, symptome) {

     $scope.SymptomeEdit = symptome;
     //console.log(user);
     //console.log($scope.userEdit);

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'editSymptomemodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.SymptomeEdit;
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
          
          // PUT categorie 
       $http.put(apiServer.getURLSymptome()+$scope.selected.id,$scope.selected,conf)
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


        $scope.SymptomeEdit ={};

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  $scope.openNewSymptome = function (size) {
      
      
    
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'newSymptomemodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return  $scope.SymptomeNew;
        }
      }
    });


     modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      
    
      //-------------------------
      
       console.log('in isntance result Symptome');
 	   console.log($scope.selected);
           
           
        var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
          
          // POST Symptome 
       $http.post(apiServer.getURLSymptome(),$scope.selected,conf)
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
                $http.get(apiServer.getURLSymptome(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                     $scope.listSymptome= data;
                    
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

        $scope.SymptomeNew ={};
         
      
      
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


 $scope.openDelSymptome = function (size,symptome) {

 	$scope.SymptomeDel = symptome;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'delSymptomemodal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.SymptomeDel ;
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
          
          // delete Symptome 
       $http.delete(apiServer.getURLSymptome()+$scope.selected.id,conf)
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
           
            // get Categorie
                $http.get(apiServer.getURLSymptome(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                    $scope.listSymptome= data;
                    
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

       $scope.SymptomeDel  ={};
         
         
      

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



  $scope.openDetailsSymptome = function (size,userDetails) {

 	$scope.userDetails = userDetails;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'detailsSymptomemodal.html',
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





// ajouter symptomes a une maladie 

 $scope.openAjouterSymptomeMaladide = function (size,maladie) {

 	$scope.LaMaladie.maladie = maladie;
        
        $scope.LaMaladie.listSymptomes = {};
        $scope.LaMaladie.symp = {};
        
         var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
    
                // get Symptomes
                $http.get(apiServer.getURLSymptome(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log("selectCategories");
                   console.log(data);
                    $scope.LaMaladie.listSymptomes= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });

        

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'AddSymptomemodal.html',
      controller: 'ModalOntoInstanceCtrlOnto',
      size: size,
      resolve: {
        items: function () {
          return $scope.LaMaladie;
        }
      }
    });


     modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;

      
      
      console.log('in isntance result Maladie');
 	   console.log($scope.selected);
           
           
        
          
          var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
          
          // PUT categorie 
       $http.put(apiServer.getURLMaladie()+$scope.selected.id,$scope.selected,conf)
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
                $http.get(apiServer.getURLMaladie(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                    $scope.listMaladie= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });



        	$scope.tab = [false,false,false];
        	$scope.tab[1] = true;
         }
      
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
           $scope.success= false;
        });

        $scope.MaladieEdit ={};
         
      
      //-----------------------------------
         
      
      
      

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



//========================================

$scope.openRmSymptomeMaladide = function (size,maladie) {

 	$scope.LaMaladie.maladie = maladie;
        
        $scope.LaMaladie.listSymptomes = {};
        $scope.LaMaladie.symp = {};
        
         var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
    
                // get Symptomes
                $http.get(apiServer.getURLSymptome(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log("selectCategories");
                   console.log(data);
                    $scope.LaMaladie.listSymptomes= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });

        

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'AddSymptomemodal.html',
      controller: 'ModalOntoInstanceCtrlOnto',
      size: size,
      resolve: {
        items: function () {
          return $scope.LaMaladie;
        }
      }
    });


     modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;

      
      
      console.log('in isntance result Maladie');
 	   console.log($scope.selected);
           
           
        
          
          var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
          
          // PUT categorie 
       $http.put(apiServer.getURLMaladie()+$scope.selected.id,$scope.selected,conf)
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
                $http.get(apiServer.getURLMaladie(),conf)
                 .success(function (data, status, headers, conf)
                 {
                        
                   console.log(data);
                    $scope.listMaladie= data;
                    
                    //$scope.categorieInstance.changeData($scope.listCategorie);

            
                 })
                 .error(function (data, status, headers, conf)
                 {
                   $scope.message = "Erreur de rafraichissement de la table";
                 });



        	$scope.tab = [false,false,false];
        	$scope.tab[1] = true;
         }
      
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
           $scope.success= false;
        });

        $scope.MaladieEdit ={};
         
      
      //-----------------------------------
         
      
      
      

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

angular.module('RaseApp').controller('ModalOntoInstanceCtrlOnto', function ($scope, $uibModalInstance, items) {

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

/*
 * 
$scope.rmSymptome= function(symptome){
    
    console.log("removing symptome :"+ symptome.nom);
    
    for(var i = $scope.selected.item.symptomes.length -1; i--;){
        
        if($scope.selected.item.symptomes[i].id === symptome.id){
            $scope.selected.item.symptomes[i].splice(i,1);
            console.log("symptome remove");
            $scope.ListSymptomeInstance.api.reloadData();
            
        }
    }
    
};
    
    
 */   
    
/*
$scope.rmSymptome= function(){
    console.log("removing symptome ");
    // $uibModalInstance.close($scope.items);

};

*/

$scope.EditSave= function(){
 		console.log("edit save action");
    	console.log($scope.items);
    	 $uibModalInstance.close($scope.items);
    };
 

$scope.EditCategoriebtn= function(){
 		console.log("edit save action");
    	console.log($scope.items);
    	 $uibModalInstance.close($scope.items);
    };
 




});
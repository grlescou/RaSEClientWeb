  //var app=angular.module('ReportApp');
        Rapp.controller('reportCntr', function ($scope,$route,$location,$http,$window) {
    var apiServer = new ApiServer();
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.selectMaladies=[];
    $scope.selectSymptome=[];
    $scope.selectProfession=[];
    $scope.selectMention=[];
    $scope.selectZone=[];
    $scope.listCasMaladie={};
    $scope.m={};
    $scope.m.nom={};
    //checkbox par défaut
    $scope.selected='Masculin';
    //checkbox par défaut
    $scope.checked='Moins_de_5';
//Liste des départements, des communes en fonction du departement choisi
$scope.departements={
    'OUEST':{
        'CARREFOUR':['BIZOTON','CORAIL THOR'],
        'PORT-AU-PRINCE':['MARTISSANT','TURGEAU'],
        'GANTHIER':['MARE ROSEAUX','FOND PARISIEN'],
        'THOMAZEAU':['CRACHUS','GRANDE PLAINE']
    },
    'SUD':{
        'LES ANGLAIS':['COSSE','EDELIN'],
        'CHARDONNIERES':['DEJOIE','RANDEL'],
        'AQUIN':['FLAMANT','MACEAN'],
        'LES CAYES':['BOURDET','LAURENT']
    },
    'NORD':{
        'MILOT':['PERCHES DU BONNET','GENIE PAILLER'],
        'LIMONADE':['BASSE PLAINE','ROUCOU'],
        'PLAISANCE':['MAPOU','LA TROUBLE'],
        'PILATE':['BAUDIN','MARGOT']
    }
     
};
    $scope.sexes = [{name:'Féminin',checked:false},{name:'Masculin',checked:false},{name:'Mixte',checked:false}];
    $scope.checkDevice = function (sexe) {
    for (var i = 0, len = $scope.sexes.length; i < len; ++i) {
        if ($scope.sexes[i] !== sexe){
             $scope.sexes[i].checked = false;
         }
           
    }
};
    //$scope.ages = [{name:'Moins de 5 ans'},{name:'Plus de 5 ans'},{name:'Mixte'}];
    
    console.log("Page controlleur report");
   
   $scope.doSomethingWithDate = function (date){
        //alert(date);
      };
      
    
  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };
  
  $scope.popup2 = {
    opened: false
  };

    var conf = {
      headers : {
            'Content-Type' : 'application/json'
        }
    };
  
    var apiServer = new ApiServer();

    
       // get maladie
       $http.get(apiServer.getURLMaladie(),conf)
        .success(function (data, status, headers, conf)
        {
           $scope.message= " i'm in";
           console.log(data);
           $scope.selectMaladies= data;
           
         
      if (data.length){
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
        
        // get symptome
       $http.get(apiServer.getURLSymptome(),conf)
        .success(function (data, status, headers, conf)
        {
           $scope.message= " i'm in";
           console.log(data);
           $scope.selectSymptome= data;
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
  // get mention
       $http.get(apiServer.getURLMention(),conf)
        .success(function (data, status, headers, conf)
        {
           $scope.message= " i'm in";
           console.log(data);
           $scope.selectMention= data;
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
    
  // get departement
       $http.get(apiServer.getURLZone(),conf)
        .success(function (data, status, headers, conf)
        {
           $scope.message= " i'm in";
           console.log(data);
           $scope.selectZone= data;
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
 
 // Check if symptome is checked       
        $scope.CheckSymptome=function()
        {
            $scope.isTrue= false;
            for (var i = 0, len = $scope.selectSymptome.length; i < len; ++i)
            {
                if($scope.selectSymptome[i].checked)
                $scope.isTrue=true;
                
            }
            
            
        }
        
//        // get profession
//       $http.get(apiServer.getURLProfession(),conf)
//        .success(function (data, status, headers, conf)
//        {
//           $scope.message= " i'm in";
//           console.log(data);
//           $scope.selectProfession= data;
//     // $scope.symptomefilter=function(selectSymptome){   
//      if (data.length){
//        console.log(data);
//        $scope.message = "read";
//        //$location.path('/home');
//      }
//      else{
//        $scope.message = data.message;
//      }
// // } 
//        })
//        .error(function (data, status, headers, conf)
//        {
//          $scope.message = "SUBMIT ERROR";
//        });
// 
 //localiser automatiquement
$scope.locate=function(){
  //  $scope.latitude="0";
    //$scope.longitude="0";
        $scope.position = null;
           $window.navigator.geolocation.getCurrentPosition(function(position) {
            $scope.$apply(function() {
                  $scope.latitude=position.coords.latitude;
                  $scope.longitude=position.coords.longitude;
                 // $scope.location = position;
            });
        },function(error) {
            alert(error);
        });
        console.log(position);
}  
//annuler report
$scope.annuler=function(){
    $scope.reset();
};     
        //save report
        $scope.Envoyer=function(){
                 
            var data = {};
//            if($scope.nombreCas === undefined || $scope.note ===undefined)
//            {
//                 alert ("Champ obligatoire");
//            }else{
           
                   data.maladie= $scope.maladie;
                   data.mention=$scope.mention;
                   data.sexe= $scope.selected;
                   data.groupeAge= $scope.checked;
                   // tester si le champ date n'est pas rempli
                   if($scope.datepicker === undefined){
                       var now= new Date();
                       var annee= now.getFullYear();
                       var mois = ('0'+(now.getMonth()+1)).slice(-2);
                       var jour= now.getDate();
                       data.date= annee + "-" + mois + "-" + jour ;
                   }
                   else{
                       data.date=$scope.datepicker;
                   }
                   data.location=[$scope.longitude,$scope.latitude];
                   data.note= $scope.note;
                   data.nombreCas= $scope.cas;
                   data.zone={};
                   data.listeSymptome=[];
                   data.user={"id":"5734ab39fd9c76fbeece9c63"};
              // } 
            var conf = {
             headers : {
             'Content-Type' : 'application/json'
                }
             };
             console.log(data);
          //alert(data);
          // POST CasMaladie
       $http.post(apiServer.getURLCasMaladie(),data,conf)//$scope.selected
        .success(function (data, status, headers, conf)
        {
        	//alert(data);
          console.log(data);
         
        $scope.message= data.message;
        $scope.success= data.success;
         
          if(data.success === true){
              console.log("most be reload");
             // $scope.listCasMaladie=data;
              //get cas maladie
              //$http.get(apiServer.getURLCasMaladie(),$scope.selected,conf)
                
           // $scope.listCasMaladie.push(data);
            
//            //save symptome
//            var idx= $scope.selectSymptome.indexOf();
//            //is currently selected
//            if(idx> -1)
//            {
//                $scope.selectSymptome.splice(idx,1);
//            }
//            //is new selected
//            else
//            {
//                $scope.selectProfession.push();
//            }
//              $scope.alerts=[
//                  {type:'success',msg:'Message reporté'}
//              ];  
         }
      
        })
        .error(function (data, status, headers, conf)
        {
          $scope.message = "SUBMIT ERROR";
           $scope.success= false;
        });
            
        };
});
 




app.factory('UserSericeAuth',['$cookieStore','$http','SessionCookies',function($cookieStore,$http,SessionCookies){
   
        var UserService = {};
       
        
        UserService.login = function (mail, password, callback){
            
        
            var auth = {};
            auth.mail = mail;
            auth.password = password;
            
            var conf = {
                    headers : {
                   'Content-Type' : 'application/json'
                        }
             };
    
        var apiServer = new ApiServer();
      
        var Rdata = {};
    
            // POST Authentification (mail , password)
       $http.post(apiServer.getURLUtilisateur()+"auth",auth,conf)
        .success(function (data, status, headers, conf)
        {
        	
          console.log(data);
         
   
         
          if(data.success === true){
            
            
            if(data.t.actif && data.t.role.privilege === "Utilisateur")
            {
            Rdata.success = true;
            Rdata.message = data.message;
            Rdata.User = {};
            Rdata.isLogged = true;
            Rdata.User.mail = data.t.mail;
            Rdata.User.prenom = data.t.prenom;
            Rdata.User.nom = data.t.nom;
            Rdata.User.isActive = data.t.actif;
            Rdata.User.privilege = data.t.role.privilege;
            Rdata.User.groupeIndividu = data.t.mentionResponsabilite.groupeIndividu.nomGroupe;
            
            //Rdata.User.typeAdmin = data.t.typeAdmin;
            }
            else {
            Rdata.success = false;
            Rdata.message = "Vous n'avez pas assez de privilege ou votre compte est inactif";
            Rdata.User = {};
            Rdata.isLogged = false;
            Rdata.User.mail = "";
            Rdata.User.prenom ="";
            Rdata.User.nom = "";
            Rdata.User.isActive = false;
            Rdata.User.privilege = "public";
            Rdata.User.groupeIndividu = "";
           // Rdata.User.typeAdmin = "";
            }
         
         
            callback(Rdata);
         }
         else
         {
            Rdata.success = false;
            Rdata.message = data.message;
            Rdata.User = {};
            Rdata.isLogged = false;
            Rdata.User.mail = "";
            Rdata.User.prenom ="";
            Rdata.User.nom = "";
            Rdata.User.isActive = false;
            Rdata.User.privilege = "public";
            Rdata.User.groupeIndividu = "";
            //Rdata.User.typeAdmin = "";
           
           callback(Rdata);
         }
      
        })
        .error(function (data, status, headers, conf)
        {
           
    
            Rdata.success = false;
            Rdata.message = "SUBMIT ERROR";
            Rdata.User = {};
            Rdata.isLogged = false;
            Rdata.User.mail = "";
            Rdata.User.prenom ="";
            Rdata.User.nom = "";
            Rdata.User.isActive = false;
            Rdata.User.privilege = "public";
            Rdata.User.groupeIndividu = "";
           // Rdata.User.typeAdmin = "";
              
           
             callback(Rdata);
           
        });

            
            
        };
        
        
      UserService.logout = function (){
             var Rdata = {};
            Rdata.success = false;
            Rdata.message = "";
            Rdata.User = {};
            Rdata.isLogged = false;
            Rdata.User.mail = "";
           Rdata.User.prenom ="";
            Rdata.User.nom = "";
            Rdata.User.isActive = false;
           Rdata.User.privilege = "public";
            Rdata.User.groupeIndividu = "";
           //Rdata.User.typeAdmin = "";
           SessionCookies.removeSession("Rase-user");
           SessionCookies.removeCookie("Rase-user");
           
          //callback(Rdata);
                        
         };
        
        
        UserService.refreshSession = function (callback){
                  var Rdata = {};
            Rdata.success = false;
            Rdata.message = "";
              
             var  UserSession = angular.fromJson( SessionCookies.getSession("Rase-user"));
             console.log(UserSession);
             if(UserSession === null)
             {
                var  UserCookie =  angular.fromJson(SessionCookies.getCookie("Rase-user"));
                 console.log(UserCookie);
                if(UserCookie === null)
                {
                
                Rdata.success = false;
                Rdata.message = "Vous etes plus connecte";
                Rdata.User = {};
                Rdata.isLogged = false;
                Rdata.User.mail = "";
                Rdata.User.prenom ="";
                Rdata.User.nom = "";
                Rdata.User.isActive = false;
                Rdata.User.privilege = "public";
                Rdata.User.groupeIndividu = "";
                //Rdata.User.typeAdmin = "";
            }
            else{
                
                
                 Rdata.success = true;
                Rdata.message = "";
                Rdata.isLogged = true;
                Rdata.User = UserCookie;
                
            }
                
                
                
                
                
             }
             else
             {
                 
                 
                 
                 
                Rdata.success = true;
                Rdata.message = "";
                Rdata.isLogged = true;
                Rdata.User = UserSession;
             }
             
             callback(Rdata); 
         };
        
        
        
     return UserService;   
        
}]);
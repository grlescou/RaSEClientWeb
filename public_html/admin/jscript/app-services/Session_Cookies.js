

app.factory('SessionCookies',['$cookieStore','$window',function($cookieStore,$window){
        
       
        var scStotre ={};
        
        
        scStotre.getCookie  = function(key){
            return $cookieStore.get(key) || null;
        };
        
        
        
          scStotre.setCookie  = function(key , value){
             $cookieStore.put(key,value);
        };
        
        
          scStotre.removeCookie  = function(key){
            $cookieStore.remove(key);
        };
        
        
        
        
        scStotre.getSession  = function(key){
            return $window.sessionStorage.getItem(key);
        };
        
        
        
          scStotre.setSession   = function(key , value){
             $window.sessionStorage.setItem(key,value);
        };
        
        
          scStotre.removeSession   = function(key){
             $window.sessionStorage.removeItem(key);
        };
        
        
        
        
      return scStotre;  
        
        }]);
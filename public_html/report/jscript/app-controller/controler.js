var myApp = angular.module('myAp', []);

myApp.controller('testctl', ['$scope', function ($scope) {

     $scope.user = {};
    $scope.user.details = {
      "username": "Todd Motto",
      "id": "89101112"
    };

}]);
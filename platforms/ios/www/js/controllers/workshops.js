var app = angular.module('impulse.controllers.workshops', []);

app.controller('WorkshopsController', function ($scope, $state, WorkshopsService, $ionicSideMenuDelegate, $localStorage)
{
  $scope.workshops = WorkshopsService;
  $scope.role = $localStorage.role;
  $scope.profilePicture = $localStorage.imageUrl;

  $scope.refresh = function()
  {
    if (!$scope.workshops.isLoading) {
      $scope.workshops.refresh().then(function ()
      {
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
  };

  $scope.toggleLeftMenu = function ()
  {
    $ionicSideMenuDelegate.toggleLeft();
  };


});

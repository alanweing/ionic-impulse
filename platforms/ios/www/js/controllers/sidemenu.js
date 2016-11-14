var app = angular.module('impulse.controllers.sidemenu', []);

app.controller('SideMenuController', function ($scope, $state, $localStorage, WorkshopsService)
{
  $scope.profilePicture = $localStorage.imageUrl;
  $scope.role = $localStorage.role;

  $scope.logout = function ()
  {
    $localStorage.$reset();
    WorkshopsService.workshops = [];
    WorkshopsService.actualWorkshop = null;
    $state.go('login', {}, {reload:true});
  };

  $scope.debug = function ()
  {
    console.log($localStorage);
  };

  $scope.goToGroup = function ()
  {
    $state.go('group');
  };

  $scope.goToFeedbacks = function ()
  {
    $state.go('feedbacks');
  };

  $scope.goToGroups = function ()
  {
    $state.go('groups');
  };
});

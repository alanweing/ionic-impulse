var app = angular.module('impulse.controllers.workshops', []);

app.controller('WorkshopsController', function ($scope, $state, WorkshopsService)
{
  $scope.workshops = WorkshopsService;
  // $scope.workshops.getWorkshops();

  // $scope.getWorkshops = function()
  // {
  //     WorkshopsService.getWorkshops().then(function(response){
  //
  //     }, function(error){
  //
  //     });
  // }
});

var app = angular.module('impulse.controllers.workshop', []);

app.controller('WorkshopController', function ($scope, WorkshopsService, $localStorage)
{
  $scope.role = $localStorage.role;
  $scope.workshop = WorkshopsService.actualWorkshop;
});

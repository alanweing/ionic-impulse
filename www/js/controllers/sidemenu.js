var app = angular.module('impulse.controllers.sidemenu', []);

app.controller('SideMenuController', function ($timeout, $ionicLoading, $scope, $state, $localStorage, WorkshopsService, $ionicHistory)
{
  $scope.profilePicture = $localStorage.imageUrl;
  $scope.role = $localStorage.role;

  $scope.logout = function ()
  {
    $ionicLoading.show({
      template: 'Saindo....'
    });
    $localStorage.$reset();
    WorkshopsService.workshops = [];
    WorkshopsService.actualWorkshop = null;

    $timeout(function () {
      $ionicLoading.hide();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $ionicHistory.nextViewOptions({
        disableBack: true,
        historyRoot: true
      });
      $state.go('login');
    }, 500);
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

  $scope.goToMyEvaluations = function ()
  {
    $state.go('myEvaluations');
  };

});
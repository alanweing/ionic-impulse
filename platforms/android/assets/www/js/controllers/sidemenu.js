var app = angular.module('impulse.controllers.sidemenu', []);

app.controller('SideMenuController', function ($timeout, $ionicLoading, $scope, $state, $localStorage, WorkshopsService, $ionicHistory)
{
  $scope.profilePicture = $localStorage.imageUrl;
  $scope.role = $localStorage.role;
  console.log($scope.role);

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
      $ionicHistory.clearCache ();
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

  $scope.goToRanking = function ()
  {
    $state.go('ranking');
  };

  $scope.goToGroup = function ()
  {
    $state.go('group');
  };

  $scope.goToFeedbacks = function ()
  {
    $state.go('feedbacks');
  };

  $scope.goToScore = function ()
  {
    $state.go('score');
  };

  $scope.goToGroups = function ()
  {
    $state.go('groups');
  };

  $scope.goToMyEvaluations = function ()
  {
    $state.go('myEvaluations');
  };

  $scope.goToCurricula = function ()
  {
    $state.go('curricula');
  };

});

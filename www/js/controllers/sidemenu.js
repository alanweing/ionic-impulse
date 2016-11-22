var app = angular.module('impulse.controllers.sidemenu', []);

app.controller('SideMenuController', function ($timeout, $ionicLoading, $scope,
                                               $state, $localStorage,
                                               WorkshopsService, $ionicHistory,
                                               UserService)
{
  $scope.model = UserService;

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

  $scope.goTo = function (url)
  {
    $state.go(url);
  };

});

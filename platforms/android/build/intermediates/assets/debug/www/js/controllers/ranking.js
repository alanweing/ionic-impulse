var app = angular.module('impulse.controllers.ranking', []);

app.controller('RankingController', function ($scope, ApiService, $ionicLoading)
{
  $scope.users = [];
  $scope.refresh = function ()
  {
    $scope.users= [];
    $ionicLoading.show();
    ApiService.request('GET', 'ranking')
      .then(function (response)
      {
        $scope.users = response;
        $scope.$broadcast('scroll.refreshComplete');
      })
      .finally(function ()
      {
        $ionicLoading.hide();
      });
  };

  $scope.refresh();
});

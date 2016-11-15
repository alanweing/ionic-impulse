var app = angular.module('impulse.controllers.ranking', []);

app.controller('RankingController', function ($scope, ApiService)
{
  $scope.users = [];
  $scope.refresh = function ()
  {
    $scope.users= [];
    ApiService.request('GET', 'ranking')
      .then(function (response)
      {
        $scope.users = response;
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  $scope.refresh();
});

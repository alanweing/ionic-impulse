var app = angular.module('impulse.controllers.score', []);

app.controller('ScoreController', function ($scope, ApiService)
{
  $scope.scores = [];

  $scope.total = 0;

  $scope.refresh = function ()
  {
    $scope.scores = [];
    $scope.total = 0;
    ApiService.request('GET', 'score')
      .then(function (response)
      {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.scores = response;
        angular.forEach($scope.scores, function (value, key)
        {
          angular.forEach(value, function (score, key2)
          {
            $scope.total += score.score.score;
          })
        });
      });
  };

  $scope.refresh();
});

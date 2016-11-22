var app = angular.module('impulse.controllers.score', []);

app.controller('ScoreController', function ($scope, ApiService, $ionicLoading)
{
  $scope.scores = [];

  $scope.total = 0;
  $scope.scoreExtra = 0;

  $scope.refresh = function ()
  {
    $ionicLoading.show();
    $scope.scores = [];
    $scope.total = 0;
    ApiService.request('GET', 'score')
      .then(function (response)
      {
        console.log(response);
        $scope.$broadcast('scroll.refreshComplete');
        $scope.scores = response;
        var extras = 0;
        angular.forEach($scope.scores, function (value, key)
        {
          angular.forEach(value, function (score, key2)
          {
            if (score.score.score_extra > 0)
            {
              $scope.scoreExtra += score.score.score_extra;
              extras += 1;
            }
          })
        });
        $scope.scoreExtra /= extras;
      })
      .finally(function ()
      {
        $ionicLoading.hide();
      });
  };

  $scope.refresh();
});

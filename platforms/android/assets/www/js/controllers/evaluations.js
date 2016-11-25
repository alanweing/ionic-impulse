var app = angular.module('impulse.controllers.evaluations', []);

app.controller('EvaluationsController', function ($scope, ApiService, $ionicLoading)
{

  $scope.evaluations = [];

  $scope.refresh = function ()
  {
    $ionicLoading.show();
    ApiService.request('GET', 'evaluations')
      .then(function (response)
    {
      $scope.evaluations = response;
      // console.log(response);
    })
      .finally(function ()
      {
        $ionicLoading.hide();
      });
  };

  $scope.refresh();

});

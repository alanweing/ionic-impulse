var app = angular.module('impulse.controllers.curricula', []);

app.controller('CurriculaController', function ($scope, ApiService)
{
  $scope.curricula = [];

  $scope.refresh = function ()
  {
    ApiService.request('GET', 'curriculum')
      .then(function (response)
      {
        console.log(response);
        $scope.curricula = response;
      });
  };

  $scope.refresh();
});

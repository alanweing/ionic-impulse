var app = angular.module('impulse.controllers.authentication', []);

app.controller('LoginController', function ($scope, $state, AuthenticationService)
{
  $scope.login = function (form)
  {
    // console.log(form);
    // return;
    if (form.$valid)
    {
      AuthenticationService.login($scope.formData.email, $scope.formData.password).then(function (response) {
        console.log(response);
      }, function (error) {
        console.log(error);
      });
    }
    else
    {
      console.log('invalid form!!');
    }
  }
});

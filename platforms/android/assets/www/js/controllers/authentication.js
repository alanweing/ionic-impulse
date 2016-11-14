var app = angular.module('impulse.controllers.authentication', []);

app.controller('LoginController', function ($scope, $state, $window,
                                            AuthenticationService, $localStorage)
{
  $scope.login = function (form)
  {
    if (form.$valid)
    {
      AuthenticationService.login($scope.formData.email, $scope.formData.password).then(function (response)
      {
        console.log(response);
        $state.go("home.workshops");
      }, function (error)
      {
        console.log(error);
      });
    }
    else
    {
      console.log('invalid form!!');
    }
  };

  var init = function()
  {
    if ($localStorage.api_token != null)
    {

      $state.go("home.workshops");
    }
  };

  init();

});

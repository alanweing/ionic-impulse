var app = angular.module('impulse.controllers.authentication', []);

app.controller('LoginController', function ($scope, $state, $window,
                                            AuthenticationService, $localStorage, ApiService, WorkshopsService)
{
  $scope.login = function (form)
  {
    if (form.$valid)
    {
      ApiService.request('POST', 'authenticate',
      {
        email: $scope.formData.email,
        password:  $scope.formData.password
      }).then(function (response)
      {
        $state.go('home');
      }, function (error)
      {

      });
      // AuthenticationService.login($scope.formData.email, $scope.formData.password).then(function (response) {
      //   $state.go("home.workshops");
      // }, function (error) {
      //   console.log('ERROR: ' + error);
      // });
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
      ApiService.request('GET', 'validateToken').then(function(response)
      {
        $state.go('home');
      }, function(error)
      {

      });
    }
  };

  init();

});

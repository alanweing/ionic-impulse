var app = angular.module('impulse.controllers.authentication', []);

app.controller('LoginController', function ($scope, $state, $window, $ionicHistory,
                                            AuthenticationService, $localStorage,
                                            ApiService, UserService, $ionicLoading)
{
  $scope.login = function (form)
  {
    if (form.$valid)
    {
      $ionicLoading.show({
        hideOnStateChange: true
      });
      ApiService.request('POST', 'authenticate',
      {
        email: $scope.formData.email,
        password:  $scope.formData.password
      }).then(function (response)
      {
        UserService.refresh();
        $state.go('home', {}, {reload:true});
      }, function (error)
      {
        $ionicLoading.hide();
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
      $ionicLoading.show({
        hideOnStateChange: true
      });
      ApiService.request('GET', 'validateToken').then(function(response)
      {
        UserService.refresh();
        $state.go('home', {}, {reload:true});
      }, function(error)
      {
        $ionicLoading.hide();
      });
    }
  };

  init();

});

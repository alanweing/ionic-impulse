var app = angular.module('impulse.controllers.userConsiderations', []);

app.controller('UserConsiderationsController', function ($scope, ConsiderationsService,
                                                         ApiService, $ionicLoading, $localStorage,
                                                         $ionicPopup)
{
  $scope.user = ConsiderationsService.currentUser;

  $scope.addConsideration = function (data, type)
  {
    var consideration;
    switch (type)
    {
      case 1:
        consideration = data.featured;
        break;
      case 2:
        consideration = data.toDevelop;
        break;
      case 3:
        consideration = data.consideration;
        break;
    }
    if (consideration == '' || consideration == undefined)
      return;
    $ionicLoading.show({template: 'enviando mensagem...'});
    ApiService.request('POST', 'consideration', {
      api_token: $localStorage.api_token,
      user_id: $scope.user.id,
      type: type,
      consideration: consideration
    })
      .then(function ()
      {
        $scope.user.considerations[type].push({considerations: consideration});
        $ionicPopup.alert({subTitle: 'Mensagem enviada!'});
        switch (type)
        {
          case 1:
            data.featured = '';
            break;
          case 2:
            data.toDevelop = '';
            break;
          case 3:
            data.consideration = '';
            break;
        }
      })
      .finally(function ()
      {
        $ionicLoading.hide();
      });
  };

});

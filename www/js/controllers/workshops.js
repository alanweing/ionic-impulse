var app = angular.module('impulse.controllers.workshops', []);

app.controller('WorkshopsController', function ($scope, $state, WorkshopsService,
                                                $ionicSideMenuDelegate, $localStorage,
                                                $ionicPopup)
{
  $scope.workshops = WorkshopsService;
  $scope.role = $localStorage.role;
  $scope.profilePicture = $localStorage.imageUrl;

  $scope.refresh = function()
  {
    if (!$scope.workshops.isLoading) {
      $scope.workshops.refresh().then(function ()
      {
        $scope.$broadcast('scroll.refreshComplete');
        console.log($scope.workshops.workshops.workshops)
      });
    }
    $scope.role = $localStorage.role;
  };

  if ($localStorage.api_token != undefined)
  {
    $scope.refresh();
  }

  $ionicPopup.alert({
    subTitle: 'Puxe para baixo para atualizar as informações.'
  });

});

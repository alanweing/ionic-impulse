var app = angular.module('impulse.controllers.curricula', [
  'impulse.controllers.curriculum'
]);

app.controller('CurriculaController', function ($scope, ApiService, $ionicLoading,
                                                CurriculumService, globals, $state)
{
  $scope.curricula = [];

  $scope.refresh = function ()
  {
    $ionicLoading.show();
    ApiService.request('GET', 'curriculum')
      .then(function (response)
      {
        $scope.curricula = response;
      })
      .finally(function ()
      {
        $ionicLoading.hide();
      });
  };

  $scope.setCurrentCurriculum = function (curriculum)
  {
    CurriculumService.setCurrentCurriculum(curriculum);
    $state.go('curriculum');
  };

  $scope.getProfilePictureUrl = function (image)
  {
    if (image == null || image == undefined)
    {
      image = 'default.jpg'
    }
    return globals.siteUrl + 'uploads/profile_pictures/' + image;
  };

  $scope.refresh();
});

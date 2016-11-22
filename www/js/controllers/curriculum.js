var app = angular.module('impulse.controllers.curriculum', []);

app.controller('CurriculumController', function ($scope, CurriculumService, globals)
{
  $scope.model = CurriculumService.currentCurriculum;

  $scope.getProfilePictureUrl = function (image)
  {
    if (image == null || image == undefined)
    {
      image = 'default.jpg'
    }
    return globals.siteUrl + 'uploads/profile_pictures/' + image;
  };
});

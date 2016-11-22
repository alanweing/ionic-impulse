var app = angular.module('impulse.controllers.questions', [
  'impulse.services.question',
  'impulse.controllers.feedbackMessage'
]);

app.controller('QuestionsController', function ($scope, ApiService, $ionicLoading,
                                                $ionicPopup, globals, QuestionService,
                                                $state)
{
  $scope.users = [];

  $scope.refresh = function ()
  {
    $ionicLoading.show();
    $scope.users = [];
    ApiService.request('GET', 'message')
      .then(function (response)
      {
        console.log(response);
        $scope.users = response;
      })
      .finally(function ()
      {
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();
      });
  };

  $scope.setCurrentUser = function (newUser)
  {
    QuestionService.setCurrentUser(newUser);
    $state.go('feedbackMessage');
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

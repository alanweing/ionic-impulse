var app = angular.module('impulse.controllers.groupParticipants', [
  'impulse.controllers.userConsiderations',
  'impulse.services.group',
  'impulse.services.considerations'
]);

app.controller('GroupParticipantsController', function ($scope, GroupService, globals,
                                                        $ionicPopup, $ionicLoading, ApiService,
                                                        $localStorage, $state, ConsiderationsService)
{
  $scope.group = GroupService.currentGroup;
  // console.log($scope.group);

  $scope.getProfilePictureUrl = function (image)
  {
    if (image == null || image == undefined)
    {
      image = 'default.jpg'
    }
    else
    {
      image = image.profile_image;
    }
    return globals.siteUrl + 'uploads/profile_pictures/' + image;
  };

  $scope.addFeedbackToUser = function (userId) {
    $ionicPopup.prompt({
      subTitle: 'Escreva seu feedback',
      cancelText: 'Cancelar',
      okText: 'Ok',
      cssClass: 'modal-feedback',
      inputType: 'text'
    }).then(function (res)
    {
      if (res != undefined && res.trim() != '')
      {
        $ionicLoading.show({template: 'enviando feedback...'});
        ApiService.request('POST', 'addFeedbackToUser', {
          user_id: userId,
          // workshop_id: $scope.workshop.workshop.id,
          description: res,
          api_token: $localStorage.api_token
        })
          .finally(function ()
          {
            $ionicLoading.hide();
          });
      }
    });
  };

  $scope.goToConsiderations = function (user)
  {
    ConsiderationsService.setCurrentUser(user);
    $state.go('considerations');
  };

});

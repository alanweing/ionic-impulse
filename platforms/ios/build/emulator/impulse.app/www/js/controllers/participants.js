var app = angular.module('impulse.controllers.participants', []);

app.controller('ParticipantsController', function ($scope, WorkshopsService, ApiService, $localStorage, $ionicPopup)
{
  $scope.workshop = WorkshopsService.actualWorkshop;
  $scope.users = [];

  $scope.addPointsToUser = function (points, userId, type)
  {
    if (type == 'confirm')
    {
      $ionicPopup.confirm({
        subTitle: 'Deseja atribuir +' + points + ' pontos para esse participante?',
        cssClass: 'modal-points',
        cancelText: 'Não',
        okText: 'Sim'
      }).then(function(res)
      {
        if (res)
        {
          ApiService.request('POST', 'addPointsToUser', {
            score: points,
            user_id: userId,
            workshop_id: $scope.workshop.workshop.id,
            api_token: $localStorage.api_token,
            extra: true
          });
        }
      });
    }
    else if (type == 'prompt')
    {
      $ionicPopup.prompt({
        subTitle: 'Digite a pontuação',
        inputType: 'number',
        cancelText: 'Cancelar',
        okText: 'Ok',
        cssClass: 'modal-points-custom'
      }).then(function (res)
      {
        if (res != undefined && res != 0 && res != null)
        {
          ApiService.request('POST', 'addPointsToUser', {
            score: res,
            user_id: userId,
            workshop_id: $scope.workshop.workshop.id,
            api_token: $localStorage.api_token,
            extra: false
          });
        }
      });
    }
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
        ApiService.request('POST', 'addFeedbackToUser', {
          user_id: userId,
          workshop_id: $scope.workshop.workshop.id,
          description: res,
          api_token: $localStorage.api_token
        })
      }
    });
  };

  $scope.getParticipants = function ()
  {
    if ($scope.workshop.schedules.length > 0)
    {
      ApiService.request('POST', 'workshop/participants', {
        workshop_id: $scope.workshop.workshop.id,
        schedule_id: $scope.workshop.schedules[0].id,
        api_token: $localStorage.api_token
      }).then(function (response)
      {
        $scope.users = response;
      });
    }
    else
    {
      $ionicPopup.alert({
        subTitle: 'Essa oficina já terminou!'
      });
    }
  };

  $scope.getParticipants();
});

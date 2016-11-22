var app = angular.module('impulse.controllers.participants', []);

app.controller('ParticipantsController', function ($scope, WorkshopsService, ApiService,
                                                   $localStorage, $ionicPopup, $ionicLoading)
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
          $ionicLoading.show();
          ApiService.request('POST', 'addPointsToUser', {
            score: points,
            user_id: userId,
            workshop_id: $scope.workshop.workshop.id,
            api_token: $localStorage.api_token,
            extra: true,
            special: false
          })
            .finally(function ()
            {
              $ionicLoading.hide()
            });
        }
      });
    }
    else if (type == 'prompt')
    {
      $ionicPopup.prompt({
        title: 'Digite a pontuação',
        subTitle: '1 = não apresenta<br>2 = abaixo do esperado<br>3 = dentro do esperado<br>4 = acima do esperado<br>5 = excelência',
        inputType: 'number',
        cancelText: 'Cancelar',
        okText: 'Ok',
        cssClass: 'modal-points-custom'
      }).then(function (res)
      {
        if (res != undefined && res != 0 && res != null && res <= 5)
        {
          $ionicLoading.show();
          ApiService.request('POST', 'addPointsToUser', {
            score: res,
            user_id: userId,
            workshop_id: $scope.workshop.workshop.id,
            api_token: $localStorage.api_token,
            extra: false,
            special: false
          })
            .finally(function ()
            {
              $ionicLoading.hide();
            });
        }
        else if (res)
        {
          $ionicPopup.alert({
            subTitle: 'Valor máximo deve ser 5.'
          }).then(function () {
            $scope.addPointsToUser(points, userId, type);
          });
        }
      });
    }
    else if (type == 'extra')
    {
      $ionicPopup.prompt({
        title: 'Digite a pontuação extra',
        inputType: 'number',
        cancelText: 'Cancelar',
        okText: 'Ok',
        cssClass: 'modal-points-custom'
      }).then(function (res)
      {
        if (res != undefined && res != 0 && res != null)
        {
          $ionicLoading.show();
          ApiService.request('POST', 'addPointsToUser', {
            score: res,
            user_id: userId,
            workshop_id: $scope.workshop.workshop.id,
            api_token: $localStorage.api_token,
            extra: false,
            special: true
          })
            .finally(function ()
            {
              $ionicLoading.hide();
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
        $ionicLoading.show();
        ApiService.request('POST', 'addFeedbackToUser', {
          user_id: userId,
          workshop_id: $scope.workshop.workshop.id,
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

  $scope.getParticipants = function ()
  {
    if ($scope.workshop.schedules.length > 0)
    {
      $ionicLoading.show();
      ApiService.request('POST', 'workshop/participants', {
        workshop_id: $scope.workshop.workshop.id,
        schedule_id: $scope.workshop.schedules[0].id,
        api_token: $localStorage.api_token
      }).then(function (response)
      {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.users = response;
      })
        .finally(function ()
        {
          $ionicLoading.hide();
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

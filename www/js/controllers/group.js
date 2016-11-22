var app = angular.module('impulse.controllers.group', [
  'impulse.controllers.groupParticipants'
]);

app.controller('GroupController', function ($scope, ApiService, $localStorage, $ionicPopup,
                                            $state, GroupService, $ionicLoading)
{
  $scope.groupUsers = [];
  $scope.groups = [];

  if ($localStorage.role == 1)
  {
    $ionicLoading.show();
    ApiService.request('GET', 'group')
      .then(function (response)
      {
        $scope.groupUsers = response;
      }, function (error)
      {
        console.log(error);
      })
      .finally(function ()
      {
        $ionicLoading.hide();
      });
  }
  else
  {
    $ionicLoading.show();
    ApiService.request('GET', 'groups')
      .then(function (response)
      {
        $scope.groups = response;
      }, function (error)
      {
        console.log(error);
      })
      .finally(function ()
      {
        $ionicLoading.hide();
      });
  }

  $scope.addScoreToGroup = function (score, groupId, type) {
    if (type == 'prompt')
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
          $ionicLoading.show({template:'enviando avaliação'});
          ApiService.request('POST', 'addScoreToGroup', {
            score: res,
            group_id: groupId,
            api_token: $localStorage.api_token,
            extra: false
          })
            .finally(function ()
            {
              $ionicLoading.hide();
            });
        }
      });
    }
    else if (type == 'confirm')
    {
      $ionicPopup.confirm({
        subTitle: 'Deseja atribuir +' + score + ' pontos para esse grupo?',
        cssClass: 'modal-points',
        cancelText: 'Não',
        okText: 'Sim'
      }).then(function(res)
      {
        if (res)
        {
          $ionicLoading.show({template:'enviando avaliação...'});
          ApiService.request('POST', 'addScoreToGroup', {
            score: score,
            group_id: groupId,
            api_token: $localStorage.api_token,
            extra: true
          })
            .finally(function ()
            {
              $ionicLoading.hide();
            });
        }
      });
    }
  };

  $scope.goToParticipants = function (group)
  {
    GroupService.setCurrentGroup(group);
    $state.go('groupParticipants');
  };

});

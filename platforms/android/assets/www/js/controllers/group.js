var app = angular.module('impulse.controllers.group', []);

app.controller('GroupController', function ($scope, ApiService, $localStorage, $ionicPopup)
{
  $scope.groupUsers = [];
  $scope.groups = [];

  if ($localStorage.role == 1)
  {
    ApiService.request('GET', 'group')
      .then(function (response)
      {
        $scope.groupUsers = response;
      }, function (error)
      {
        console.log(error);
      });
  }
  else
  {
    ApiService.request('GET', 'groups')
      .then(function (response)
      {
        $scope.groups = response;
      }, function (error)
      {
        console.log(error);
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
          ApiService.request('POST', 'addScoreToGroup', {
            score: res,
            group_id: groupId,
            api_token: $localStorage.api_token,
            extra: false
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
          ApiService.request('POST', 'addScoreToGroup', {
            score: score,
            group_id: groupId,
            api_token: $localStorage.api_token,
            extra: true
          });
        }
      });
    }
  }

});

var app = angular.module('impulse.controllers.workshop', []);

app.controller('WorkshopController', function ($scope, WorkshopsService, $localStorage, ApiService, $ionicPopup)
{
  $scope.role = $localStorage.role;
  $scope.workshop = WorkshopsService.actualWorkshop;

  $scope.alert = function (message, data)
  {
    if (data == null)
    {
      $ionicPopup.alert({
        title: message
      });
    }
    else
    {
      $ionicPopup.alert({
        title: message,
        subTitle: 'Essa oficina começa às: ' + data.schedule.start.slice(11, 16) + 'h e termina às: ' + data.schedule.end.slice(11, 16) + 'h'
      });
    }

  };

  $scope.checkIn = function ()
  {
    if ($scope.workshop.can_check_in)
    {
      ApiService.request('POST', 'checkIn', {
        workshop_id: $scope.workshop.workshop.id,
        schedule_id: $scope.workshop.schedule.id,
        api_token: $localStorage.api_token
      }).then(function (response) {
        if (response.status == 201)
        {
          $scope.alert('Sucesso!')
        }
      }, function (error) {
        if (error.status == 409)
        {
          $scope.alert(error.data.error.message)
        }
        else if (error.status == 403)
        {
          $scope.alert(error.data.error.message, {
            workshop: error.data.error.workshop,
            schedule: error.data.error.schedule
          })
        }
      });
    }
  };

});

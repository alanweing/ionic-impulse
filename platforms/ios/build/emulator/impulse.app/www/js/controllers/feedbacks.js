var app = angular.module('impulse.controllers.feedbacks', []);

app.controller('FeedbacksController', function ($scope, $state, $localStorage,
                                                ApiService, FeedbacksService, $ionicLoading,
                                                $ionicPopup, UserService)
{
  $scope.model = FeedbacksService;
  $scope.user = UserService;
  $scope.name = $localStorage.name;
  $scope.feedbacks = [];

  $scope.setCurrentWorkshop = function (workshop)
  {
    FeedbacksService.setCurrentWorkshop(workshop);
    $state.go('detailedFeedbacks');
  };

  $scope.sendMessage = function (to, feedback_id, form)
  {
    if (form != undefined && form.message != '')
    {
      $ionicLoading.show({template: 'enviando mensagem...'});
      ApiService.request('POST', 'message', {
        api_token: $localStorage.api_token,
        message: form.message,
        feedback_id: feedback_id,
        to: to
      })
        .then(function ()
        {
          $ionicPopup.alert({
            subTitle: 'Mensagem enviada!'
          });
        })
        .finally(function ()
        {
          $ionicLoading.hide()
        });
    }
  };

  $scope.getCurrentWorkshop = function ()
  {
    return FeedbacksService.currentWorkshopFeedback;
  };

  $scope.refresh = function ()
  {
    $ionicLoading.show();
    $scope.feedbacks = [];
    ApiService.request('GET', 'feedbacks')
      .then(function (response)
    {
      $scope.$broadcast('scroll.refreshComplete');
      $scope.feedbacks = response;
    })
      .finally(function ()
      {
        $ionicLoading.hide();
      });
  };
});

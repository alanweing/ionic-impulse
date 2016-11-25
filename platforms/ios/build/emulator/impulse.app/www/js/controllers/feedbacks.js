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
    console.log(workshop);
    $state.go('detailedFeedbacks');
  };

  $scope.sendMessage = function (feedback, form)
  {
    if (form != undefined && form.message != '')
    {
      $ionicLoading.show({template: 'enviando mensagem...'});
      ApiService.request('POST', 'message', {
        api_token: $localStorage.api_token,
        message: form.message,
        feedback_id: feedback.id,
        to: feedback.evaluator.id
      })
        .then(function ()
        {
          $ionicPopup.alert({
            subTitle: 'Mensagem enviada!'
          })
            .then(function ()
            {
              feedback.messages.push({
                message: form.message,
                to: feedback.evaluator.id,
                from: $localStorage.id
              });
              form.message = '';
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

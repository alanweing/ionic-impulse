var app = angular.module('impulse.controllers.feedbackMessage', [

]);

app.controller('FeedbackMessageController', function ($scope, QuestionService,
                                                      $ionicLoading, $ionicPopup,
                                                      ApiService, $localStorage)
{
  $scope.user = QuestionService.currentUser;
  console.log($scope.user);

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

});

var app = angular.module('impulse.controllers.feedbackMessage', [

]);

app.controller('FeedbackMessageController', function ($scope, QuestionService,
                                                      $ionicLoading, $ionicPopup,
                                                      ApiService, $localStorage)
{
  $scope.user = QuestionService.currentUser;
  // console.log($scope.user);

  $scope.sendMessage = function (to, feedback, form)
  {
    if (form != undefined && form.message != '')
    {
      $ionicLoading.show({template: 'enviando mensagem...'});
      ApiService.request('POST', 'message', {
        api_token: $localStorage.api_token,
        message: form.message,
        feedback_id: feedback.id,
        to: to
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
                to: to,
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

});

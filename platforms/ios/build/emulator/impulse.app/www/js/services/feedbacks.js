var app = angular.module('impulse.services.feedbacks', []);

app.service('FeedbacksService', function()
{
  var self = {
    'currentWorkshopFeedback': null,

    'setCurrentWorkshop': function (workshop)
    {
      self.currentWorkshopFeedback = workshop;
    }
  };
  return self;
});

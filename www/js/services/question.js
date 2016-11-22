var app = angular.module('impulse.services.question', []);

app.service('QuestionService', function ()
{
  var self = {

    currentUser: null,

    setCurrentUser: function (newUser)
    {
      self.currentUser = newUser;
    }

  };

  return self;

});

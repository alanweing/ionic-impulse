var app = angular.module('impulse.services.considerations', []);

app.service('ConsiderationsService', function ()
{
  var self = {

    currentUser: null,

    setCurrentUser: function (user)
    {
      self.currentUser = user;
    }

  };

  return self;

});

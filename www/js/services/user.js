var app = angular.module('impulse.services.user', []);

app.service('UserService', function ($localStorage) {

  var self = {

    role: $localStorage.role,
    email: $localStorage.email,
    profilePicture: $localStorage.imageUrl,

    refresh: function ()
    {
      self.role = $localStorage.role;
      self.email = $localStorage.email;
      self.profilePicture = $localStorage.imageUrl;
    },

    isUser: function ()
    {
      if (self.role == 1)
      {
        return true;
      }
      return false;
    }

  };

  return self;

});

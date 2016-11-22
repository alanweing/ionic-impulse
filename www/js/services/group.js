var app = angular.module('impulse.services.group', []);

app.service('GroupService', function ()
{

  var self = {

    currentGroup: null,

    setCurrentGroup: function (group)
    {
      self.currentGroup = group;
    }

  };

  return self;

});

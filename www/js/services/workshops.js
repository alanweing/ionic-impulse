var app = angular.module('impulse.services.workshops', []);

app.service('WorkshopsService', function($q, $http, $localStorage, globals, ApiService, $ionicPopup)
{
  var self = {

    'workshops': [],
    'actualWorkshop': null,

    'refresh': function() {
      self.isLoading = true;
      self.workshops = [];
      return self.get();
    },

    'setCurrentWorkshop': function (workshop)
    {
      self.actualWorkshop = workshop;
    },

    'get': function ()
    {
      var d = $q.defer();
      ApiService.request('GET', 'workshop').then(function (response)
      {
        self.workshops = response;
        d.resolve();
      }, function (error)
      {
        $ionicPopup.alert(
          {
            title: 'Whoops!',
            subTitle: 'Algo deu errado :('
          });
        d.reject();
      });
      return d.promise;
    }
  };
  return self;
});

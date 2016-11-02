var app = angular.module('impulse.services.workshops', []);

app.service('WorkshopsService', function($q, $http, $localStorage, globals)
{
  var self = {

    'workshops': [],
    'isLoading': false,

    'refresh': function() {
      self.isLoading = true;
      self.workshops = [];
      return self.get();
    },

    'get': function () {
      self.isLoading = true;
      var d = $q.defer();
      $http({
        headers: {
          'Authorization': 'Bearer ' + $localStorage.api_token
        },
        method: 'GET',
        url: globals.apiUrl + 'workshop'
      }).then(function(response){
        if (response.status == 200)
        {
          if (response.data.length > 0)
          {
            // angular.forEach(response.data, function (workshop)
            // {
            //     self.workshops.push(workshop);
            // });
            self.workshops = response.data;
            console.log(self.workshops);
          }
          console.log(response.data);
          // d.resolve(response.data);
          d.resolve();
        }
        d.reject();
      }, function(error){
        console.log(error);
        d.reject();
      }).finally(function()
      {
        self.isLoading = false
      });
      return d.promise;
    }
  };

  self.get();
  return self;
});

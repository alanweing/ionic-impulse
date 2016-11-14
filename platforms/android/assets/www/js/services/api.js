var app = angular.module('impulse.services.api', []);

app.service('ApiService', function ($q, $http, globals)
{
  var self = {
    'isLoading' : false,

    'unauthorized': function (response)
    {

    },

    'request': function(method, url)
    {
      var d = $q.defer();
      self.isLoading = true;

      if (method.lowercase == 'get')
      {
        $http({
          headers: {'Authorization': 'Bearer ' + $localStorage.api_token},
          method: 'GET',
          url: global.apiUrl + url
        }).then(function (response)
        {
          if (response.status == 200)
          {
            d.resolve(response.data);
          }
          else if (response.status == 401)
          {
            self.unauthorized();
          }
          d.reject(data);
        }, function (error)
        {
          d.reject(error);
        }).finally(function ()
        {
          self.isLoading = false;
        });
      }

      else if (method.lowercase == 'post')
      {

      }
      return d.promise;
    }
  };
});

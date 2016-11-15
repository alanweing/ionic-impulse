var app = angular.module('impulse.services.api', []);

app.service('ApiService', function ($q, $http, globals, $ionicPopup, $localStorage, $state)
{
  var self =
  {
    'isLoading' : false,

    'unauthorized': function (response)
    {
      $ionicPopup.alert(
      {
        title: 'Não autorizado!',
        subTitle: 'Parece que o seu token expirou, faça o login novamente.'
      }).then(function ()
      {
        $localStorage.$reset();
        $state.go('login');
      });
    },

    'request': function(method, url, params)
    {
      method = method.toLowerCase();
      var d = $q.defer();
      self.isLoading = true;
      if (method == 'get')
      {
        $http({
          headers:
          {
            'Authorization': 'Bearer ' + $localStorage.api_token,
            'Accept': 'application/json'
          },
          method: 'GET',
          url: globals.apiUrl + url
        }).then(function (response)
        {
          if (response.status == 200)
          {
            d.resolve(response.data);
          }
          else if (response.status == 401)
          {
            if (url != 'validateToken')
            {
              self.unauthorized(response);
            }
          }
          d.reject(response);
        }, function (error)
        {
          if (error.status == 401)
          {
            if (url != 'validateToken')
            {
              self.unauthorized(error);
            }
          }
          d.reject(error);
        }).finally(function ()
        {
          self.isLoading = false;
        });
      }
      else if (method == 'post')
      {
        var param = function(data)
        {
          var returnString = ''; for (var d in data) { if (data.hasOwnProperty(d)) { returnString += d + '=' + data[d] + '&'; } } return returnString.slice( 0, returnString.length - 1 );
        };
        $http({
          headers:
          {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': 'application/json'
          },
          method: 'POST',
          url: globals.apiUrl + url,
          data: param(params)
        })
          .then(function (response)
          {
            if (response.status == 200)
            {
              if (url == 'authenticate')
              {
                $localStorage.name = response.data['name'];
                $localStorage.email = response.data['email'];
                $localStorage.api_token = response.data['api_token'];
                $localStorage.imageUrl = response.data['profile_picture'];
                $localStorage.role = response.data['role'];
              }
            }
            d.resolve(response.data);
          }, function (error)
          {
            if (error.status == 401)
            {
              if (url == 'authenticate')
              {
                $ionicPopup.alert(
                {
                  title: 'Whoops!',
                  subTitle: 'E-mail e ou senha inválidos'
                });
              }
              else
              {
                self.unauthorized(error)
              }
            }
            d.reject(error);
          }).finally(function ()
        {
          self.isLoading = false;
        });
      }
      return d.promise;
    }
  };
  return self;
});

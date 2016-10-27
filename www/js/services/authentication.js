var app = angular.module('impulse.services.authentication', []);

app.service('AuthenticationService', function ($q, $http, $ionicPopup)
{
  var self = {
    user: null,
    login: function (email, password) {
      var d = $q.defer();
      var param = function(data) { var returnString = ''; for (var d in data) { if (data.hasOwnProperty(d)) { returnString += d + '=' + data[d] + '&'; } } return returnString.slice( 0, returnString.length - 1 ); };
      $http({
        headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
        method: 'POST',
        url: 'http://localhost:8000/impulse_api/authenticate',
        data: param({
          'email': email,
          'password': password
        })
      })
        .then(function (response)
      {
        if (response.status == 200)
        {
          // console.log(response.data['api_token']);
          // window.localStorage.setItem('app_token', response.data['api_token']);
          d.resolve(response.data['api_token']);
        }
      }, function (error)
        {
          if (error.status == 401)
          {
            // console.log(401);
            $ionicPopup.alert({
              title: 'Whoops!',
              subTitle: 'E-mail e ou senha inválidos'
            });
          }
          d.reject(error.status);
        });
      return d.promise;
    }
  };
  return self;
});

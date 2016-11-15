var app = angular.module('impulse.services.authentication', []);

app.service('AuthenticationService', function ($q, $http, $ionicPopup,
                                               $localStorage, globals)
{
  var self = {
    user: null,
    login: function (email, password) {
      var d = $q.defer();
      var param = function(data) { var returnString = ''; for (var d in data) { if (data.hasOwnProperty(d)) { returnString += d + '=' + data[d] + '&'; } } return returnString.slice( 0, returnString.length - 1 ); };
      $http({
        headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
        method: 'POST',
        url: globals.apiUrl + 'authenticate',
        data: param({
          'email': email,
          'password': password
        })
      })
        .then(function (response)
        {
          if (response.status == 200)
          {
            // window.localStorage.setItem('app_token', response.data['api_token']);
            //   $localStorage.name = response.data['name'];
            $localStorage.name = response.data['name'];
            $localStorage.email = response.data['email'];
            $localStorage.api_token = response.data['api_token'];
            $localStorage.imageUrl = response.data['profile_picture'];
            $localStorage.role = response.data['role'];
            d.resolve(response.data);
          }
        }, function (error)
        {
          if (error.status == 401)
          {
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

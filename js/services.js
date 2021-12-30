angular.module('movieApp.services', []).config(function ($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}).factory('Movie', function($resource) {
  return $resource('https://ecineapp.herokuapp.com/api/films/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
  });
}).factory('Salle', function($resource) {
  return $resource('https://ecineapp.herokuapp.com/api/salles/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
  });
}).factory('Sceance', function($resource) {
  return $resource('https://ecineapp.herokuapp.com/api/sceances/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
  });
}).service('popupService', function($window) {
  this.showPopup = function(message) {
    return $window.confirm(message);
  }
});
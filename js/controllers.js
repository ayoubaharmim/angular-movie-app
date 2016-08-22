// Each state has a controller. So, in total we have four controllers for four states.
// The controllers just utilize our custom service Movie.

function MovieListController($scope, $state, popupService, $window, Movie) {
  $scope.movies = Movie.query(); //fetch all movies. Issues a GET to /api/movies

  $scope.deleteMovie = function(movie) { // Delete a movie. Issues a DELETE to /api/movies/:id
    if (popupService.showPopup('Really delete this?')) {
      movie.$delete(function() {
        $window.location.href = ''; //redirect to home
      });
    }
  };
}

function MovieViewController($scope, $stateParams, Movie) {
  $scope.movie = Movie.get({
    id: $stateParams.id
  }); //Get a single movie.Issues a GET to /api/movies/:id
}

function MovieCreateController($scope, $state, $stateParams, Movie) {
  $scope.movie = new Movie(); //create new movie instance. Properties will be set via ng-model on UI

  $scope.addMovie = function() { //create a new movie. Issues a POST to /api/movies
    $scope.movie.$save(function() {
      $state.go('movies'); // on success go back to home i.e. movies state.
    });
  };
}

function MovieEditController($scope, $state, $stateParams, Movie) {
  $scope.updateMovie = function() { //Update the edited movie. Issues a PUT to /api/movies/:id
    $scope.movie.$update(function() {
      $state.go('movies'); // on success go back to home i.e. movies state.
    });
  };

  $scope.loadMovie = function() { //Issues a GET request to /api/movies/:id to get a movie to update
    $scope.movie = Movie.get({
      id: $stateParams.id
    });
  };

  $scope.loadMovie(); // Load a movie which can be edited on UI
}

var movieApp = angular.module('movieApp.controllers', []);
movieApp.controller('MovieListController', MovieListController);
movieApp.controller('MovieViewController', MovieViewController);
movieApp.controller('MovieCreateController', MovieViewController);
movieApp.controller('MovieEditController', MovieEditController);
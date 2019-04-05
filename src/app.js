'use strict';

var app = angular.module('refactor-me', ['ngRoute']);

app.config(function($routeProvider) {

  $routeProvider
    .when('/projects', {
      templateUrl: '/src/templates/project.html',
      controller: 'projectController'
    })
    .when('/users', {
      templateUrl: '/src/templates/users.html',
      controller: 'usersController'
    })
    .otherwise({
      redirectTo: '/projects'
    });
});

app.controller('projectController', function($scope, $http) {

  $scope.section = 'setup';

  $http
    .get('http://localhost:3000/projects/1')
    .then(function(resp) {
      $scope.project = resp.data;
    });

  $scope.setSection = function(newSection) {
    $scope.section = newSection;
  };
});

app.controller('setupController', function($scope, $http) {

  $http
    .get('http://localhost:3000/users/1')
    .then(function(resp) {
      $scope.isAdmin = resp.data.role === 'admin';
      $scope.isDeveloper = resp.data.role === 'developer';
      $scope.isBasic = resp.data.role === 'basic';
    });
  
  $scope.setupProject = function() {
    $http
      .patch('http://localhost:3000/projects/1', { setup: !$scope.project.setup })
      .then(function() {
        window.location.reload(true);
      });
  };
});

app.controller('runController', function($scope, $http) {
  
  $http
    .get('http://localhost:3000/users/1')
    .then(function(resp) {
      $scope.isAdmin = resp.data.role === 'admin';
      $scope.isDeveloper = resp.data.role === 'developer';
      $scope.isBasic = resp.data.role === 'basic';
    });

  $scope.runProject = function() {
    $http
      .patch('http://localhost:3000/projects/1', { running: !$scope.project.running })
      .then(function() {
        window.location.reload(true);
      });
  };
});

app.controller('usersController', function($scope, $http) {
  $http
    .get('http://localhost:3000/users/1')
    .then(function(resp) {
      $scope.role = resp.data.role;
    });

  $scope.changeRole = function() {
    $http
      .patch('http://localhost:3000/users/1', { role: $scope.role })
      .then(function() {
        window.location.reload(true);
      });
  };
});

app.controller('managementController', function($scope, $http) {
  $http
    .get('http://localhost:3000/users/1')
    .then(function(resp) {
      $scope.isOwner = resp.data.id === $scope.project.owner;
    });
  
  $scope.deleteProject = function() {
    confirm('Are you sure?');
  };
});
angular.module('presionApp', ['ui.router', 'ngResource', 'presionApp.controllers', 'presionApp.services']);

angular.module('presionApp').config(function($locationProvider, $stateProvider) {

	$locationProvider.html5Mode(true);

  $stateProvider.state('presiones', { // state for showing all Presiones
    url: '/presiones',
    templateUrl: 'templates/presiones.html',
    controller: 'PresionListController'
  })

	.state('viewPresion', { //state for showing single Presion
    url: '/presiones/:id/view',
    templateUrl: 'templates/presion-view.html',
    controller: 'PresionViewController'
  })

	.state('newPresion', { //state for adding a new Presion
    url: '/presiones/new',
    templateUrl: 'templates/presion-add.html',
    controller: 'PresionCreateController'
  })

	.state('editPresion', { //state for updating a Presion
    url: '/presiones/:id/edit',
    templateUrl: 'templates/presion-edit.html',
    controller: 'PresionEditController'
  })

  .state('graficas', { //state for updating a Presion
    url: '/presiones',
    templateUrl: 'templates/presion-graficas.html',
    controller: 'GraficasController'
  });
}).run(function($state) {
  $state.go('presiones'); //make a transition to Presiones state when app starts
});

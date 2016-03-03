angular.module('presionApp.controllers', ['nvd3'])

//LISTAR PRESIONES
.controller('PresionListController', function($scope, $state, popupService, $window, Presion) {
  $scope.presiones = Presion.query(); //fetch all presiones. Issues a GET to /api/presiones

  $scope.deletePresion = function(presion) { // Delete a presion. Issues a DELETE to /api/presiones/:id
    if (popupService.showPopup('Really delete this?')) {
      presion.$delete(function() {
        $window.location.href = ''; //redirect to home
      });
    }
  };
})

//MOSTRAR UNA PRESION
.controller('PresionViewController', function($scope, $stateParams, Presion) {
  $scope.presion = Presion.get({ id: $stateParams.id }); //Get a single presion.Issues a GET to /api/presiones/:id
})

//AÑADIR NUEVA PRESION
.controller('PresionCreateController', function($scope, $state, $stateParams, Presion) {
  $scope.presion = new Presion();  //create new presion instance. Properties will be set via ng-model on UI

  $scope.addPresion = function() { //create a new presion. Issues a POST to /api/presiones
    $scope.presion.$save(function() {
      $state.go('presiones'); // on success go back to home i.e. presiones state.
    });
  };
})

//EDITAR UNA PRESION
.controller('PresionEditController', function($scope, $state, $stateParams, Presion) {
  $scope.updatePresion = function() { //Update the edited presion. Issues a PUT to /api/presiones/:id
    $scope.presion.$update(function() {
      $state.go('presiones'); // on success go back to home i.e. presiones state.
    });
  };

  $scope.loadPresion = function() { //Issues a GET request to /api/presiones/:id to get a presion to update
    $scope.presion = Presion.get({ id: $stateParams.id });
  };

  $scope.loadPresion(); // Load a presion which can be edited on UI
})

//MOSTRAR GRÁFICAS (PRESIÓN ARTERIAL + PULSACIÓN CARDÍACA)
.controller('GraficasController', function($scope, $state, $window, Presion) {

	/* Chart options */
	$scope.options_presion = {
			chart: {
					type: 'lineChart',
					height: 400,
					margin : {
							top: 20,
							right: 20,
							bottom: 50,
							left: 75
					},
					x: function(d){ return d[0]; },
					y: function(d){ return d[1]; },

					color: d3.scale.category10().range(),
					duration: 300,
					useInteractiveGuideline: true,
					clipVoronoi: false,

					xAxis: {
							axisLabel: 'Fecha',
							tickFormat: function(d) {
									return d3.time.format('%d/%m/%y')(new Date(d));
							},
							axisLabelDistance: 10,
							showMaxMin: false,
							staggerLabels: true
					},

					yAxis: {
							axisLabel: 'Presión Arterial (mmHg)',
							axisLabelDistance: 10
					},
					yDomain: [60, 150]
			},
			title: {
				enable: true,
				text: 'Registro de Presiones'
			}
	};

	$scope.options_pul = {
			chart: {
					type: 'stackedAreaChart',
					height: 350,
					margin : {
							top: 20,
							right: 20,
							bottom: 50,
							left: 75
					},
					x: function(d){ return d[0]; },
					y: function(d){ return d[1]; },

					color: d3.scale.category10().range(),
					duration: 300,
					useInteractiveGuideline: true,
					clipVoronoi: false,

					xAxis: {
							axisLabel: 'Fecha',
							tickFormat: function(d) {
									return d3.time.format('%m/%d/%y')(new Date(d));
							},
							axisLabelDistance: 10,
							showMaxMin: false,
							staggerLabels: true
					},

					yAxis: {
							axisLabel: 'Pulsaciones (PPM)',
							axisLabelDistance: 10
					}
			},
			title: {
				enable: true,
				text: 'Registro de Pulsaciones'
			}
	};

	/* Chart data */
	$scope.data_presion = [
		{
			key: "Presión Sistólica",
			values: []
		},
		{
			key: "Tensión Diastólica",
			values: []
		}
	];

	$scope.data_pul = [
		{
			key: "Pulsaciones",
			values: []
		}
	];

	Presion.query(function(data) {
		var fecha;
		console.log("kakafuuuu");
		for(var i=0; i<data.length; i++) {
			fecha = +moment(data[i].updated_at.toLowerCase(), "YYYY-MM-DDTHH:mm:ss.SSSz");
			$scope.data_presion[0].values.push([fecha, data[i].alta]);
			$scope.data_presion[1].values.push([fecha, data[i].baja]);
			$scope.data_pul[0].values.push([fecha, data[i].pulsaciones]);
		}
	});
});

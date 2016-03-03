angular.module('presionApp.services', [])

  .factory('Presion', function($resource) {
    return $resource('/api/presiones/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  })

  .service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
  });

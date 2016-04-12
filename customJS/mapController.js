angular.module('spaceLaunches')
.controller('MapController', function(launchDataFetcher) {
  //Map specs
  this.center ={ latitude: 37, longitude: -1 };
  this.zoom = 2;

  //Market specs
  this.marker = {
    options: {icon: 'images/launchIcon.png'}
  };

  this.allLaunches = launchDataFetcher.getAllLaunches();


});

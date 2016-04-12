angular.module('spaceLaunches')
.controller('MapController', function($scope, launchDataFetcher) {
  filterRetiredPads = function(allPads){
  	var goodPads = [];
  	for (var pad in allPads){
  		if (!pad.retired){
  			//console.log(pad);
  			goodPads.push(pad);
  		}
  	}
  	return goodPads;
  }

  this.pads = launchDataFetcher.getAllPads();

  //Map specs
  this.center ={ latitude: 37, longitude: -1 };
  this.zoom = 2;

  //Market specs
  $scope.selectedPad = null;
  $scope.selectPad = function selectPad(pad){
  	$scope.selectedPad = pad;
  	$scope.$apply();
  };

  this.marker = {
    options: {icon: 'images/launchIcon.png'}
  };
});

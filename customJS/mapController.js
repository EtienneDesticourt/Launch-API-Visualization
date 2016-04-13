angular.module('spaceLaunches')
.controller('MapController', function($scope, launchDataFetcher) {
    //Map specs
    this.center ={latitude:37, longitude:-1};
    this.zoom = 2;
    this.marker = {
        options: {icon: 'images/launchIcon.png'}
    }

    //Info for selected pad display
    $scope.selectedPad = null;
    $scope.selectPad = function selectPad(pad) {
        $scope.selectedPad = pad;
        $scope.$apply();
    }

    this.pads = launchDataFetcher.getAllPads();
});

angular.module('spaceLaunches', ['launchAPI', 'launchDisplayFilters'])
.controller('LaunchDisplayController', ['launchDataFetcher', function(launchDataFetcher) {
  this.MAX_NUM_LAUNCH = 20;
  //Init models
  this.name = "";
  this.agency = "";
  this.start = "YYYY-MM-DD";
  this.end = "YYYY-MM-DD";

  this.nextLaunches = launchDataFetcher.getNextLaunches(this.MAX_NUM_LAUNCH);
  this.selectedLaunch = null;

  this.convertCountryCode = function convertCountryCode(code) {
    return code.substring(0,2);
  }

  this.search = function search(){
    var args = {};

    if (this.name != ""){
      args["name"] = this.name;
    }
    if (this.agency != ""){
      args["agency"] = this.agency
    }
    if (Object.keys(args).length != 0){
      launchDataFetcher.getNextFilteredLaunches(this.MAX_NUM_LAUNCH, args);
    }
  }

  this.select = function select(launch) {
    this.selectedLaunch = launch;
  }
}]);


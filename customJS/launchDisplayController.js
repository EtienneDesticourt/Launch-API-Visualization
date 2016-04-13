angular.module('spaceLaunches')
.controller('LaunchDisplayController', function(launchDataFetcher) {
  this.selectedLaunch = null;
  this.nextLaunches = null;
  this.pageNumber = 0;
  this.pageRange = [];
  //Init form inputs' ng-models
  this.name = "";
  this.start = "YYYY-MM-DD";
  this.end = "YYYY-MM-DD";

  this.convertCountryCode = function (code) {
    return code.substring(0,2);
  }

  this.search = function () {
    var args = {"mode":"verbose"};

    //Check that inputs have been filled and filled right
    if (this.name != ""){
      args["name"] = this.name;
    }
    if (this.start != "YYYY-MM-DD" && !isNaN(Date.parse(this.start))) {
      args["startdate"] = this.start;
    }
    if (this.end != "YYYY-MM-DD" && !isNaN(Date.parse(this.end))) {
      args["enddate"] = this.end;
    }

    //If at least one input was filled, start search
    if (Object.keys(args).length != 0){
      this.nextLaunches = launchDataFetcher.getLaunches(args);
    }
  }

  this.getPage = function (page) {
    this.nextLaunches = launchDataFetcher.getLaunchPage(page);
  }

  this.select = function (launch) {
    this.selectedLaunch = launch;
  }

  this.init = function () {    
    this.nextLaunches = launchDataFetcher.getNextLaunches();
  }

  this.init();
});

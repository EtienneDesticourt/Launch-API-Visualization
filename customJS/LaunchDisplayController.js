angular.module('spaceLaunches', ['launchAPI', 'launchDisplayFilters'])
.controller('LaunchDisplayController', ['launchDataFetcher', function(launchDataFetcher) {
  this.DEFAULT_NUM_LAUNCH = 10;
  this.selectedLaunch = null;
  this.nextLaunches = null;
  this.pageNumber = 0;
  this.pageRange = [];
  //Init models
  this.name = "";
  this.start = "YYYY-MM-DD";
  this.end = "YYYY-MM-DD";

  this.convertCountryCode = function convertCountryCode(code) {
    return code.substring(0,2);
  }

  this.search = function search(){
    var args = {"mode": "verbose"};

    if (this.name != ""){
      args["name"] = this.name;
    }
    if (this.start != "YYYY-MM-DD" && !isNaN(Date.parse(this.start)) ){
      args["startdate"] = this.start;
    }
    if (this.end != "YYYY-MM-DD" && !isNaN(Date.parse(this.end)) ){
      args["enddate"] = this.end;
    }
    if (Object.keys(args).length != 0){
      this.nextLaunches = launchDataFetcher.getNextFilteredLaunches(args);
    }
  }

  this.setPageNumber = function setPageNumber(){
    this.pageNumber = this.nextLaunches.total / this.DEFAULT_NUM_LAUNCH + 1;
    if (this.pageNumber > 1){
      this.pageRange = [];
      for (var i=1; i <= this.pageNumber; i++){
        this.pageRange.push(i)
      }  
    }
    
    console.log(this.pageNumber);
  }

  this.clear = function clear(){    
    this.nextLaunches = launchDataFetcher.getNextLaunches(this.DEFAULT_NUM_LAUNCH);
  }

  this.select = function select(launch) {
    this.selectedLaunch = launch;
  }

  this.init = function init(){    
    this.nextLaunches = launchDataFetcher.getNextLaunches(this.DEFAULT_NUM_LAUNCH);
  }


  this.init();
}]);

angular.module('launchAPI', [])
.service('launchDataFetcher', ['$http', function($http) {
  var LAUNCH_LIBRARY_ROOT_URL = "https://launchlibrary.net/1.2/launch";
  var TOTAL_NUM_LAUNCH        = 1000;
  var LAUNCH_LIBRARY_NEXT_EXT = "/next/";
  var DEFAULT_LAUNCH_LIMIT    = 10;
  this.lastQuery = null;  
  //this.cache = $cacheFactory('rocketImageCache');
  

  this.EncodeQueryData = function (data)
  {
     var ret = [];
     for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
     return ret.join("&");
  };

  this.getRocketImage = function(id, url, size) {
    this.cache.get(id);
  }

  this.getNextFilteredLaunches = function (args) {    
    this.lastQuery = args;
    var url = LAUNCH_LIBRARY_ROOT_URL;
    url += "?" + this.EncodeQueryData(args);
    console.log(url);

    var obj = {launches:null, total:null, pages: null};
    $http.get(url).success(function(data) {
      obj.launches = data.launches;   
      obj.total = data.total;
      //add list of pages
      obj.pages = [];
      var numPages = Math.ceil(data.total / DEFAULT_LAUNCH_LIMIT);
      for (var i=1; i<=numPages; i++){
        obj.pages.push(i);
      }
      console.log(numPages);
      console.log(data.total);
      console.log(data.count);
    });

    return obj;
  }

  this.getLaunchPage = function (page){
    console.log(this.lastQuery);
    var args = this.lastQuery;
    args["offset"] = (page-1) * DEFAULT_LAUNCH_LIMIT;
    return this.getNextFilteredLaunches(args);
  }

  this.getNextLaunches = function (numLaunches) {
    var today = (new Date()).toISOString().slice(0,10);
    console.log(today);
    var args = {"startdate":today, "mode": "verbose"};
    return this.getNextFilteredLaunches(args);
  };

  this.getAllLaunches = function (){
    var url = LAUNCH_LIBRARY_ROOT_URL;
    var args = {"startdate": "2015-01-01", "mode": "verbose", "limit": 30};
    return this.getNextFilteredLaunches(args);
  }

  
}]);


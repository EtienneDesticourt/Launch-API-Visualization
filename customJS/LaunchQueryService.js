angular.module('launchAPI', [])
.service('launchDataFetcher', ['$http', '$cacheFactory', function($http, $cacheFactory) {
  var LAUNCH_LIBRARY_ROOT_URL = "https://launchlibrary.net/1.2/";
  var LAUNCH_LIBRARY_LAUCH_EXT = "launch";
  var LAUNCH_LIBRARY_ALLPADS_EXT = "pad?mode=verbose&limit=200";
  //Number of results in each request unless the limit arg is set
  var DEFAULT_LAUNCH_LIMIT = 10;
  //last http get arguments (unencoded)
  this.lastQueryArgs = null;

  this.encodeQueryData = function (data) {
     var ret = [];
     for (var key in data)
        ret.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
     return ret.join("&");
  }

  this.getLaunches = function (args) {    
    var url = LAUNCH_LIBRARY_ROOT_URL + LAUNCH_LIBRARY_LAUCH_EXT;
    url += "?" + this.encodeQueryData(args);

    var obj = {launches:null, total:null, pages:null};
    $http.get(url).success(function(data) {
      obj.launches = data.launches;   
      obj.total = data.total;

      //gen list of pages
      obj.pages = [];
      var numPages = Math.ceil(data.total / DEFAULT_LAUNCH_LIMIT);
      for (var i = 1; i <= numPages; i++) {
        obj.pages.push(i);
      }
    });

    this.lastQueryArgs = args;
    return obj;
  }

  this.getLaunchPage = function (page) {
    var args = this.lastQueryArgs;
    //pages start from 1 so page - 1 to get an offset of 0 on first page.
    args["offset"] = (page - 1) * DEFAULT_LAUNCH_LIMIT;
    return this.getLaunches(args);
  }

  this.getNextLaunches = function () {
    var today = (new Date()).toISOString().slice(0,10); //first 10 chars of iso string are YYYY-MM-DD
    var args = {"startdate":today, "mode":"verbose"};
    return this.getLaunches(args);
  }

  this.getAllPads = function () {
    var url = LAUNCH_LIBRARY_ROOT_URL + LAUNCH_LIBRARY_ALLPADS_EXT;
    var obj = {allPads:null};
    $http.get(url, {cache:true}).success(function(data) {
      obj.allPads = data.pads;
    });
    return obj;
  } 
}]);

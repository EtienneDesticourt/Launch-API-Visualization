angular.module('launchAPI', [])
.factory('launchDataFetcher', ['$http', function($http) {
  var LAUNCH_LIBRARY_ROOT_URL = "https://launchlibrary.net/1.2/";
  var LAUNCH_LIBRARY_NEXT_EXT = "launch/next/";

  var getNextLaunches = function (numLaunches) {
    var url = LAUNCH_LIBRARY_ROOT_URL + LAUNCH_LIBRARY_NEXT_EXT + numLaunches.toString();
    var obj = {launches:null};
    $http.get(url).success(function(data) {
      obj.launches = data.launches;      
    });

    return obj;
  };

  var EncodeQueryData = function (data)
  {
     var ret = [];
     for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
     return ret.join("&");
  };

  var getNextFilteredLaunches = function (numLaunches, args) {    
    var url = LAUNCH_LIBRARY_ROOT_URL + LAUNCH_LIBRARY_NEXT_EXT + numLaunches.toString();
    url = url + "?" + EncodeQueryData(args);
    console.log(url);
    return;
    var obj = {launches:null};
    $http.get(url).success(function(data) {
      obj.launches = data.launches;      
    });

    return obj;
  }

  return {
    getNextLaunches: getNextLaunches,
    getNextFilteredLaunches: getNextFilteredLaunches
  };
}]);


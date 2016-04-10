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

  return {
    getNextLaunches: getNextLaunches
  };
}]);


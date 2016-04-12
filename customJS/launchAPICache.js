angular.module('spaceLaunches')
.factory('launchAPICache', function($cacheFactory) {
  return $cacheFactory('rockets');
});
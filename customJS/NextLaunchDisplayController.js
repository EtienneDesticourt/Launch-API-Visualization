angular.module('spaceLaunches', ['launchAPI', 'launchDisplayFilters'])
.controller('NextLaunchDisplayController', ['launchDataFetcher', function(launchDataFetcher) {
  //Mission type -> image url association
  this.MISSION_IMAGES = new Array("images\\missions\\earthScience.jpg",
  								  "images\\missions\\planetaryScience.jpg",
  								  "images\\missions\\astrophysics.jpg",
  								  "images\\missions\\heliophysics.jpg",
  								  "images\\missions\\humanExploration.jpg",
  								  "images\\missions\\roboticExploration.jpg",
  								  "images\\missions\\topSecret.jpg",
  								  "images\\missions\\tourism.jpg",
  								  "images\\missions\\unknown.jpg",
  							    "images\\missions\\communications.jpg",
  							 	  "images\\missions\\ressuply.jpg");



  this.nextLaunches = launchDataFetcher.getNextLaunches(4);

  this.convertCountryCode = function convertCountryCode(code) {
    return code.substring(0,2);
  }
}]);


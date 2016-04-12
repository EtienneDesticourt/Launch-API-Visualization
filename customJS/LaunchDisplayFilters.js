angular.module('launchDisplayFilters', [])
.filter('limitAndEllipse', function() {
  return function(input, maxChars) {  	
  	if (input.length > maxChars){
  		return input.substring(0, maxChars) + " ...";
  	}
  	else{
  		return input;
  	}
  };
})
.filter('formatRocketUrl', function() {
	return function(input, size) {
		var baseurl = input.split("_")[0];
		return baseurl + "_" + size + ".jpg";
	}
});


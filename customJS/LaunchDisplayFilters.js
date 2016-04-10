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
});


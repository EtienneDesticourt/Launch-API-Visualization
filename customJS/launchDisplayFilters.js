angular.module('launchDisplayFilters', [])
.filter('limitAndEllipse', function() {
    //Truncates string to given size and adds ... at the end
    return function(input, maxChars) {      
        if (input.length > maxChars){
            return input.substring(0, maxChars) + " ...";
        }
        else{
            return input;
        }
    }
})
.filter('formatRocketUrl', function() {
    //Ex url: rocket_defaultsize.jpg, returns: rocket_newsize.jpg
    return function(input, size) {
        var baseurl = input.split("_")[0];
        return baseurl + "_" + size + ".jpg";
    }
});


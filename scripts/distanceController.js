app.controller('distanceController', function ($scope) {
    
    $scope.calcDistance = function (origin, destination) {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [origin]
            , destinations: [destination]
            , travelMode: google.maps.TravelMode.WALKING
            , unitSystem: google.maps.UnitSystem.IMPERIAL
            , avoidHighways: false
            , avoidTolls: false
        }, callback);
    }

    var callback = function (response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
            $scope.distanceText = err;
        }
        else {
            var origin = response.originAddresses[0];
            var destination = response.destinationAddresses[0];
            if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                $scope.distanceText = "There are no roads between " + origin + " and " + destination;
            }
            else {
                var distance = response.rows[0].elements[0].distance;
                var distance_value = distance.value;
                var distance_text = distance.text;
                var miles = distance_text.substring(0, distance_text.length - 3);
                $scope.distanceText = "It is " + miles + " miles from " + origin + " to " + destination;
            }
        }
    }
});
//Random Beach Array
var beaches = ["Kapalua Bay Beach, Maui, Hawaii", "Ocracoke Lifeguarded Beach, Outer Banks, North Carolina", "Grayton Beach State Park, Florida Panhandle",
    "Coopers Beach, Southampton, New York", "Coast Guard Beach, Cape Cod, Massachusetts", "Lighthouse Beach, Buxton, Outer Banks, North Carolina",
    "Caladesi Island State Park, Dunedin/Clearwater, Florida", "Hapuna Beach State Park, Big Island, Hawaii", "Coronado Beach, San Diego, California",
    "Beachwalker Park, Kiawah Island, South Carolina"];

var hotelData = [
    {
        "Kapalua Bay Beach, Maui, Hawaii": {
            "address": "1 Ritz-Carlton Drive, Kapalua, HI",
            "name": "The Ritz-Carlton, Kapalua",
            "price": "459",
            "roomType": "Deluxe King or Queen Room"
        },
        "Ocracoke Lifeguarded Beach, Outer Banks, North Carolina": {
            "address": "300 Budleigh Street, Manteo, NC",
            "name": "Cameron House Inn",
            "price": "173",
            "roomType": "Queen Room with Spa Bath - Non-refundable"
        },
        "Grayton Beach State Park, Florida Panhandle": {
            "address": "34 Goldenrod Circle, Santa Rosa Beach, FL",
            "name": "WaterColor Inn & Resort",
            "price": "274",
            "roomType": "BeachFront Coastal View"
        },
        "Coopers Beach, Southampton, New York": {
            "address": "1 Bridgehampton Sag Harbor Turnpike, Bridgehampton, NY",
            "name": "Topping Rose House",
            "price": "561",
            "roomType": "Studio King - Non-refundable"
        },
        "Coast Guard Beach, Cape Cod, Massachusetts": {
            "address": "2907 Main Street, Brewster, MA",
            "name": "The Mansion at Ocean Edge Resort & Golf Club",
            "price": "175",
            "roomType": "Deluxe Double Room - Non-refundable"
        },
        "Lighthouse Beach, Buxton, Outer Banks, North Carolina": {
            "address": "46556 Highway 12, Buxton, NC",
            "name": "Cape Hatteras Motel",
            "price": "119",
            "roomType": "Queen Room with Two Queen Beds - Oceanfront"
        },
        "Caladesi Island State Park, Dunedin/Clearwater, Florida": {
            "address": "301 South Gulfview Boulevard, Clearwater, FL",
            "name": "Hyatt Regency Clearwater Beach Resort & Spa",
            "price": "244",
            "roomType": "Deluxe Queen Room with Two Queen Beds"
        },
        "Hapuna Beach State Park, Big Island, Hawaii": {
            "address": "62-100 Kauna Oa Drive, Kamuela, HI",
            "name": "The Westin Hapuna Beach Resort",
            "price": "615",
            "roomType": "Deluxe Queen - Beachfront"
        },
        "Coronado Beach, San Diego, California": {
            "address": "1003 Coast Boulevard, San Diego, CA",
            "name": "Pantai Inn",
            "price": "390",
            "roomType": "One-Bedroom Cottage with Partial Ocean View"
        },
        "Beachwalker Park, Kiawah Island, South Carolina": {
            "address": "334 Meeting Street, Charleston, SC",
            "name": "The Dewberry Charleston",
            "price": "285",
            "roomType": "Grand 2 Queens"
        }
    }
]

// Airport Array - order matches beach array (substituted major airports as hotel API did not recognize some smaller airports)
var destinationCode = ["OGG", "EWN", "ECP", "JFK", "MVY", "EWN", "PIE", "KOA", "SAN", "HHH"]

// Initialize Firebase
var config = {
    apiKey: "AIzaSyChELzcTpWOe3vESiwGZsUjoCNjeapooV4",
    authDomain: "beach-out.firebaseapp.com",
    databaseURL: "https://beach-out.firebaseio.com",
    projectId: "beach-out",
    storageBucket: "beach-out.appspot.com",
    messagingSenderId: "502652986769"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#vacation-button").on("click", function (event) {
    event.preventDefault();

    var userEmail = $("#email-add").val().trim();

    database.ref().push(userEmail);
})

//these are just helper functions that can manupulate the DOM
//in this case we just get rid of the vacation Button
//and add and remove some classes
function removeGoButton() {
    $('#vacation-button').hide();
    $('#email-add').removeClass('email-good')
    $('#email-add').addClass('email-bad')
}
function addGoButton() {
    $('#vacation-button').show();
    $('#email-add').removeClass('email-bad')
    $('#email-add').addClass('email-good')
}

//this just hides the "Vacation button" as per the above
$('#vacation-button').hide();

function validateEmail() {
    var x = $('#email-add').val();

    if (x.indexOf("@") === -1) {
        removeGoButton();
        //this is used down below to see if it's valid or not
        return false;
    } else {
        addGoButton();
        $('#vacation-button').prop("disabled", false);
        //this is used down below to see if it's valid or not
        return true;
    }
}

//Generates Random Beach Location
var beachrandom = beaches[Math.floor(Math.random() * beaches.length)];


//Creates a variable for the appropriate Airport code to match beach location
var selectedDestinationCode = "";
var selectedHotel = "";

function generateAirportCode() {
    for (var i = 0; i < beaches.length; i++) {
        if (beachrandom === beaches[i]) {
            selectedDestinationCode = destinationCode[i];
            selectedHotel = hotelData[0][beachrandom];
            console.log(beachrandom, selectedDestinationCode, selectedHotel)
        }
    }
}
generateAirportCode();

//Band-Aid for Hotel Data while the API is down Uses HotelData array
function populateHotelData() {
    var hotelName = selectedHotel.name;
    var hotelPrice = selectedHotel.price;
    var fullAddress = selectedHotel.address;
    var roomType = selectedHotel.roomType;

    $(".HoName").append(hotelName);
    $(".HoPrice").append("$" + hotelPrice);
    $(".HoAddress").append(fullAddress);
    $(".HoRoomType").append(roomType);
}

//This function runs the whole application... parameters are used to provide the data from user.
function displayCityData(beachLocation, depDate, returnDate, userAirportCode) {
    //Restaurant API
    var clientID = "-_-qsu9VN_Mu1cRQ_CEfbA"
    var apikey = "eGyFYoGa3oYrHwELLpuXsE9A1l9W6d6AoJszCKMPa3M9SNgR2kx1md-nelFS1jJdfOb1sCD3knBmuWA7kDTZSoZMehkn0-Avx1VDY6QMhAX45RpIuKyxSBZ53eTsW3Yx"
    var queryURL = "https://developers.zomato.com/api/v2.1/locations?query=" + beachLocation + "&apikey=937d785cc1c1b2ac1098e43a13b9cf22";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var entityID = response.location_suggestions[0].entity_id;
        var entityType = response.location_suggestions[0].entity_type;
        var locationDetailQueryURL = "https://developers.zomato.com/api/v2.1/location_details?entity_id=" + entityID + "&entity_type=" + entityType + "&apikey=937d785cc1c1b2ac1098e43a13b9cf22"

        $.ajax({
            url: locationDetailQueryURL,
            method: "GET"
        }).then(function (response) {
            var topRestaurant = response.best_rated_restaurant[0].restaurant.name;
            var topRestaurantURL = response.best_rated_restaurant[0].restaurant.url;
            var topRestaurantAddress = response.best_rated_restaurant[0].restaurant.location.address;
            var avgCostForTwo = response.best_rated_restaurant[0].restaurant.average_cost_for_two
            var restaurantID = response.best_rated_restaurant[0].restaurant.R.res_id;

            var restaurntDetailQueryURL = "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + restaurantID + "&apikey=937d785cc1c1b2ac1098e43a13b9cf22"
            $.ajax({
                url: restaurntDetailQueryURL,
                method: "GET"
            }).then(function (response) {
                var restaurantLocation = response.location.address
                var avgCost = response.average_cost_for_two;
                var cuisines = response.cuisines;
                //Flight API
                $.ajax({
                    url: "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=HEbMkphMv3ReciH7JfBcCzGQLfGG2UCk&origin=" + userAirportCode + "&destination=" + selectedDestinationCode + "&departure_date=" + depDate + "&return_date=" + returnDate + "&number_of_results=1",
                    method: "GET"
                }).then(function (response) {
                    var flightPrice = response.results[0].fare.total_price;
                    var departsAt = moment(response.results[0].itineraries[0].outbound.flights[0].departs_at).format("MM/DD/YYYY hh:mm a ");
                    var arrivesAt = moment(response.results[0].itineraries[0].outbound.flights[(response.results[0].itineraries[0].outbound.flights.length - 1)].arrives_at).format("MM/DD/YYYY hh:mm a");
                    var duration = response.results[0].itineraries[0].outbound.duration;
                    var airlineCode = response.results[0].itineraries[0].outbound.flights[0].operating_airline;
                    var retDepartsAt = moment(response.results[0].itineraries[0].inbound.flights[0].departs_at).format("MM/DD/YYYY hh:mm a ");
                    var retArrivesAt = moment(response.results[0].itineraries[0].inbound.flights[(response.results[0].itineraries[0].inbound.flights.length - 1)].arrives_at).format("MM/DD/YYYY hh:mm a");
                    var retDuration = response.results[0].itineraries[0].inbound.duration;
                    var retAirlineCode = response.results[0].itineraries[0].inbound.flights[0].operating_airline;
                    console.log(retDepartsAt, retAirlineCode, retArrivesAt, retDuration)
                    $('.Cuisines').append(cuisines);
                    $('.ResName').html(`<a href="${topRestaurantURL}" target="blank">${topRestaurant}</a>`)
                    $('.ResforTwo').append("$" + avgCostForTwo);
                    $('.ResAddress').append(topRestaurantAddress);
                    $(".ArrivalAirport").append(`<a href="https://en.wikipedia.org/wiki/List_of_airports_by_IATA_code:_A" target="blank">${selectedDestinationCode}</a>`)
                    $(".Airline").append(`<a href="https://www.airfarewatchdog.com/airline-codes/" target="blank">${airlineCode}</a>`)
                    $(".FlightPrice").append("$" + flightPrice);
                    $(".LeaveDate").append(departsAt);
                    $(".FlightArrival").append(arrivesAt);
                    $(".Duration").append(duration);
                    $(".retFlightPrice").append("Above");
                    $(".retArrivalAirport").append(`<a href="https://en.wikipedia.org/wiki/List_of_airports_by_IATA_code:_A" target="blank">${userAirportCode}</a>`)
                    $(".retAirline").append(`<a href="https://www.airfarewatchdog.com/airline-codes/" target="blank">${retAirlineCode}</a>`)
                    $(".retLeaveDate").append(retDepartsAt);
                    $(".retFlightArrival").append(retArrivesAt);
                    $(".retDuration").append(retDuration);

                    populateHotelData();
                }).catch(function (error) {
                    $('td').empty();
                    alert(error.responseJSON.message);
                    $('td').empty();
                })
            })
        })

        //Hotel API --- NOT WORKING(AMADEUS SUPPORT WORKING ON ISSUE)  REPLACEMENT BAND AID ABOVE
        // var hotelQueryURL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport/?apikey=KWxHu3JXbSfuZ0ZfU5AmxbNfkmVaKQTX&location=" + selectedDestinationCode + "&check_in=" + depDate + "&check_out=" + returnDate;
        // var hotelQueryURL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport/?apikey=KWxHu3JXbSfuZ0ZfU5AmxbNfkmVaKQTX&location=" + selectedDestinationCode + "&check_in=2019-01-02&check_out=2019-01-09"
        // $.ajax({
        //     url: hotelQueryURL,
        //     method: "GET"
        // }).then(function (response) {
        //     console.log(JSON.stringify(response));
        // var hotelName = response.results[0].property_name;
        // var hotelPrice = response.results[0].total_price.amount;
        // var hotelStreet = response.results[0].address.line1;
        // var hotelCity = response.results[0].address.city;
        // var hotelState = response.results[0].address.region;
        // var hotelPostal = response.results[0].address.postal_code;
        // var fullAddress = hotelStreet + "" + hotelCity + "" + hotelState + "" + hotelPostal;
        // var roomType = response.results[0].rooms[0].room_type_info.room_type;

        // $(".HoName").append(hotelName);
        // $(".HoPrice").append("$" + hotelPrice);
        // $(".HoAddress").append(fullAddress);
        // $(".HoRoomType").append(roomType);
        // })


    })
}

var backdrop = document.querySelector('.backdrop');
var modal = document.querySelector('.modal');
var modalContent = document.querySelector('.modal-content');
var closeButton = document.querySelector('.close');

closeButton.onclick = function () {
    modal.style.display = "none";
    backdrop.style.display = "none";
}

//Button click event which sets EVERYTHING in motion.
$('#vacation-button').on("click", function () {
    anime({
        targets: "#vacation-button",
        opacity: [{ value: 0.5, duration: 1000 }, { value: 1, duration: 1000 }],
        complete: function () {
            modal.style.display = 'block';
            backdrop.style.display = 'block';
            modalContent.textContent = "Preparing Restaurant, Hotel and Flights for your excusrion to: " + beachrandom;

        }
    });
    $('td').empty();
    depDate = $("#departure-date").val();
    returnDate = $("#returnDate").val();
    userAirportCode = $("#user-airport").val().trim().toUpperCase();
    displayCityData(beachrandom, depDate, returnDate, userAirportCode);
    beachrandom = beaches[Math.floor(Math.random() * beaches.length)];
    selectedHotel = hotelData[0][beachrandom];
    generateAirportCode();


})
// var randombeachoutoutput = document.querySelector('#vacation-button');



//This does validation whever that input form changes
$("#email-add").keyup(function () {
    validateEmail();
});

















// api key 242726fc7e61ebfc759b17352fed0b73

var searchHistory = [];
var search;
var index;
// weather data
var city;
var month;
var date;
var weatherIcon = $('<img>')
var tempF;
var tempC;
var humidity;
var wind;
var lat;
var lon;
var uv;
var uvURL;
var oneCallURL;
// five day
var art = document.getElementById(1);
// initialize
init();

function init() {
    var storedSearch = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedSearch) {
        searchHistory = storedSearch;
        search = searchHistory[0];
        ajaxQuery();
    } else {
        // storeEvents();
        renderEvents();
    }
};

function renderEvents() {

    $('.search-history').empty();

    for (var i = 0; i < searchHistory.length; i++) {
        index = searchHistory[i];
        var btn = $('<button>');
        btn.attr("class", "btn btn-outline-secondary historyBtn");
        btn.attr("type", "button");
        btn.attr("value", index);
        btn.text(index);
        $('.search-history').append(btn);

    }
}

function storeEvents() {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}


// on click for search
$('#searchBtn').on('click', function (event) {
    event.preventDefault();
    if ($('#search').val() === "") {
        alert("enter valid city")
    } else {
        search = $('#search').val();
        searchHistory.push(search);
        ajaxQuery();
    }
});

// localstorage buttons
$('.search-history').on('click', '.historyBtn', function (event) {
    event.preventDefault();
    console.log("click");
    search = $(this).val();
    console.log(search);
    ajaxQuery();
});

function ajaxQuery() {

    console.log(searchHistory);
    storeEvents();
    renderEvents();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=242726fc7e61ebfc759b17352fed0b73"
    var fiveDayQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=242726fc7e61ebfc759b17352fed0b73"


    // ajax query
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // city name
        city = response.name;
        console.log(city);
        // current date
        var a = new Date(response.dt * 1000);
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = months[a.getMonth()];
        date = a.getDate();
        // current weather icon
        var icon = response.weather[0].icon
        // var weatherIcon = $('<img>')
        weatherIcon.attr('src', "http://openweathermap.org/img/wn/" + icon + "@2x.png")
        // temp F
        tempF = Math.round((response.main.temp - 273.15) * 9 / 5 + 32);
        console.log(tempF);
        // temp C
        tempC = Math.round(response.main.temp - 273.15);
        console.log(tempC);
        // humidity
        humidity = response.main.humidity;
        console.log(humidity);
        // wind speed
        wind = response.wind.speed;
        console.log(wind);
        // separate uv index query using lat and lon from initial query
        lat = response.coord.lat;
        console.log("lat: " + lat);
        lon = response.coord.lon;
        console.log("lon: " + lon);
        uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=242726fc7e61ebfc759b17352fed0b73&lat=" + lat + "&lon=" + lon;
        uvQuery();

    });

    $.ajax({
        url: fiveDayQuery,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var $div = $('<div class="fiveDiv">');
        var $container = $('.article-container');

        for (var i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {


                var $art = $('<article>');
                var weather5 = $('<img>')
                
                var date = moment(response.list[i].dt_txt).format("ddd, MMM D, YYYY");

                var get = response.list[i];
                var icon5 = get.weather[0].icon;
                weather5.attr('src', "http://openweathermap.org/img/wn/" + icon5 + "@2x.png")

                var tempF5 = Math.round((get.main.temp - 273.15) * 9 / 5 + 32);
                console.log("Temperature: " + tempF5);

                var humidity5 = get.main.humidity;

                $art.append("<p>Date:  " + date + "</p>");
                $art.append("<p>Temperature: " + tempF5 + "</p>");
                $art.append("<p>Humidity: " + humidity5 + "</p>");

                $art.append(weather5);

                $div.append($art);



            }
        } $container.html($div);

    })
};
function uvQuery() {
    console.log(uvURL);
    $.ajax({
        query: uvURL,
        method: "GET"
    }).then(function (uvi) {
        console.log(uvi.value);
        uv = uvi.value;
    }).catch(function (err) {
        console.log(err);
        uv = "N/A";
    }).then(function () {
        append();
    })
};
// append data to current-weather section
function append() {
    $('#city-date, #icon, #temp, #humidity, #wind, #uv').empty();

    $('#city-date').append(city + ", " + month + " " + date);
    $('#icon').append(weatherIcon);
    $('#temp').append("Temperature: " + tempF + "°F");
    $('#humidity').append("Humidity: " + humidity + "%");
    $('#wind').append("Windspeed: " + wind + " mph");
    $('#uv').append("UV Index: " + uv);
};
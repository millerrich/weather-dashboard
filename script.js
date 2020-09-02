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
var weather5 = $('<img>')
// initialize
init();

function init() {
    var storedSearch = JSON.parse(localStorage.getItem("searchHistory"));
    if(storedSearch) {
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
        btn.attr("class", "btn btn-outline-secondary historyBtn")
        btn.attr("type", "button")
        btn.attr("value", index)
        btn.text(index)
        $('.search-history').append(btn);
        
    }
}

function storeEvents() {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}


// on click for search
$('#searchBtn').on('click', function(event) {
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
$('#historyBtn').on('click', function(event) {
    event.preventDefault();
    console.log("click");
    search = btn.val();
    console.log(search);
    ajaxQuery();
})

function ajaxQuery() {
    
    console.log(searchHistory);
    storeEvents();
    renderEvents();
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=242726fc7e61ebfc759b17352fed0b73"
    var fiveDayQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=242726fc7e61ebfc759b17352fed0b73"
    
    // console.log(search);
    // console.log(queryURL);
    
    // ajax query
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        // city name
        city = response.name;
        console.log(city);
        // current date
        var a = new Date(response.dt * 1000);
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = months[a.getMonth()];
        console.log(month);
        date = a.getDate();
        console.log(date);
        // current weather icon
        var icon = response.weather[0].icon
        console.log(icon); 
        // var weatherIcon = $('<img>')
        weatherIcon.attr('src', "http://openweathermap.org/img/wn/" + icon + "@2x.png")
        // temp F
        tempF = Math.round((response.main.temp - 273.15) * 9/5 + 32);
        console.log(tempF);
        // temp C
        tempC = Math.round(response.main.temp -273.15);
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
        uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=242726fc7e61ebfc759b17352fed0b73&lat=" + lat + "&lon=" + lon
        // oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=242726fc7e61ebfc759b17352fed0b73"
        // append();
        uvQuery();
        
    });
    
    $.ajax({
        url: fiveDayQuery,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        
        for (var i = 0; i < response.list.length; i++) 
        if (response.list[i].dt_txt.indexOf("15:00:00")!==-1) {
            
            
            var container = $('#article-container');
            var art5 = $('article');
            
            var date = response.list[i].dt_txt;
            console.log(date);
            art5.append(date);
            var get = response.list[i];
            var icon5 = get.weather[0].icon;
            weather5.attr('src', "http://openweathermap.org/img/wn/" + icon5 + "@2x.png")
            console.log(icon5);
            art5.append(weather5);
            var tempF5 = Math.round((get.main.temp - 273.15) * 9/5 + 32);
            console.log("Temperature: " + tempF5);
            art5.append("Temperature: " + tempF5);
            var humidity5 = get.main.humidity;
            console.log("Humidity: " + humidity5);
            art5.append("Humidity: " + humidity);
        } 

                // container.append(art5);
    })
};
function uvQuery() {
    console.log(uvURL);
    $.ajax({
        query: uvURL,
        method: "GET"
    }).then(function(uvi) {
        console.log(uvi.value);
        uv = uvi.value;
    }).catch(function(err) {
        console.log(err);
        uv = "N/A";
    }).then(function() {
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
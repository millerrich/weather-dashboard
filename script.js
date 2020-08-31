// api key 242726fc7e61ebfc759b17352fed0b73
var searchHistory = [];


    // initialize

    // set item to local storage

    // render buttons from local storage

// on click for search
$('#searchBtn').on('click', function(event) {
    event.preventDefault();
    
    var search = $('#search').val();
    
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=242726fc7e61ebfc759b17352fed0b73"
    var fiveDayQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=242726fc7e61ebfc759b17352fed0b73"
    console.log(search);
    console.log(queryURL);


    
    // ajax query
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        searchHistory.push(search);
        console.log(response);
        // city name
        var city = response.name;
        console.log(city);
        // current date
        var a = new Date(response.dt * 1000);
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var month = months[a.getMonth()];
        console.log(month);
        var date = a.getDate();
        console.log(date);
        // current weather icon
        var icon = response.weather[0].icon
        console.log(icon); 
        var weatherIcon = $('<img>')
        weatherIcon.attr('src', "http://openweathermap.org/img/wn/" + icon + "@2x.png")
        // temp F
        var tempF = Math.round((response.main.temp - 273.15) * 9/5 + 32);
        console.log(tempF);
        // temp C
        var tempC = Math.round(response.main.temp -273.15);
        console.log(tempC);
        // humidity
        var humidity = response.main.humidity;
        console.log(humidity);
        // wind speed
        var wind = response.wind.speed;
        console.log(wind);
        // separate uv index query using lat and lon from initial query
        var lat = response.coord.lat;
        console.log("lat: " + lat);
        var lon = response.coord.lon;
        console.log("lon: " + lon);
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=242726fc7e61ebfc759b17352fed0b73&lat=" + lat + "&lon=" + lon
        $.ajax({
            query: uvURL,
            method: "GET"
        }).then(function(uvi) {
            console.log(uvi);
        })

        // append data to current-weather section
        $('#city-date').append(city + ", " + month + " " + date);
        $('#icon').append(weatherIcon);
        $('#temp').append("Temperature: " + tempF + "°F");
        $('#humidity').append("Humidity: " + humidity + "%");
        $('#wind').append("Windspeed: " + wind + " mph");
    });

    $.ajax({
        url: fiveDayQuery,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var cityName = response.city.name;
        console.log(cityName);
        // var icon = response.list[].weather[].icon
    })
});

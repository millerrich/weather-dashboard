// api key 242726fc7e61ebfc759b17352fed0b73


// on click for search
$('#searchBtn').on('click', function(event) {
    event.preventDefault();
    
    var search = $('#search').val();
    
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=242726fc7e61ebfc759b17352fed0b73"
    console.log(search);
    console.log(queryURL);
    
    // ajax query
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var tempF = (response.main.temp - 273.15) * 9/5 + 32;
        console.log(tempF);
        var tempC = response.main.temp -273.15;
        console.log(tempC);
        var weatherArray = [];
        var icon = response.weather[0].icon
        console.log(icon); 
        var weatherIcon = $('<img>')
        weatherIcon.attr('src', "http://openweathermap.org/img/wn/" + icon + "@2x.png")
        $('.article-container').append(weatherIcon);
        var testObject = {
            one: "throw",
            two: "Tree",
            three: "nowie"
        }
        console.log(testObject);
    });
});

var display = $('.stats')
var currentCity = $('.currentCity') 
var cityQuery = $('#search')
var sBtn = $('#sBtn')
var gBtn = $('#gBtn')
var cityValidation = $('#cityValidation')
var cityOptions = $('#cityOptions')
var cityArray = []



var citySearch = function() {

    var urlString = document.location.search;
    var cityName = urlString.split('&')[0];

    if (cityName) {
        // currentCity.textContent = cityName;
        getCity(cityName);
      } else {
        document.location.replace('./index.html');

    }
}


var getCity = function(city) {
    var apiGeo = 'http://api.openweathermap.org/geo/1.0/direct' + city + '&limit=5&appid=0ab16bd9ca1ea598f1fc384ead80bb3a';
    apiGeo = apiGeo.replace("search", "q");
    
    fetch(apiGeo).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
              displayCities(data);
            })
        }
    })
}

var displayCities = function(cities) {
    if (cities.length === 0) {
      cityValidation.textContent = 'No cities found';
      return;
    } else if (cities.length === 1) {
      cityValidation.textContent = 'One city found';
      resultLat = cities.lat;
      resultLon = cities.lon;  
    //   getWeather();
    }
    cityValidation.textContent = 'Multiple cities found.  Select one:';
    for (var i = 0; i < cities.length; i++) {
    //   var cityOptions = $('#cityOptions');
      cityOptions.append('<option>' + cities[i].name + ' ' + cities[i].state + ' Country: ' + cities[i].country + '</option>');
      cityOptions.children().eq(i).attr({
        'id': 'choice' + i,
        'value': i
        })
        cityArray.push(cities[i])
      console.log(cities[i].lat)
      console.log(cities[i].lon)
    }
    console.log(cityArray)
}


function getWeather() {
    // if (cities.length>0) {
        $(".removeThis").remove();
        var o = cityOptions.find(":selected").val()
        // var s = cityOptions.selectedIndex
        console.log("hi")
    // console.log(cities[o].lat)
    resultLat = parseInt(cityArray[o].lat);
    resultLon = parseInt(cityArray[o].lon);
    resultCity = cityArray[o].name;
    resultState = cityArray[o].state;
    resultCountry = cityArray[o].country;
    console.log("City: " + resultCity + " State: " + resultState + " Country: " + resultCountry)
    // }
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + resultLat + '&lon=' + resultLon + '&appid=0ab16bd9ca1ea598f1fc384ead80bb3a'; 

fetch(apiUrl).then(function (response) {
    return response.json();
})
.then(function (data) {
    // console.log(data);
    // console.log(dayjs.unix(1674356400));
    display.append('<li>' + resultCity + " " + resultState + " " + resultCountry + " - " + dayjs.unix(data.list[0].dt).format("h" + "A" + "  (" + 'MMM' + " " + "D" + ", " + "YYYY" + ")") + '</li>');
    display.append('<li><strong>' + "Temp: </strong>" + ((data.list[0].main.temp - 273.15) * 9/5 + 32).toFixed(2) + "° F" + '</li>');
    display.append('<li><strong>' + "Wind: </strong>" + (data.list[0].wind.speed * 2.23694).toFixed(2) + "  MPH" +  '</li>');
    display.append('<li><strong>' + "Humidity: </strong>" + data.list[0].main.humidity + " %" + '</li>');
    display.children().addClass("list-group-item text-start removeThis");
    display.children().eq(0).addClass("fs-3 fw-bold");
    currentCity.text(resultCity + " ");
    

    for (i=1;i<6;i++) {
        var futureStats = $('.day' + i)
        $('.futureStats').eq(i-1).append('<strong>' + dayjs.unix(data.list[0].dt).add(i, 'day').format('MMM' + " " + "D" + ", " + "YYYY") + "</strong>");
        futureStats.append('<li><strong>' + "Temp:</strong>" + "<span></span>" + "° F" + '</li>');
        futureStats.children().eq(1).children('span').attr("id", "varTemp" + i);
        futureStats.append('<li><strong>' + "Wind:</strong>" + "<span></span>" + "MPH" +  '</li>');
        futureStats.children().eq(2).children('span').attr("id", "varWind" + i);
        futureStats.append('<li><strong>' + "Humidity:</strong>" + "<span></span>" + "%" + '</li>');
        futureStats.children().eq(3).children('span').attr("id", "varHum" + i);
        futureStats.children().addClass("list-group-item text-start smallFont removeThis");
        futureStats.children().children().addClass("removeThis")
        futureStats.children().eq(0).removeClass("removeThis");
    }
    
    let dayOneCount = 0;
    let dayTwoCount = 0;
    let dayThreeCount = 0;
    let dayFourCount = 0;
    let dayFiveCount = 0;
    let dayOneTemp = 0;
    let dayOneHum = 0;
    let dayOneWind = 0;
    let dayTwoTemp = 0;
    let dayTwoHum = 0;
    let dayTwoWind = 0;
    let dayThreeTemp = 0;
    let dayThreeHum = 0;
    let dayThreeWind = 0;
    let dayFourTemp = 0;
    let dayFourHum = 0;
    let dayFourWind = 0;
    let dayFiveTemp = 0;
    let dayFiveHum = 0;
    let dayFiveWind = 0;
    i = 0;
    
    while (i<data.list.length) {
        today = dayjs.unix(data.list[0].dt).date();
        varDay = dayjs.unix(data.list[i].dt);
        
        if (today !== varDay) {
            if (today == varDay.subtract(1, "day").date()) {    
                dayOneTemp = parseInt(dayOneTemp) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                dayOneWind = parseInt(dayOneWind) + parseInt((data.list[i].wind.speed * 2.23694).toFixed(2));
                dayOneHum = parseInt(dayOneHum) + parseInt(data.list[i].main.humidity);
                dayOneCount = dayOneCount + 1;
            }
            if (today == varDay.subtract(2, "day").date()) {
                dayTwoTemp = parseInt(dayTwoTemp) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                dayTwoWind = parseInt(dayTwoWind) + parseInt((data.list[i].wind.speed * 2.23694).toFixed(2));
                dayTwoHum = parseInt(dayTwoHum) + parseInt(data.list[i].main.humidity);
                dayTwoCount = dayTwoCount + 1;
            }
            if (today == varDay.subtract(3, "day").date()) {
                dayThreeTemp = parseInt(dayThreeTemp) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                dayThreeWind = parseInt(dayThreeWind) + parseInt((data.list[i].wind.speed * 2.23694).toFixed(2));
                dayThreeHum = parseInt(dayThreeHum) + parseInt(data.list[i].main.humidity);
                dayThreeCount = dayThreeCount + 1;
            }
            if (today == varDay.subtract(4, "day").date()) {
                dayFourTemp = parseInt(dayFourTemp) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                dayFourWind = parseInt(dayFourWind) + parseInt((data.list[i].wind.speed * 2.23694).toFixed(2));
                dayFourHum = parseInt(dayFourHum) + parseInt(data.list[i].main.humidity);
                dayFourCount = dayFourCount + 1;
            }
            if (today == varDay.subtract(5, "day").date()) {
                dayFiveTemp = parseInt(dayFiveTemp) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                dayFiveWind = parseInt(dayFiveWind) + parseInt((data.list[i].wind.speed * 2.23694).toFixed(2));
                dayFiveHum = parseInt(dayFiveHum) + parseInt(data.list[i].main.humidity);
                dayFiveCount = dayFiveCount + 1;
            }
        }
        
        i++;
    };
    varTemp1 = (dayOneTemp/dayOneCount).toFixed(2);
    $('#varTemp1').text(varTemp1);
    varWind1 = (dayOneWind/dayOneCount).toFixed(2);
    $('#varWind1').text(varWind1);
    varHum1 = (dayOneHum/dayOneCount).toFixed(2);
    $('#varHum1').text(varHum1);
    
    varTemp2 = (dayTwoTemp/dayTwoCount).toFixed(2);
    $('#varTemp2').text(varTemp2);
    varWind2 = (dayTwoWind/dayTwoCount).toFixed(2);
    $('#varWind2').text(varWind2);
    varHum2 = (dayTwoHum/dayTwoCount).toFixed(2);
    $('#varHum2').text(varHum2);
    
    varTemp3 = (dayThreeTemp/dayThreeCount).toFixed(2);
    $('#varTemp3').text(varTemp3);
    varWind3 = (dayThreeWind/dayThreeCount).toFixed(2);
    $('#varWind3').text(varWind3);
    varHum3= (dayThreeHum/dayThreeCount).toFixed(2);
    $('#varHum3').text(varHum3);
    
    varTemp4 = (dayFourTemp/dayFourCount).toFixed(2);
    $('#varTemp4').text(varTemp4);
    varWind4 = (dayFourWind/dayFourCount).toFixed(2);
    $('#varWind4').text(varWind4);
    varHum4 = (dayFourHum/dayFourCount).toFixed(2);
    $('#varHum4').text(varHum4);
    
    varTemp5 = (dayFiveTemp/dayFiveCount).toFixed(2);
    $('#varTemp5').text(varTemp5);
    varWind5 = (dayFiveWind/dayFiveCount).toFixed(2);
    $('#varWind5').text(varWind5);
    varHum5 = (dayFiveHum/dayFiveCount).toFixed(2);
    $('#varHum5').text(varHum5);
    
    
})
}

citySearch()

$(document).ready(function () {
var display = $('.stats')
var currentCity = $('.currentCity') 
var cityQuery = $('#search')
var sBtn = $('#sBtn')
var gBtn = $('#gBtn')
var cityValidation = $('#cityValidation')
var cityOptions = $('#cityOptions')
var listHistory = $("#sHistory")
var cityArray = []

if (!localStorage.getItem("sHistory")) {
    var sHistory = {
        h1: [],
        Display1: "",
        h2: [],
        Display2: "",
        h3: [],
        Display3: "",
        h4: [],
        Display4: "",
        h5: [],
        Display5: "",
    }
    localStorage.setItem("sHistory", JSON.stringify(sHistory));
} else {
    var sHistory = JSON.parse(localStorage.getItem("sHistory"));
};
listHistory.append(sHistory.Display1)
listHistory.append(sHistory.Display2)
listHistory.append(sHistory.Display3)
listHistory.append(sHistory.Display4)
listHistory.append(sHistory.Display5)
listHistory.children().addClass("list-group-item text-start")
listHistory.children().children().addClass("rounded bg-dark-subtle my-2")
listHistory.children().eq(0).children().attr("id", "hBtn1");
listHistory.children().eq(1).children().attr("id", "hBtn2");
listHistory.children().eq(2).children().attr("id", "hBtn3");
listHistory.children().eq(3).children().attr("id", "hBtn4");
listHistory.children().eq(4).children().attr("id", "hBtn5");

buttonCall()

function buttonCall() {
    $('#hBtn1').click(function(){
        resultLat = parseInt(sHistory.h1.lat);
        resultLon = parseInt(sHistory.h1.lon);
        resultCity = sHistory.h1.name;
        resultState = sHistory.h1.state;
        resultCountry = sHistory.h1.country;
        var passArray = [resultLat, resultLon, resultCity, resultState, resultCountry]
        listHistory.append(sHistory.Display1)
        getWeather(passArray)
    })

    $('#hBtn2').click(function(){
        resultLat = parseInt(sHistory.h2.lat);
        resultLon = parseInt(sHistory.h2.lon);
        resultCity = sHistory.h2.name;
        resultState = sHistory.h2.state;
        resultCountry = sHistory.h2.country;
        var passArray = [resultLat, resultLon, resultCity, resultState, resultCountry]
        listHistory.append(sHistory.Display2)
        getWeather(passArray)
    })

    $('#hBtn3').click(function(){
        resultLat = parseInt(sHistory.h3.lat);
        resultLon = parseInt(sHistory.h3.lon);
        resultCity = sHistory.h3.name;
        resultState = sHistory.h3.state;
        resultCountry = sHistory.h3.country;
        var passArray = [resultLat, resultLon, resultCity, resultState, resultCountry]
        listHistory.append(sHistory.Display3)
        getWeather(passArray)
    })

    $('#hBtn4').click(function(){
        resultLat = parseInt(sHistory.h4.lat);
        resultLon = parseInt(sHistory.h4.lon);
        resultCity = sHistory.h4.name;
        resultState = sHistory.h4.state;
        resultCountry = sHistory.h4.country;
        var passArray = [resultLat, resultLon, resultCity, resultState, resultCountry]
        listHistory.append(sHistory.Display4)
        getWeather(passArray)
    })

    $('#hBtn5').click(function(){
        resultLat = parseInt(sHistory.h5.lat);
        resultLon = parseInt(sHistory.h5.lon);
        resultCity = sHistory.h5.name;
        resultState = sHistory.h5.state;
        resultCountry = sHistory.h5.country;
        var passArray = [resultLat, resultLon, resultCity, resultState, resultCountry]
        listHistory.append(sHistory.Display5)
        getWeather(passArray)
    })
}

function citySearch(search) {
    var urlString = document.location.search;
    var cityName = urlString.split('&')[0];

    if (cityName) {
        getCity(cityName);
    } else {
        getCity(search);
    }
}


function getCity(cityName) {
    var apiGeo = 'http://api.openweathermap.org/geo/1.0/direct' + cityName + '&limit=5&appid=0ab16bd9ca1ea598f1fc384ead80bb3a';
    apiGeo = apiGeo.replace("search", "q");

    fetch(apiGeo).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
              displayCities(data);
            })
        }
    })
}

function displayCities(cities) {

    if (cities.length === 0) {
      cityValidation.text('No cities found');
      return;
    } else if (cities.length === 1) {
      cityValidation.text('One city found');
    } else {
    cityValidation.text('Multiple cities found.  Select one:');
    }
    for (var i = 0; i < cities.length; i++) {
        cityOptions.append('<option>' + cities[i].name + ' ' + cities[i].state + ' Country: ' + cities[i].country + '</option>');
        cityOptions.children().eq(i).attr('value', i)
        cityArray.push(cities[i])
    }

}

function getWeather(passArray) {
        $(".removeThis").remove();
        
        resultLat = passArray[0];
        resultLon = passArray[1];
        resultCity = passArray[2];
        resultState = passArray[3];
        resultCountry = passArray[4];
        
        var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + resultLat + '&lon=' + resultLon + '&appid=0ab16bd9ca1ea598f1fc384ead80bb3a'; 
        
        fetch(apiUrl).then(function (response) {
            return response.json();
        })
        .then(function (data) {
        resultIcon = data.list[0].weather[0].icon
        console.log(data.list[0])
        display.append('<li>' + resultCity + " " + resultState + " " + resultCountry + " - " + dayjs.unix(data.list[0].dt).format("h" + "A" + "  (" + 'MMM' + " " + "D" + ", " + "YYYY" + ")") + '</li><span></span>');
        
        display.children('span').append('<img src="http://openweathermap.org/img/wn/' + resultIcon + '@2x.png" />');
        display.children().children('img').attr("id", "todayIcon")
        $('#todayIcon').width(60);
        $('#todayIcon').height(60);

        display.append('<li><strong>' + "Temp: </strong>" + ((data.list[0].main.temp - 273.15) * 9/5 + 32).toFixed(2) + "° F" + '</li>');
        display.append('<li><strong>' + "Wind: </strong>" + (data.list[0].wind.speed * 2.23694).toFixed(2) + "  MPH" +  '</li>');
        display.append('<li><strong>' + "Humidity: </strong>" + data.list[0].main.humidity + " %" + '</li>');
        display.children().addClass("list-group-item text-start removeThis");
        display.children().eq(0).addClass("fs-3 fw-bold");
        currentCity.text(resultCity + " ");

        for (i=1;i<6;i++) {
            var futureStats = $('.day' + i)
            $('.futureStats').eq(i-1).append('<strong>' + dayjs.unix(data.list[0].dt).add(i, 'day').format('MMM' + " " + "D" + ", " + "YYYY") + "</strong>" + "<span></span>");
            futureStats.append('<li><strong>' + "Temp:</strong>" + "<span></span>" + "° F" + '</li>');
            futureStats.children().eq(1).children('span').attr("id", "varTemp" + i);
            futureStats.append('<li><strong>' + "Wind:</strong>" + "<span></span>" + "MPH" +  '</li>');
            futureStats.children().eq(2).children('span').attr("id", "varWind" + i);
            futureStats.append('<li><strong>' + "Humidity:</strong>" + "<span></span>" + "%" + '</li>');
            futureStats.children().eq(3).children('span').attr("id", "varHum" + i);
            futureStats.children().addClass("list-group-item text-start smallFont removeThis");
            futureStats.children().children().addClass("removeThis")
            futureStats.children().eq(0).removeClass("removeThis");
            futureStats.children().eq(0).children('span').addClass('icon');
            futureStats.children().eq(0).children('span').attr("id", "varIcon" + i);


        }
    
        let dayOneCount = 0;
        let dayTwoCount = 0;
        let dayThreeCount = 0;
        let dayFourCount = 0;
        let dayFiveCount = 0;
        let dayOneTemp = 0;
        let dayOneHum = 0;
        let dayOneWind = 0;
        let dayOneIcon = [];
        let dayTwoTemp = 0;
        let dayTwoHum = 0;
        let dayTwoWind = 0;
        let dayTwoIcon = [];
        let dayThreeTemp = 0;
        let dayThreeHum = 0;
        let dayThreeWind = 0;
        let dayThreeIcon = [];
        let dayFourTemp = 0;
        let dayFourHum = 0;
        let dayFourWind = 0;
        let dayFourIcon = [];
        let dayFiveTemp = 0;
        let dayFiveHum = 0;
        let dayFiveWind = 0;
        let dayFiveIcon = [];
        i = 0;
        
        while (i<data.list.length) {
            today = dayjs.unix(data.list[0].dt).date();
            varDay = dayjs.unix(data.list[i].dt);
            
            if (today !== varDay) {
                if (today == varDay.subtract(1, "day").date()) {    
                    dayOneTemp = parseInt(dayOneTemp) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                    dayOneWind = parseInt(dayOneWind) + parseInt((data.list[i].wind.speed * 2.23694).toFixed(2));
                    dayOneHum = parseInt(dayOneHum) + parseInt(data.list[i].main.humidity);
                    dayOneIcon.push(data.list[i].weather[0].icon)
                    dayOneCount = dayOneCount + 1;
                }
                if (today == varDay.subtract(2, "day").date()) {
                    dayTwoTemp = parseInt(dayTwoTemp) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                    dayTwoWind = parseInt(dayTwoWind) + parseInt((data.list[i].wind.speed * 2.23694).toFixed(2));
                    dayTwoHum = parseInt(dayTwoHum) + parseInt(data.list[i].main.humidity);
                    dayTwoIcon.push(data.list[i].weather[0].icon)
                    dayTwoCount = dayTwoCount + 1;
                }
                if (today == varDay.subtract(3, "day").date()) {
                    dayThreeTemp = parseInt(dayThreeTemp) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                    dayThreeWind = parseInt(dayThreeWind) + parseInt((data.list[i].wind.speed * 2.23694).toFixed(2));
                    dayThreeHum = parseInt(dayThreeHum) + parseInt(data.list[i].main.humidity);
                    dayThreeIcon.push(data.list[i].weather[0].icon)
                    dayThreeCount = dayThreeCount + 1;
                }
                if (today == varDay.subtract(4, "day").date()) {
                    dayFourTemp = parseInt(dayFourTemp) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                    dayFourWind = parseInt(dayFourWind) + parseInt((data.list[i].wind.speed * 2.23694).toFixed(2));
                    dayFourHum = parseInt(dayFourHum) + parseInt(data.list[i].main.humidity);
                    dayFourIcon.push(data.list[i].weather[0].icon)
                    dayFourCount = dayFourCount + 1;
                }
                if (today == varDay.subtract(5, "day").date()) {
                    dayFiveTemp = parseInt(dayFiveTemp) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                    dayFiveWind = parseInt(dayFiveWind) + parseInt((data.list[i].wind.speed * 2.23694).toFixed(2));
                    dayFiveHum = parseInt(dayFiveHum) + parseInt(data.list[i].main.humidity);
                    dayFiveIcon.push(data.list[i].weather[0].icon)
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
        getIcon = dayOneIcon[parseInt(dayOneIcon.length/2)]
        $('#varIcon1').append('<img src="http://openweathermap.org/img/wn/' + getIcon + '@2x.png" />');
        $('#varIcon1').children().width(50);
        $('#varIcon1').children().height(50);

        varTemp2 = (dayTwoTemp/dayTwoCount).toFixed(2);
        $('#varTemp2').text(varTemp2);
        varWind2 = (dayTwoWind/dayTwoCount).toFixed(2);
        $('#varWind2').text(varWind2);
        varHum2 = (dayTwoHum/dayTwoCount).toFixed(2);
        $('#varHum2').text(varHum2);
        getIcon = dayTwoIcon[parseInt(dayTwoIcon.length/2)]
        $('#varIcon2').append('<img src="http://openweathermap.org/img/wn/' + getIcon + '@2x.png" />');
        $('#varIcon2').children().width(50);
        $('#varIcon2').children().height(50);

        varTemp3 = (dayThreeTemp/dayThreeCount).toFixed(2);
        $('#varTemp3').text(varTemp3);
        varWind3 = (dayThreeWind/dayThreeCount).toFixed(2);
        $('#varWind3').text(varWind3);
        varHum3= (dayThreeHum/dayThreeCount).toFixed(2);
        $('#varHum3').text(varHum3);
        getIcon = dayThreeIcon[parseInt(dayThreeIcon.length/2)]
        $('#varIcon3').append('<img src="http://openweathermap.org/img/wn/' + getIcon + '@2x.png" />');
        $('#varIcon3').children().width(50);
        $('#varIcon3').children().height(50);

        varTemp4 = (dayFourTemp/dayFourCount).toFixed(2);
        $('#varTemp4').text(varTemp4);
        varWind4 = (dayFourWind/dayFourCount).toFixed(2);
        $('#varWind4').text(varWind4);
        varHum4 = (dayFourHum/dayFourCount).toFixed(2);
        $('#varHum4').text(varHum4);
        getIcon = dayFourIcon[parseInt(dayFourIcon.length/2)]
        $('#varIcon4').append('<img src="http://openweathermap.org/img/wn/' + getIcon + '@2x.png" />');
        $('#varIcon4').children().width(50);
        $('#varIcon4').children().height(50);

        varTemp5 = (dayFiveTemp/dayFiveCount).toFixed(2);
        $('#varTemp5').text(varTemp5);
        varWind5 = (dayFiveWind/dayFiveCount).toFixed(2);
        $('#varWind5').text(varWind5);
        varHum5 = (dayFiveHum/dayFiveCount).toFixed(2);
        $('#varHum5').text(varHum5);
        getIcon = dayFiveIcon[parseInt(dayFiveIcon.length/2)]
        $('#varIcon5').append('<img src="http://openweathermap.org/img/wn/' + getIcon + '@2x.png" />');
        $('#varIcon5').children().width(50);
        $('#varIcon5').children().height(50);
        
    })
}

sBtn.click(citySearch($('#search')))
gBtn.click(function(){
    var o = cityOptions.find(":selected").val()

        resultLat = parseInt(cityArray[o].lat);
        resultLon = parseInt(cityArray[o].lon);
        resultCity = cityArray[o].name;
        resultState = cityArray[o].state;
        resultCountry = cityArray[o].country;

        sHistory.h5 = sHistory.h4
        sHistory.Display5 = sHistory.Display4
        sHistory.h4 = sHistory.h3
        sHistory.Display4 = sHistory.Display3
        sHistory.h3 = sHistory.h2
        sHistory.Display3 = sHistory.Display2
        sHistory.h2 = sHistory.h1
        sHistory.Display2 = sHistory.Display1
        sHistory.h1 = cityArray[o]
        sHistory.Display1 = '<li><button>' + sHistory.h1.name + ", " + sHistory.h1.state + " - " + sHistory.h1.country + '</button></li>'

        localStorage.setItem("sHistory", JSON.stringify(sHistory));

    var passArray = [resultLat, resultLon, resultCity, resultState, resultCountry]
    getWeather(passArray)

    buttonCall()
})

})
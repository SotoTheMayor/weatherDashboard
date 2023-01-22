var display = $('.stats')
var currentCity = $('.currentCity') 


fetch('http://api.openweathermap.org/geo/1.0/direct?q=Elk%20River&limit=5&appid=0ab16bd9ca1ea598f1fc384ead80bb3a')
    .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    // console.log(data);
  });

  fetch('http://api.openweathermap.org/data/2.5/forecast?lat=45.3038538&lon=-93.5671825&appid=0ab16bd9ca1ea598f1fc384ead80bb3a')
    .then(function (response) {
    return response.json();
  })
    .then(function (data) {
    // console.log(data);
    // console.log(dayjs.unix(1674356400));
    display.append('<li>' + data.city.name + " - " + dayjs.unix(data.list[0].dt).format("h" + "A" + "  (" + 'MMM' + " " + "D" + ", " + "YYYY" + ")") + '</li>');
    display.append('<li><strong>' + "Temp: </strong>" + ((data.list[0].main.temp - 273.15) * 9/5 + 32).toFixed(2) + "° F" + '</li>');
    display.append('<li><strong>' + "Wind: </strong>" + (data.list[0].wind.speed * 2.23694).toFixed(2) + "  MPH" +  '</li>');
    display.append('<li><strong>' + "Humidity: </strong>" + data.list[0].main.humidity + " %" + '</li>');
    display.children().addClass("list-group-item text-start");
    display.children().eq(0).addClass("fs-3 fw-bold");
    currentCity.text(data.city.name + " ");

    let i;
    for (i=1;i<6;i++) {
        var futureStats = $('.day' + i)
        $('.futureStats').eq(i-1).append('<strong>' + dayjs.unix(data.list[0].dt).add(i, 'day').format('MMM' + " " + "D" + ", " + "YYYY") + "</strong>");
        futureStats.append('<li><strong>' + "Temp: </strong>" + "<span></span>" + "° F" + '</li>');
        futureStats.children().eq(1).children('span').attr("id", "varTemp" + i)
        futureStats.append('<li><strong>' + "Wind: </strong>" + (data.list[0].wind.speed * 2.23694).toFixed(2) + "  MPH" +  '</li>');
        futureStats.append('<li><strong>' + "Humidity: </strong>" + data.list[0].main.humidity + " %" + '</li>');
        futureStats.children().addClass("list-group-item text-start smallFont");
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

    // console.log(data.list.length)
    // console.log("change date test: " + dayjs('2022-12-31').date())
    // console.log("date test: " + dayjs().subtract(21, "day").date())
    // if (dayjs('2022-12-31').date() == dayjs().subtract(21, "day").date()) {
    //     console.log("it worked!! " + dayjs('2022-12-31').date() + " -- " + dayjs().subtract(21, "day").date())
    // }
    // console.log(dayjs.unix(data.list[i].dt).subtract(1, "day"))
    while (i<data.list.length) {
        today = dayjs.unix(data.list[0].dt).date();
        varDay = dayjs.unix(data.list[i].dt);
        
        if (today !== varDay) {
            if (today == varDay.subtract(1, "day").date()) {    
                dayOneTemp = parseInt(dayOneTemp) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                dayOneCount = dayOneCount + 1;
                // console.log(data.city.name + " - " + dayjs.unix(data.list[i].dt).format("h" + "A" + "  (" + 'MMM' + " " + "D" + ", " + "YYYY" + ")") + " temperature: " + ((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                // console.log("dayOne Here:  " + dayOneTemp);
                // console.log("average here:  " + (dayOneTemp/dayOneCount))
            }
            if (today == varDay.subtract(2, "day").date()) {
                dayTwoTemp = parseInt(dayTwoTemp) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                dayTwoCount = dayTwoCount + 1;
                // console.log(data.city.name + " - " + dayjs.unix(data.list[i].dt).format("h" + "A" + "  (" + 'MMM' + " " + "D" + ", " + "YYYY" + ")") + " temperature: " + ((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                // console.log("dayOne Here:  " + dayTwoTemp);
                // console.log("average here:  " + (dayTwoTemp/dayTwoCount))
            }
            if (today == varDay.subtract(3, "day").date()) {
                dayThreeTemp = parseInt(dayThreeTemp) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                dayThreeCount = dayThreeCount + 1;
            }
            if (today == varDay.subtract(4, "day").date()) {
                dayFourTemp = parseInt(dayFourTemp) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                dayFourCount = dayFourCount + 1;
            }
            if (today == varDay.subtract(5, "day").date()) {
                dayFiveTemp = parseInt(dayFiveTemp) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                dayFiveCount = dayFiveCount + 1;
            }
        }
        
        i++;
    };
    varTemp1 = (dayOneTemp/dayOneCount).toFixed(2);
    $('#varTemp1').text(varTemp1);
    varTemp2 = (dayTwoTemp/dayTwoCount).toFixed(2);
    $('#varTemp2').text(varTemp2);
    varTemp3 = (dayThreeTemp/dayThreeCount).toFixed(2);
    $('#varTemp3').text(varTemp3);
    varTemp4 = (dayFourTemp/dayFourCount).toFixed(2);
    $('#varTemp4').text(varTemp4);
    varTemp5 = (dayFiveTemp/dayFiveCount).toFixed(2);
    $('#varTemp5').text(varTemp5);
    // console.log("Day One Average: " + varTemp1)
    // console.log("Day Two Average: " + varTemp2)
})

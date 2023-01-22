var display = $('.stats')
var currentCity = $('.currentCity') 


fetch('http://api.openweathermap.org/geo/1.0/direct?q=Elk%20River&limit=5&appid=0ab16bd9ca1ea598f1fc384ead80bb3a')
    .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log('Twitter Public Members: Raw data \n----------');
    console.log(data);
  });

  fetch('http://api.openweathermap.org/data/2.5/forecast?lat=45.3038538&lon=-93.5671825&appid=0ab16bd9ca1ea598f1fc384ead80bb3a')
    .then(function (response) {
    return response.json();
  })
    .then(function (data) {
    console.log(data);
    console.log(dayjs.unix(1674324000));
    display.append('<li>' + data.city.name + " - " + dayjs.unix(data.list[0].dt).format("h" + "A" + "  (" + 'MMM' + " " + "D" + ", " + "YYYY" + ")") + '</li>');
    display.append('<li><strong>' + "Temp: </strong>" + ((data.list[0].main.temp - 273.15) * 9/5 + 32).toFixed(2) + "° F" + '</li>');
    display.append('<li><strong>' + "Wind: </strong>" + (data.list[0].wind.speed * 2.23694).toFixed(2) + "  MPH" +  '</li>');
    display.append('<li><strong>' + "Humidity: </strong>" + data.list[0].main.humidity + " %" + '</li>');
    display.children().addClass("list-group-item text-start");
    display.children().eq(0).addClass("fs-3 fw-bold");
    currentCity.text(data.city.name + " ");
    // display.append('<p>' + '</p>')
    let i;
    for (i=1;i<6;i++) {
        var futureStats = $('.day' + i)
        $('.futureStats').eq(i-1).append('<strong>' + dayjs.unix(data.list[0].dt).add(i, 'day').format('MMM' + " " + "D" + ", " + "YYYY") + "</strong>");
        futureStats.append('<li><strong>' + "Temp: </strong>" + ((data.list[0].main.temp - 273.15) * 9/5 + 32).toFixed(2) + "° F" + '</li>');
        futureStats.append('<li><strong>' + "Wind: </strong>" + (data.list[0].wind.speed * 2.23694).toFixed(2) + "  MPH" +  '</li>');
        futureStats.append('<li><strong>' + "Humidity: </strong>" + data.list[0].main.humidity + " %" + '</li>');
        futureStats.children().addClass("list-group-item text-start smallFont");
        // futureStats.children().addClass("fs-5 fw-bold");
    }
    // let dayHolder = 0;
    let totalDays = 0;
    let totalDayOnes = 0;
    let dayOne = 0;
    let dayTwo = 0;
    // let i = 0;
    let y = 1;
    console.log(data.list.length)
    while (i<data.list.length) {
        today = dayjs.unix(data.list[0].dt).format("D");
        if (today !== dayjs.unix(data.list[i].dt).format("D")) {
                if (today == dayjs.unix(data.list[i].dt).format("D") - y) {

                    console.log(data.city.name + " - " + dayjs.unix(data.list[i].dt).format("h" + "A" + "  (" + 'MMM' + " " + "D" + ", " + "YYYY" + ")") + " temperature: " + ((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                    dayOne = dayOne + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                    totalDayOnes = totalDayOnes + 1;
                    console.log("dayOne Here:  " + dayOne);
                    // console.log("totalDays Here:  " + totalDays);
                    console.log("average here:  " + (dayOne/totalDayOnes))
                    // console.log("math: " + (dayjs.unix(data.list[i].dt).format("D") - 1))
                }
                if (today == dayjs.unix(data.list[i].dt).format("D") - 2) {
                    dayTwo = parseInt(dayTwo) + parseInt(((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2));
                    totalDays = totalDays + 1;
               }
                if (today == dayjs.unix(data.list[i].dt).format("D") - 3) {}
                if (today == dayjs.unix(data.list[i].dt).format("D") - 4) {}
                if (today == dayjs.unix(data.list[i].dt).format("D") - 5) {}
            }
        
        i++;
    };
    console.log("Day One Average: " + dayOne/totalDayOnes)
    console.log("Day Two Average: " + dayTwo/totalDays)
})
//   fetch('api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=0ab16bd9ca1ea598f1fc384ead80bb3a')
//   .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//   console.log(data);
// });
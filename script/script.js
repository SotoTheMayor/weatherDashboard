var display = $('.here')


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
    display.append('<p>' + data.city.name + " " + dayjs.unix(data.list[0].dt).format("h" + "A" + "  " + 'MMM' + " " + "D" + ", " + "YYYY") + '</p>')
    display.append('<p>' + "Temp: " + ((data.list[0].main.temp - 273.15) * 9/5 + 32).toFixed(2) + "° F" + '</p>')
    display.append('<p>' + "Wind: " + (data.list[0].wind.speed * 2.23694).toFixed(2) + "  MPH" +  '</p>')
    display.append('<p>' + "Humidity: " + data.list[0].main.humidity + " %" + '</p>')
    display.append('<p>' + '</p>')

    // for (i=0;i<data.list.length;i++) {
        
    //     display.append('<p>' + dayjs.unix(data.list[i].dt).format('MMM' + " , " + "D" + " , " + "h" + " , " + "A") + '</p>');
    //     console.log(dayjs.unix(data.list[i].dt));
    // }

  });

//   fetch('api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=0ab16bd9ca1ea598f1fc384ead80bb3a')
//   .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//   console.log(data);
// });
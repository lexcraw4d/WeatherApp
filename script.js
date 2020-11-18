/* eslint-disable no-undef */

// Date and Time updated every ms
function displayTime() {
	var today = moment().format('MMMM Do YYYY, h:mm:ss a');
	$('#currentDay').text(today);
	// setInterval(displayTime, 1000);
}

$('#currentDay').append(displayTime());

//Function for getting the UVI, Temperature, Wind Speed, and Humidity
$('button').click(function (event) {
	event.preventDefault();

	var city = $('#cityInputField').val();

	var apiKey = 'f38f6a7de25e9c5bfba8b768dc8d3f45';

	var units = '&units=imperial';

	var apiURL =
		`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}${units}`;

	$.ajax({
		url: apiURL,
		method: 'GET',
	}).then(function (response) {
		var weatherDescription = Math.floor(response.main.temp);
		var humidity = response.main.humidity;
		var windSpeed = response.wind.speed;

		// var icon="http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
		// let weather=response.weather

		//Clear Previous Searches
		$(`#displayWeather`).empty();
		$('#location').empty();

		$(`#location`).append(city);
		$('#temp')
			.append(`Temperature:${weatherDescription}` + '°F')
			.append(`</br>`);
		$('#wind').append(`Wind Speed:${windSpeed}`).append(`<br>`);
		$('#humid').append(`Humidity: ${humidity}`).append(`<br>`);

		//UV Index
		var lat = response.coord.lat;

		var lon = response.coord.lon;

		//

		$.ajax({
			url: `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`,
			method: 'GET',
		}).then(function (response2) {
			var uvIndex = response2.value;

			$('#uvi').append(`UV Index:${uvIndex}`).append(`<br>`);

			if ($(uvIndex) <= 2.99) {
				$(`#uvi`).css('background-color', 'green');
			}
			if (3.0 < $(uvIndex) <= 6.99) {
				$(`#uvi`).css('background-color', 'yellow');
			} else {
				$(`#uvi`).css('background-color', 'red');
			}
		});

		//5 Day Forecast
		$.ajax({
			url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`,
			method: `GET`,
		}).then(function (response3) {
			for (i=0; i<5; i++){
			var iconFive=response3.list[i*8].weather[0].icon
			var iconURL=`http://openweathermap.org/img/wn/${iconFive}@2x.png`
			console.log(iconURL);
			var iconImg=`<img src=${iconURL}></img>`
			var iconsDaily= [$(`#icon1`),$(`#icon2`),$(`#icon3`),$(`#icon4`),$(`#icon5`)];
			
			$(`#icons`).append(iconImg[$[{iconsDaily}]]);

			

			}

			var dayOneA = Math.floor(response3.list[0].main.temp);
			var dayOneB=response3.list[0].main.humidity
			// console.log(dayOneA);
			var dayTwoA = Math.floor(response3.list[8].main.temp);
			var dayTwoB=response3.list[8].main.humidity
			//Day 3 of 5 Day forcast variables
			var dayThreeA = Math.floor(response3.list[16].main.temp);
			var dayThreeB=response3.list[16].main.humidity
			//Day 4 of 5 Day forcast variables
			var dayFourA = Math.floor(response3.list[24].main.temp);
			var dayFourB=response3.list[24].main.humidity
			//Day 5 of 5 Day forecast variables
			var dayFiveA = Math.floor(response3.list[32].main.temp);
			var dayFiveB=response3.list[32].main.humidity

			//Appending 5 day forecast
			$(`#dayOne`).append(`Temperature:${dayOneA}`).append(`</br>`);
			$(`#dayOne`).append(`Humidity: ${dayOneB}`).append(`</br>`);
			//Day 2 of 5 day forecast
			$(`#dayTwo`).append(`Temperature: ${dayTwoA}`).append(`</br>`);
			$(`#dayTwo`).append(`Humidity: ${dayTwoB}`).append(`</br>`);
			//Day 3 of 5 day forecast
			$(`#dayThree`).append(`Temperature: ${dayThreeA}`).append(`</br>`);
			$(`#dayThree`).append(`Humidity: ${dayThreeB}`).append(`</br>`);
			//Day 4 of 5 day forecast
			$(`#dayFour`).append(`Temperature: ${dayFourA}`).append(`</br>`);
			$(`#dayFour`).append(`Humidity: ${dayFourB}`).append(`</br>`);
			//Day 4 of 5 day forecast
			$(`#dayFive`).append(`Temperature: ${dayFiveA}`).append(`</br>`);
			$(`#dayFive`).append(`Humidity: ${dayFiveB}`).append(`</br>`);
			

			// for (i=0; {
			// 	var dayOneA = Math.floor(response3.list[i].main.temp);
			// 	var dayOneB=response3.list[i].main.humidity;
			// 	console.log(dayOneA)
			// 	console.log(dayOneB)
			// }
		});
	});

	// //Weather Icon
	// var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

	// $(".icon").html("<img src='" + iconUrl  + "'>");
	// $('#displayWeather').append(weather);
	// $('#displayWeather').append(icon);
});
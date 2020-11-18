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
			var dayOneA = response3.list[0].main.temp;
			// var dayOneB=response3.list[0].main.humidity
			// var dayOneC=response3.list[0].weather[0].icon
			console.log(dayOneA);

			//It console logs but does not append??? Have tried append, text, html?
			$(`#fiveDay`).append($(dayOneA));
		});
	});

	// //Weather Icon
	// var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

	// $(".icon").html("<img src='" + iconUrl  + "'>");
	// $('#displayWeather').append(weather);
	// $('#displayWeather').append(icon);
});
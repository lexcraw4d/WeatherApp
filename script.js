/* eslint-disable no-undef */

// Date and Time updated every ms
function displayTime() {
	var today = moment().format('MMMM Do YYYY, h:mm:ss a');
	$('#currentDay').text(today);
	// setInterval(displayTime, 1000);
}

$('#currentDay').append(displayTime());
//Append current date and time to same place as 'city'
//Function for getting the UVI, Temperature, Wind Speed, and Humidity
$('button').click(function (event) {
	event.preventDefault();
	

	

	var city = $('#cityInputField').val();

	var apiKey = 'f38f6a7de25e9c5bfba8b768dc8d3f45';

	var units = '&units=imperial';

	var apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}${units}`;

	var upper= city[0].toUpperCase()
	var lower=city.substring(1).toLowerCase();
	// console.log(upper+lower)
	// 	console.log(upper)
	//Append city to history
	var newList = $('<li>')
	var adding= newList.append(city);
	$('ul').append(adding)



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
		
		$(`#location`).append(upper+lower);
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

		//---------------------5 Day Forecast----------------------------------------------------------
		$.ajax({
			url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`,
			method: `GET`,
		}).then(function (response3) {
			//--------------Retreiving and appending icon to DOM---------------------------------------
			var iconOne = response3.list[0].weather[0].icon;
			var iconURL = `http://openweathermap.org/img/wn/${iconOne}@2x.png`;
			// console.log(iconURL);
			var iconImg1 = `<img src=${iconURL}></img>`;
			$(`#icon1`).append(iconImg1);
			// console.log(iconImg1);
			var iconTwo = response3.list[8].weather[0].icon;
			var iconURL2 = `http://openweathermap.org/img/wn/${iconTwo}@2x.png`;
			// console.log(iconURL);
			var iconImg2 = `<img src=${iconURL2}></img>`;
			$(`#icon2`).append(iconImg2);
			// console.log(iconImg1);

			var iconThree = response3.list[16].weather[0].icon;
			var iconURL3 = `http://openweathermap.org/img/wn/${iconThree}@2x.png`;
			console.log(iconURL);
			var iconImg3 = `<img src=${iconURL3}></img>`;
			$(`#icon3`).append(iconImg3);
			console.log(iconImg3);

			var iconFour = response3.list[24].weather[0].icon;
			var iconURL4 = `http://openweathermap.org/img/wn/${iconFour}@2x.png`;
			console.log(iconURL4);
			var iconImg4 = `<img src=${iconURL4}></img>`;
			$(`#icon4`).append(iconImg4);
			console.log(iconImg4);

			var iconFive = response3.list[32].weather[0].icon;
			var iconURL5 = `http://openweathermap.org/img/wn/${iconFive}@2x.png`;
			console.log(iconURL5);
			var iconImg5 = `<img src=${iconURL5}></img>`;
			$(`#icon5`).append(iconImg5);
			console.log(iconImg5);

		
			//----------------------Variables for 5 Day Forecast----------------------------------------------
			var dayOneA = Math.floor(response3.list[0].main.temp);
			var dayOneB = response3.list[0].main.humidity;
			// console.log(dayOneA);
			var dayTwoA = Math.floor(response3.list[8].main.temp);
			var dayTwoB = response3.list[8].main.humidity;
			//Day 3 of 5 Day forcast variables
			var dayThreeA = Math.floor(response3.list[16].main.temp);
			var dayThreeB = response3.list[16].main.humidity;
			//Day 4 of 5 Day forcast variables
			var dayFourA = Math.floor(response3.list[24].main.temp);
			var dayFourB = response3.list[24].main.humidity;
			//Day 5 of 5 Day forecast variables
			var dayFiveA = Math.floor(response3.list[32].main.temp);
			var dayFiveB = response3.list[32].main.humidity;

			//---------------Appending 5 day forecast variables----------------------------------------------
			$(`#dayOne`).append(`Temperature:${dayOneA}`)
			$(`#dayOneSub`).append(`Humidity: ${dayOneB}`);
			//Day 2 of 5 day forecast
			$(`#dayTwo`).append(`Temperature: ${dayTwoA}`)
			$(`#dayTwoSub`).append(`Humidity: ${dayTwoB}`)
			//Day 3 of 5 day forecast
			$(`#dayThree`).append(`Temperature: ${dayThreeA}`)
			$(`#dayThreeSub`).append(`Humidity: ${dayThreeB}`)
			//Day 4 of 5 day forecast
			$(`#dayFour`).append(`Temperature: ${dayFourA}`)
			$(`#dayFourSub`).append(`Humidity: ${dayFourB}`)

			$(`#dayFive`).append(`Temperature: ${dayFiveA}`)
			$(`#dayFiveSub`).append(`Humidity: ${dayFiveB}`)

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


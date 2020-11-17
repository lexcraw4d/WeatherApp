/* eslint-disable no-undef */

$('button').click(function (event) {
	event.preventDefault();

	var city = $('#cityInputField').val();

	var apiKey = 'f38f6a7de25e9c5bfba8b768dc8d3f45';

	var units = '&units=imperial';

	var apiURL =
		'http://api.openweathermap.org/data/2.5/weather?' +
		'q=' +
		city +
		'&appid=' +
		apiKey +
		units;
	$.ajax({
		url: apiURL,
		method: 'GET',
	}).then(function (response) {
		var weatherDescription = response.main.temp;

        
        $('#cityInputField').append($(weatherDescription))
	});
});

let weather = [
	"clear sky",
	"few clouds",
	"scattered clouds",
	"broken clouds",
	"shower rain",
	"rain",
	"thunderstorm",
	"snow",
	"mist",
	"overcast clouds"
];

let weatherIcon = [
	"☀️",
	"🌤",
	"⛅️",
	"☁️",
	"🌧",
	"☔️",
	"⛈",
	"🌨",
	"🌫",
	"☁️"
];

let now = new Date();

let day = [
	"Sunday",
	"Monday",
	"Thuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
let month = [
	"January",
	"Fabruary",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
let todayday = day[now.getDay()];
let data = document.querySelector("p.date");
data.innerHTML = `${todayday} ${now.getHours()}:${now.getMinutes()}`;
let today = document.querySelector("p.today");
today.innerHTML = `Today: ${now.getDate()} ${month[now.getMonth()]} ${now.getFullYear()}`;

function displayForecast(response) {
	let forecastElement = document.querySelector("#forecast");
	console.log(response.data.list);
	let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
	let i = now.getDay();
	days.forEach(function () {
		if (i < 5) days[i] = day[++i]
		else i = 0;
	})
	let forecastHTML = ``;
	let y = 0;
	days.forEach(function (todayday, y) {

		let tempMin = 0;
		let tempMax = 0;
		if (y < 34) {
			tempMin = Math.round(Math.min(response.data.list[y].main.temp_min, response.data.list[y + 1].main.temp_min, response.data.list[y + 2].main.temp_min, response.data.list[y + 3].main.temp_min, response.data.list[y + 4].main.temp_min, response.data.list[y + 5].main.temp_min, response.data.list[y + 6].main.temp_min, response.data.list[y + 7].main.temp_min));
			tempMax = Math.round(Math.max(response.data.list[y].main.temp_max, response.data.list[y + 1].main.temp_max, response.data.list[y + 2].main.temp_max, response.data.list[y + 3].main.temp_max, response.data.list[y + 4].main.temp_max, response.data.list[y + 5].main.temp_max, response.data.list[y + 6].main.temp_max, response.data.list[y + 7].main.temp_max));
		}
		let weathernowicon = response.data.list[y].weather[0].description;
		for (var i = 0; i < 10; i++) {
			if (weathernowicon.includes(weather[i])) {
				weathernowicon = weatherIcon[i];
			};
		}
		forecastHTML = forecastHTML + `
					<div class="block_row">
				<div class="block__item">${todayday}<p class="sun2">${weathernowicon}</p>
					<p>${tempMax}/<br />${tempMin}°C</p>
				</div>
			</div>

	`; y = y + 8;
	});



	forecastElement.innerHTML = forecastHTML;
}
let city = "";

let temperature = 25;
function showCity(event) {
	event.preventDefault();
	let userCity = document.querySelector("#cityname");
	city = userCity.value;
	let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
	axios.get(url).then(showWeather);
	connect(city);
}

function connect(citynow) {
	let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
	let ApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${citynow}&units=metric&appid=${apiKey}`;
	axios.get(ApiUrl).then(displayForecast);
}

let cityForm = document.querySelector("#cityform");
cityForm.addEventListener("submit", showCity);


function replaceLabel() {
	//event.preventDefault();
	//let a = 17;
	let temp = document.querySelector(".today_temp");
	el = document.querySelector("a");
	if (el.value === "convert it to Fahrenheit") { el.value = "convert it back to Celsius"; el.innerHTML = el.value; temp.innerHTML = `${Math.round((temperature * 9) / 5 + 32)}°F`; }
	else { el.value = "convert it to Fahrenheit"; el.innerHTML = el.value; temp.innerHTML = `${Math.round(temperature)}°C`; }
}
let el = document.querySelector("#convert");
el.addEventListener("click", replaceLabel);

function showWeather(response) {
	console.log(response.data);
	let temperature = Math.round(response.data.main.temp);
	let weathernow = response.data.weather[0].description;

	let humidity = response.data.main.humidity;
	let wind = response.data.wind.speed;
	let tempLoc = document.querySelector(".today_temp");
	tempLoc.innerHTML = `${temperature}°C`;
	let weatherLoc = document.querySelector(".weather");
	weatherLoc.innerHTML = `${weathernow}`;
	let humidityLoc = document.querySelector(".today_humidity");
	humidityLoc.innerHTML = ` ${humidity}% `;
	let windLoc = document.querySelector(".today_wind");
	windLoc.innerHTML = `${wind} km/h`;
	let CityLoc = document.querySelector("#newcity");
	CityLoc.innerHTML = `${response.data.name}`;
	for (var i = 0; i < 10; i++) {
		if (weathernow.includes(weather[i])) {
			weathernow = weatherIcon[i];
		};
	}
	let iconLoc = document.querySelector(".sun");
	iconLoc.innerHTML = `${weathernow}`;
	connect(response.data.name);
}

function retrievePosition(position) {
	let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
	axios.get(url).then(showWeather);
}

function getPosition() {
	navigator.geolocation.getCurrentPosition(retrievePosition);
}


let curLoc = document.querySelector("#but1");
curLoc.addEventListener("click", getPosition);


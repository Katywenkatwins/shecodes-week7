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
let data = document.querySelector("p.date");
data.innerHTML = `${day[now.getDay()]} ${now.getHours()}:${now.getMinutes()}`;
let today = document.querySelector("p.today");
today.innerHTML = `Today: ${now.getDate()} ${month[now.getMonth()]} ${now.getFullYear()}`;

let temperature = 25;
function showCity(event) {
	event.preventDefault();
	let userCity = document.querySelector("#cityname");
	let city = userCity.value;
	let apiKey = "b48adb58407504890469a50f223db9f9";
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
	axios.get(url).then(showWeather);
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
	let temperature = Math.round(response.data.main.temp);
	let weathernow = response.data.weather[0].description;
	console.log(response.data);
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
		if (weathernow == weather[i]) {
			weathernow = weatherIcon[i];
		};
	}
	let iconLoc = document.querySelector(".sun");
	iconLoc.innerHTML = `${weathernow}`;
}

function retrievePosition(position) {
	let apiKey = "b48adb58407504890469a50f223db9f9";
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
let weather = {
	paris: {
		temp: 19.7,
		humidity: 80
	},
	tokyo: {
		temp: 17.3,
		humidity: 50
	},
	lisbon: {
		temp: 30.2,
		humidity: 20
	},
	"san francisco": {
		temp: 20.9,
		humidity: 100
	},
	oslo: {
		temp: -5,
		humidity: 20
	}
};

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
	//let h1 = document.querySelector("h1");
	let temperature = Math.round(response.data.main.temp);
	console.log(response.data.main);
	//alert(`It is currently ${temperature}° in ${response.data.name}`);
	let tempLoc = document.querySelector(".today_temp");
	tempLoc.innerHTML = `${temperature}°C`;
	let CityLoc = document.querySelector("#newcity");
	CityLoc.innerHTML = `${response.data.name}`;
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
let btnDropp = document.querySelector("#btnDropp");
btnDropp.addEventListener("click", function (e) {
  btnDropp.parentElement.nextElementSibling.classList.toggle("d-none");
});

let locationInput = document.querySelector("#locationInput");
let locationBtn = document.querySelector("#locationBtn");
let weatherDay = document.querySelector("#weatherDay");

locationInput.addEventListener("input", function (e) {
  getWeather(locationInput.value);
});

locationInput.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    getWeather(locationInput.value);
    locationInput.value = "";
  }
});

locationBtn.addEventListener("click", function (e) {
  getWeather(locationInput.value);
  locationInput.value = "";
});

// ==== START GET WEATHER ====
async function getWeather(country) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=590d06da559b47bf84f155120242806&q=${country}&days=3`
  );
  let data = await response.json();

  // LOADING
  if (data) {
    weatherDay.firstElementChild.firstElementChild.classList.remove(
      "visually-hidden"
    );
    weatherDay.firstElementChild.classList.remove("d-flex");
    weatherDay.firstElementChild.lastElementChild.classList.add("d-none");

    weatherDay.children[1].firstElementChild.classList.remove(
      "visually-hidden"
    );
    weatherDay.children[1].classList.remove("d-flex");
    weatherDay.children[1].lastElementChild.classList.add("d-none");

    // weatherDay.lastElementChild.firstElementChild.classList.remove("visually-hidden")
    weatherDay.lastElementChild.classList.remove("d-flex");
    weatherDay.lastElementChild.lastElementChild.classList.add("d-none");
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let origin = data["location"]["name"];
  // ===========
  // ================================= Current Day ================================
  // ===========
  let state = data["current"]["condition"]["text"];
  let iconState = data["current"]["condition"]["icon"];
  let temp = data["forecast"]["forecastday"][0]["day"]["avgtemp_c"];
  let currentDate = data["forecast"]["forecastday"][0]["date"];
  let fD = new Date(currentDate).toLocaleDateString(undefined, options).split(",");
  // ========
  // ====================================== Next Day ======================================
  // ========
  let nextState =
    data["forecast"]["forecastday"][1]["day"]["condition"]["text"];
  let nextIconState =
    data["forecast"]["forecastday"][1]["day"]["condition"]["icon"];
  let nextMaxtemp = data["forecast"]["forecastday"][1]["day"]["maxtemp_c"];
  let nextMintemp = data["forecast"]["forecastday"][1]["day"]["mintemp_c"];
  let nextDate = data["forecast"]["forecastday"][1]["date"];
  let sD = new Date(nextDate).toLocaleDateString(undefined, options).split(",");
  // =========
  // ====================================== Third Day ======================================
  // =========
  let thirdState =
    data["forecast"]["forecastday"][2]["day"]["condition"]["text"];
  let thirdIconState =
    data["forecast"]["forecastday"][2]["day"]["condition"]["icon"];
  let thirdMaxtemp = data["forecast"]["forecastday"][2]["day"]["maxtemp_c"];
  let thirdMintemp = data["forecast"]["forecastday"][2]["day"]["mintemp_c"];
  let thirdDate = data["forecast"]["forecastday"][2]["date"];
  let tD = new Date(thirdDate)
    .toLocaleDateString(undefined, options)
    .split(",");

  // First Day
  weatherDay.firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerHTML =
    fD[0];
  weatherDay.firstElementChild.firstElementChild.firstElementChild.lastElementChild.innerHTML =
    fD[1];
  weatherDay.firstElementChild.firstElementChild.lastElementChild.firstElementChild.innerHTML =
    origin;
  weatherDay.firstElementChild.firstElementChild.lastElementChild.children[1].firstElementChild.innerHTML =
    temp + `<sup>o</sup>C`;
  weatherDay.firstElementChild.firstElementChild.lastElementChild.children[1].lastElementChild.src =
    iconState;
  weatherDay.firstElementChild.firstElementChild.lastElementChild.children[2].innerHTML =
    state;

  // Second Day
  weatherDay.children[1].firstElementChild.firstElementChild.firstElementChild.innerHTML =
    sD[0];
  weatherDay.children[1].firstElementChild.lastElementChild.firstElementChild.src =
    nextIconState;
  weatherDay.children[1].firstElementChild.lastElementChild.children[1].innerHTML =
    nextMaxtemp + `<sup>o</sup>C`;
  weatherDay.children[1].firstElementChild.lastElementChild.children[2].innerHTML =
    nextMintemp + `<sup>o</sup>C`;
  weatherDay.children[1].firstElementChild.lastElementChild.children[3].innerHTML =
    nextState;

  // Third Day
  weatherDay.children[2].firstElementChild.firstElementChild.firstElementChild.innerHTML =
    tD[0];
  weatherDay.children[2].firstElementChild.lastElementChild.firstElementChild.src =
    thirdIconState;
  weatherDay.children[2].firstElementChild.lastElementChild.children[1].innerHTML =
    thirdMaxtemp + `<sup>o</sup>C`;
  weatherDay.children[2].firstElementChild.lastElementChild.children[2].innerHTML =
    thirdMintemp + `<sup>o</sup>C`;
  weatherDay.children[2].firstElementChild.lastElementChild.children[3].innerHTML =
    thirdState;
}
// ==== END GET WEATHER ====

// ==== START GET CURRENT LOCATION ====
navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log("accept");
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getLocation(latitude, longitude);
  },
  function () {
    console.log("reject");
  }
);

async function getLocation(lat, long) {
  // let response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`);
  let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=590d06da559b47bf84f155120242806&q=${lat},${long}`);
  let data = await response.json();
  let currentLocation = data["location"]["name"];
  getWeather(currentLocation);
  console.log(currentLocation);
  console.log(`${lat},${long}`);
}
// ==== END GET CURRENT LOCATION ====
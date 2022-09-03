const images = [
  "https://sun9-9.userapi.com/impg/g6WMifT175DbWAxvWO6nUA4QiVkvs828S0dxxQ/JmsXNKce8Ew.jpg?size=2560x1707&quality=96&sign=070a68c01607df264a0d5ad25e12b9e9&type=album",
  "https://sun9-4.userapi.com/impg/ZbpcxgqquoJA0Qej-LOkE_AEjQchCpJiSgDkgA/OFNP7XqWMG4.jpg?size=2560x1707&quality=96&sign=9dc7db08b8377f9bea629fe3b424d8e3&type=album",
  "https://sun9-69.userapi.com/impg/etzkb53dOYR8qyHb5I5oOkJP3HX59b9MYNRPNw/wk2Zseh025M.jpg?size=2560x1707&quality=96&sign=93eed0da4016d074ff0bf92fe2c297b3&type=album",
  "https://sun9-58.userapi.com/impg/M4n4YrgRl7Y37PjvVUb8af2YdDBb2GtdLzJjaA/hVuNJpkCdTg.jpg?size=2560x1709&quality=96&sign=5cee88cfa5c8aa9342a39fff2d7a64e9&type=album",
  "https://sun9-10.userapi.com/impg/JVPgfwfOSHcdTFX0lK4JRmxGAJrfYCh1uPJO2w/Hu-sqgGCT6c.jpg?size=2560x1707&quality=96&sign=19e0a8065b8aa16fb56c5b649821f394&type=album",
  "https://sun9-65.userapi.com/impg/jAfhMckorgikIUPBrtBsPMzK8C9hr7n9z0gUog/NyJAFdetCQY.jpg?size=2560x1707&quality=96&sign=b0c096f11335f934389b14c72b0e5a90&type=album",
  "https://sun9-52.userapi.com/impg/p1_ZwD99rJ58um_4Edu9PqzJVuqG6OsEPm1XpQ/r3_tze478Xc.jpg?size=2560x1440&quality=96&sign=117ea2dc7a5a9656064519e48ed739ba&type=album",
  "https://sun9-71.userapi.com/impg/BdLSPEW_Vvoa129GN7Uola0UXzTAgA0RIEiT0A/Ly4uA1nXFfI.jpg?size=2560x1919&quality=96&sign=36ed519d38f53f765e301b64471b1f45&type=album",
];

const body = document.querySelector("body");
const title = document.querySelector(".k1zIA");
const quote = document.querySelector(".qarstb");
const weatherElement = document.createElement("div");
const temperatureElement = document.createElement("div");

body.classList.add("active_ext");
title.classList.add("title_ext");
weatherElement.appendChild(temperatureElement);
weatherElement.classList.add("weather_ext");
temperatureElement.classList.add("temperatureElement_ext");
document.body.append(weatherElement);

function getRandomImg() {
  const random = Math.floor(Math.random() * images.length);
  document.querySelector(
    "body"
  ).style.backgroundImage = `url(${images[random]})`;
}

function getDate() {
  const date = new Date();
  const time = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
  title.innerHTML = time;
}

function getRandomQuoteId() {
  const randomPage = Math.floor(Math.random() * 879890);
  const randomQuote = Math.floor(Math.random() * 879890);
  return [randomPage, randomQuote];
}

async function getQuote() {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "35addbb610mshce1ca8d02a41178p1ab34ajsn6cef2cc2e976",
      "X-RapidAPI-Host": "quotel-quotes.p.rapidapi.com",
    },
    body: `{"ids":[${getRandomQuoteId()}]}`,
  };

  await fetch("https://quotel-quotes.p.rapidapi.com/quotes", options)
    .then((response) => response.json())
    .then((response) => (quote.innerHTML = response[0].quote));
}

function getGeolocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition((position) => {
      weatherAPI(position.coords.latitude, position.coords.longitude);
    });
  } else {
    weatherAPI(55.751244, 37.618423);
  }
}
async function weatherAPI(lat, lon) {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e764567736363ce7212ee190a59c82f0`
  )
    .then((res) => res.json())
    .then((res) => {
      const temperature = Math.floor(res.main.temp - 273.15);
      temperatureElement.innerHTML = ` <div class="temperature_ext">${temperature} </div> <div class="degree__ext">o</div>`;

      weatherElement.style.backgroundImage = `url(http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png)`;
    });
}
getRandomImg();

getDate();
setInterval(getDate, 10000);

getGeolocation();

getQuote();

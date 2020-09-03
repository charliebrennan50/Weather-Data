
document.getElementById('myBtn').addEventListener("click", function () {
  if ('geolocation' in navigator) {
    console.log("available");
    navigator.geolocation.getCurrentPosition(async position => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      document.getElementById('latitude').textContent = lat.toFixed(4);
      document.getElementById('longitude').textContent = long.toFixed(4);

      const api = "https://api.openweathermap.org/data/2.5/weather";
      let weatherOptions = "units=imperial";
      let apiKey = "d2e382f0a6d1e0d614cb71aca19f1c25";
      let weatherURL =`${api}?lat=${lat}&lon=${long}&${weatherOptions}&appid=${apiKey}`
      let response = await fetch(weatherURL);
      let weather = await response.json();
      console.log(weather);
      let temperature = weather.main.temp;
      let conditions = weather.weather[0].main;
      let humidity = weather.main.humidity;
      let location = weather.name;
      document.getElementById("temperature").textContent = temperature;
      document.getElementById("conditions").textContent = conditions;
      document.getElementById("humidity").textContent = humidity;
      document.getElementById("location").textContent = location;
      const data = {
        lat,
        long,
        temperature,
        conditions,
        humidity,
        location
      };
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      fetch('/api', options).then(response => {
        console.log(response);
      });
    });
  } else {
    console.log("not available");
  }
});
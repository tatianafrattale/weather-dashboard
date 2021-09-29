// Create a map object.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);


  console.log(data);

  // Add markers
  for (var i =0; i < data.length; i++) {
      var city = data[i];
      if (city.sys.country === "US"){
    //   console.log(city.coord.lon);
    //   console.log(city.coord.lat);
        var loc = [];
    //   loc.push(city.coord.lat);
    //   loc.push(city.coord.lon);
        var temp = (city.main.temp - 273.15) * (9/5) + 32;
        L.marker(city.coord)
        .bindPopup(`<h3>${city.name}</h3> <h4>Temperature: ${temp.toLocaleString()} F</h4>
        <h4>Humidity: ${city.main.humidity.toLocaleString()} </h4> <h4>Wind Speed: ${city.wind.speed.toLocaleString()} </h4>
        <h4>Sky: ${city.weather[0].description} </h4> `)
        .addTo(myMap);
      }
  }

  function fillInInfoCard(chosen_city){
      let cityinfo = data.filter(c => c.name === chosen_city);

      tofill = d3.select("#sample-metadata");
      tofill.html("");
      console.log(cityinfo);




  }

  fillInInfoCard(data[0].name);
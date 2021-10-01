
function createMap(data1){
   
    console.log("in create map");
    //myMap.remove();
    //if (myMap){
        // console.log("in if");
        myMap.eachLayer(function (layer) {
            myMap.removeLayer(layer);
        });
  //  }
// Create a map object.
    // var myMap = L.map("map", {
    // center: [37.09, -95.71],
    // zoom: 5
    // });
  
    // Add a tile layer.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);


     console.log(data1);
   // myMap.removeLayer(NORMAL);
    // Add markers
    for (var i =0; i < data1.length; i++) {
         var city = data1[i];
        if (city.sys.country === "US"){
    //   console.log(city.coord.lon);
    //   console.log(city.coord.lat);
         //   var loc = [];
    //   loc.push(city.coord.lat);
    //   loc.push(city.coord.lon);

    // Change for new script being in F
            var temp = (city.main.temp - 273.15) * (9/5) + 32;
         L.marker(city.coord)
        .bindPopup(`<h3>${city.name}</h3> <h4>Temperature: ${temp.toLocaleString()} F</h4>
        <h4>Humidity: ${city.main.humidity.toLocaleString()} </h4> <h4>Wind Speed: ${city.wind.speed.toLocaleString()} </h4>
        <h4>Sky: ${city.weather[0].description} </h4> `)
        .addTo(myMap);
      }
     }
    }

  function fillInInfoCard(chosen_city){
      let cityinfo = data.filter(c => c.name === chosen_city);

      tofill = d3.select("#sample-metadata");
      tofill.html("");
    //  console.log(cityinfo);

      let fields = ["temp", "temp_max", "temp_min", "humidity", "pressure"];
      tofill.append("h5").text("City: " + chosen_city);
      for (var i = 0; i < fields.length; i++){
         // console.log(fields[i]);
          tofill.append("h5").text(String(fields[i]) + ": " + String(cityinfo[0].main[fields[i]]));

      }

      // Update Gauge at same time
      // https://plotly.com/javascript/gauge-charts/
      //https://plotly.com/javascript/reference/indicator/
      // Change color of gauge bar depending on temperature
      if ( (cityinfo[0].main.temp - 273.15) * (9/5) + 32 < 0){
          color1 = "#A020F0";
      }
      else if ( (cityinfo[0].main.temp - 273.15) * (9/5) + 32 < 32){
        color1 = "#0000FF";
      }
      else if ( (cityinfo[0].main.temp - 273.15) * (9/5) + 32 < 75){
        color1 = "#097969";
      }
      else if ( (cityinfo[0].main.temp - 273.15) * (9/5) + 32 < 105){
        color1 = "#FF1493";
      }
      else if ( (cityinfo[0].main.temp - 273.15) * (9/5) + 32 < 150){
        color1 = "#FFA500";
      }
      
      var data2 = 
        {
            domain: { x: [-50, 130], y: [-50, 130] },
            
            value: (cityinfo[0].main.temp - 273.15) * (9/5) + 32,
            title: { text: "Current Temperature in " + chosen_city + " (F)" ,
                    font: {size: 27}},
            gauge: {axis: {visible: true, range: [-50,130]}, 
                bar: {color:color1}},
            number: {font : {color: color1}},
            type: "indicator",
            mode: "gauge+number"
        };
    
    var layout = { width: 600, height: 400, margin:  { t: 0, b: 0 } };
    Plotly.newPlot('gauge', [data2], layout);

    
}


  // https://digital-geography.com/filter-leaflet-maps-slider/
  function sliderFill(){
  var slidervar = document.getElementById('slider');
  noUiSlider.create(slidervar, {
    connect: true,
    start: [ 0, 100 ],
    range: {
        min: 0,
        max: 100
    }
    });
    document.getElementById('input-number-min').setAttribute("value", 0);
    document.getElementById('input-number-max').setAttribute("value", 100);

    var inputNumberMin = document.getElementById('input-number-min');
    var inputNumberMax = document.getElementById('input-number-max');
    inputNumberMin.addEventListener('change', function(){
        slidervar.noUiSlider.set([this.value, null]);
        });
    inputNumberMax.addEventListener('change', function(){
    slidervar.noUiSlider.set([null, this.value]);
    });

    slidervar.noUiSlider.on('update', function( values, handle ) {
        //handle = 0 if min-slider is moved and handle = 1 if max slider is moved
        if (handle==0){
            document.getElementById('input-number-min').value = values[0];
        } else {
            document.getElementById('input-number-max').value =  values[1];
        }
    //we will definitely do more here...wait
    rangeMin = document.getElementById('input-number-min').value;
    rangeMax = document.getElementById('input-number-max').value;

    wanted = [];
    for (var i =0; i < data.length; i++){
    //    console.log(data[i].main.humidity);
        if (data[i].main.humidity >= rangeMin) {
          if (data[i].main.humidity <= rangeMax) {
              wanted.push(data[i]);
          }
        }
    }
   // console.log(wanted);

   createMap(wanted);
    })
    

  }

  var layers = { NORMAL: new L.LayerGroup()};
  // Create a map object.
  myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [
        layers.NORMAL
    ]
    });
  

  function init(){


    var choice = d3.select("#selDataset");
    // this line may need to change to keys depending on how flask app returns JSON
   
    // sort city names so they appear in drop down alphabetically
    sorted = [];
    for (var i=0; i < data.length; i++ ){
        if (data[i].sys.country === "US"){
        sorted.push(data[i].name)
        }
    }
    sorted.sort();
    for (var i=0; i < sorted.length; i++){
        choice.append("option").text(sorted[i]);

    }
        
        
    fillInInfoCard(sorted[0]);
    // Call bar graph and gauge functions here too

    
        // Add a tile layer.
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);
    
    
     // console.log(data1);
    
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
             var newmark = L.marker(city.coord)
            .bindPopup(`<h3>${city.name}</h3> <h4>Temperature: ${temp.toLocaleString()} F</h4>
            <h4>Humidity: ${city.main.humidity.toLocaleString()} </h4> <h4>Wind Speed: ${city.wind.speed.toLocaleString()} </h4>
            <h4>Sky: ${city.weather[0].description} </h4> `);

            newmark.addTo(myMap);
          }
         }
    sliderFill();
  }

  function optionChanged(city){
      fillInInfoCard(city);
      //sliderFill();
  }
  // define data by reading from API JSON Flask route
  init();
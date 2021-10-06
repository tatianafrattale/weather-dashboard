var data = d3.json("/current-data-json");
var seven_day_data = d3.json("/seven-day-data-json");

Promise.all([data, seven_day_data]).then(newFunction);

function newFunction(values){
    console.log(values);

    data = values[0];

    seven_day_data = values[1];

    var layers = { NORMAL: new L.LayerGroup()};
    myMap = L.map("map", {
     center: [37.09, -95.71],
     zoom: 5,
     layers: [
         layers.NORMAL
     ]
    });

    function createMap(data1){
        myMap.eachLayer(function (layer) {
            myMap.removeLayer(layer);
        });
        // Add a tile layer.
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);
        // console.log(data1);
    
        for (var i =0; i < data1.length; i++) {
             var city = data1[i];
            if (city.sys.country === "US"){
    
        // Change for new script being in F
                var temp = city.main.temp;
             L.marker(city.coord)
            .bindPopup(`<h3>${city.name}</h3> <h4>Temperature: ${temp.toLocaleString()} F</h4>
            <h4>Humidity: ${city.main.humidity.toLocaleString()} </h4> <h4>Wind Speed: ${city.wind.speed.toLocaleString()} </h4>
            <h4>Sky: ${city.weather[0].description} </h4> `)
            .addTo(myMap);
          }
         }
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
         createMap(wanted);
          })
    }

    function optionChanged(city){
        console.log("in original option changed");
        fillInInfoCard(city);
              // Bargraph(city);
    }

    function init(){
        //console.log("hello")
        // console.log(d3.json("/current-data-json"))
        //console.log("bye")
        
        var choice = d3.select("#selDataset");
       
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
        // Call bar graph here too    
        // Add a tile layer.
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(myMap);
        
            // Add markers
            for (var i =0; i < data.length; i++) {
                 var city = data[i];
                if (city.sys.country === "US"){
                 var temp = (city.main.temp);
                 var newmark = L.marker(city.coord)
                .bindPopup(`<h3>${city.name}</h3> <h4>Temperature: ${temp.toLocaleString()} F</h4>
                <h4>Humidity: ${city.main.humidity.toLocaleString()} </h4> <h4>Wind Speed: ${city.wind.speed.toLocaleString()} </h4>
                <h4>Sky: ${city.weather[0].description} </h4> `);
    
                newmark.addTo(myMap);
              }
             }
        sliderFill();
        // console.log(sorted[0])
        // console.log(seven_day_data[0])
        barGraph(sorted[0]);
    }
    init();
}

function optionChanged1(city){
    console.log("optionChanged1");
    fillInInfoCard(city);
    barGraph(city);
}

function fillInInfoCard(chosen_city){
    let cityinfo = data.filter(c => c.name === chosen_city);
    console.log("city info");
    console.log(cityinfo);
    tofill = d3.select("#sample-metadata");
    tofill.html("");
  // Fill in info panel
    let fields = ["temp", "temp_max", "temp_min", "humidity", "pressure"];
    let fields1 = ['Temperature', 'Max Temp', 'Min Temp', 'Humidity (%)', 'Pressure (hPa)'];
    tofill.append("h5").text("City: " + chosen_city);
    for (var i = 0; i < fields.length; i++){
        tofill.append("h5").text(String(fields1[i]) + ": " + String(cityinfo[0].main[fields[i]]));
    }
  
    // Update Gauge at same time
    // https://plotly.com/javascript/gauge-charts/
    //https://plotly.com/javascript/reference/indicator/
    // Change color of gauge bar depending on temperature
    if ( (cityinfo[0].main.temp ) < 0){
        color1 = "#A020F0";
    }
    else if ( (cityinfo[0].main.temp) < 46){
      color1 = "#0000FF";
    }
    else if ( (cityinfo[0].main.temp ) < 75){
      color1 = "#097969";
    }
    else if ( (cityinfo[0].main.temp )< 105){
      color1 = "#FF1493";
    }
    else if ( (cityinfo[0].main.temp ) < 150){
      color1 = "#FFA500";
    }
    
    var data2 = 
      {
          domain: { x: [-50, 130], y: [-50, 130] },
          
          value: (cityinfo[0].main.temp),
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




function barGraph(chosen_city){
    let selected_city = seven_day_data.filter(c => c.city.name === chosen_city);
    // Create empty arrays to hold temperature and date
    var seven_day_temp = []
    var seven_day_date = []
    var bar_colors = []


    console.log(selected_city);

  // Basically, loop through 7_day_weather, and take the day temperature
  for (var i = 0; i <= 6; i++){
    seven_day_temp.push(selected_city[0].list[i].temp.day);
    seven_day_date.push(new Date(selected_city[0].list[i].dt * 1000));

    if ( (selected_city[0].list[i].temp.day) < 0){
        bar_colors.push("#A020F0");
    }
    else if ( (selected_city[0].list[i].temp.day) < 46){
        bar_colors.push("#0000FF");
    }
    else if ( (selected_city[0].list[i].temp.day) < 75){
        bar_colors.push("#097969");
    }
    else if ( (selected_city[0].list[i].temp.day)< 105){
        bar_colors.push("#FF1493");
    }
    else if ( (selected_city[0].list[i].temp.day) < 150){
        bar_colors.push("#FFA500");
    }

    // console.log(new Date(selected_city[0].list[i].dt * 1000))
    // console.log(selected_city[0].list);
    // console.log(selected_city);
  }

  // console.log(bar_colors)

  var data3 = [
  {
      x: seven_day_date,
      y: seven_day_temp,
      type: 'bar',
      marker: {
        color: bar_colors
      }
  }
  ];

  let layout2 = {
    title: {
        text: "Weekly Temperature Forecast for " + chosen_city + " (F)"
    },  
    xaxis: {
          title: {
              text: "Date"
          }
      },
      yaxis: {
          title: {
            text: "Temperature (F)"
          }
      }
  }

Plotly.newPlot('bar', data3, layout2)
}



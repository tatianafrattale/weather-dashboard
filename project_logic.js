
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
    //console.log(rangeMin);
    //let cityinfo = data.filter(c => c.name === chosen_city);
    // wantedmarkers = [data.filter(c => c.main.humidity >= rangeMin)];
    // wanted = wantedmarkers.filter(c => c.main.humidity <= rangeMax);\
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
    for (var i=0; i < data.length; i++ ){
        choice.append("option").text(data[i].name);
    }
    fillInInfoCard(data[0].name);
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
  
  init();
# Weather-Dashboard
We plan on using the Open Weather API data to create a weather dashboard. It will contain data for ~200 different cities and show both current weather information for all of them, as well as more detailed info for a city that is chosen from a dropdown. A breakdown of the planned visuals is laid out below.

This could be useful to anyone curious about current weather around the world or anyone who is planning a trip to a specific location. The ability to dump the information into a database could be useful to anyone who needs to reference this information again offline at a later time. 



Data Source:

https://openweathermap.org/api

We plan on using a Flask application to make calls to the weather APIs (both Current Weather and 16 day forecast). This same Flask app will dump the resulting JSON responses into a MongoDB database. We will have a Javascript file that reads the JSON in from the Flask .py file and creates the visualizations using Plotly, ECharts, and Carto libraries. We will have an index.html file that deploys to show our dashboard.

What filter controls what?
Slider: Map
Dropdown: Metadata box, bar graph, and gauge

Visualizations:

Map of ~200 cities with markers with pop-ups including detailed weather info (current weather).
A line/bar graph linked to a drop-down of cities, that shows that city’s 2 week temperature forecast. 
A “metadata box” that includes selected city’s full info, including wind speed, cloud coverage, and humidity.
Gauge, linked to same dropdown that shows chosen city’s current temperature. 
“Slider feature” that allows us to filter map markers by humidity. 

Libraries Used:
D3, Leaflet, Plotly, Echarts, noUiSlider

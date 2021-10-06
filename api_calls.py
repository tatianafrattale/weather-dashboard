import json
import weather_data
import seven_day_forecast

# API functions
def getData():
    with open('weather_data.json', 'r') as outfile:
        current_data1 = json.load(outfile)  
    return current_data1

def getData2():
    with open('seven_day_weather_data.json', 'r') as outfile:
        seven_day_data1 = json.load(outfile)
    return seven_day_data1

current_data1 = getData()
seven_day_data1 = getData2()

# CHANGE BACK TO THIS CODE TO MAKE FLASK READ FROM API AGAIN
# current_data1 = weather_data.makecall()
# seven_day_data1 = seven_day_forecast.make7daycall()
import os
import json
#import weather_data
#import seven_day_forecast

# Eventually, we will not read from the local .json files, we will run the makecall() funcs
def getdata():
    with open('weather_data.json', 'r') as outfile:
        current_data1 = json.load(outfile)
    return current_data1
def getdata2():
    with open('seven_day_weather_data.json', 'r') as outfile:
        seven_day_data1 = json.load(outfile)
    return seven_day_data1

current_data1 = getdata()
seven_day_data1 = getdata2()
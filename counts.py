import os
import json

count1 = 0
count2 = 0

def getdata():
    with open('weather_data.json', 'r') as outfile:
        current_data1 = json.load(outfile)
        print(current_data1)
    return current_data1
def getdata2():
    with open('seven_day_weather_data.json', 'r') as outfile:
        seven_day_data1 = json.load(outfile)
    return seven_day_data1

current_data1 = getdata()
print("returned")
seven_day_data1 = getdata2()
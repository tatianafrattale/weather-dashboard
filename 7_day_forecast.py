import pandas as pd
import numpy as np
import requests    

def make7daycall():
        # List of cities for API calls 
    cities_list = ["Montgomery", "Juneau", "Phoenix", "Odessa", "Sacramento", "Denver", "Hartford", "Dover", "Tallahassee", "Atlanta", "Honolulu", "Boise",
          "Springfield", "Indianapolis", "Allen", "Topeka", "Frankfort", "Chesapeake", "Augusta", "Annapolis", "Boston", "Lansing", "Passaic",
          "Jackson", "Roanoke", "Helena", "Lincoln", "Lynchburg", "Concord", "Trenton", "Albuquerque", "Albany", "Raleigh", "Bismarck, Columbus",
          "Auburn", "Salem", "Harrisburg", "Providence", "Columbia", "Pierre", "Nashville", "Austin", "Provo", "Montpelier", "Richmond", "Olympia",
          "Charleston", "Madison, Cheyenne", "Mobile", "Huntsville", "Tucson", "Mesa", "Scottsdale", "Fayetteville", "Jonesboro", "Norfolk",
          "Bakersfield", "Stockton", "Greeley, Westminster", "Aurora", "Loveland", "Stamford", "Norwalk", "Wilmington", "Jacksonville",
          "Miami", "Tampa", "Orlando", "Hollywood", "Lawrence", "Flint", "Troy", "Wyoming", "Duluth", "Plymouth", "Omaha", "Henderson", "Nashua",
          "Clifton", "Elizabeth", "Buffalo", "Rochester", "Yonkers", "Schenectady", "Durham", "Charlotte", "Greensboro", "Asheville", "Gastonia",
          "Akron", "Parma", "Tulsa", "Edmond", "Salem", "Beaverton", "Scranton", "Chattanooga", "Houston", "Dallas", "Arlington", "Plano", "Mesquite",
          "Brownsville", "Pasadena", "Waco", "Carrollton", "Milwaukee", "Tyler", "Murfreesboro", "Pawtucket", "Erie", "Beaverton", "Canton", 
          "Lawton", "Cleveland", "Cincinnati", "Danbury", "Camden", "Newark", "Manchester", "Sparks", "Missoula", "Billings", "Independence", 
          "Gulfport", "Minneapolis", "Southfield", "Kalamazoo", "Westland", "Dearborn", "Somerville", "Newton", "Worcester", "Cambridge", "Lafayette",
          "Kenner", "Shreveport", "Brockton", "Quincy", "Olathe", "Wichita", "Waterloo", "Davenport", "Muncie", "Fishers", "Gary", "Hammond","Bloomington",
          "Palatine", "Joliet", "Rockford", "Chicago", "Peoria", "Elgin", "Roswell", "Macon", "Savannah", "Lauderhill", "Melbourne", "Largo", "Clearwater",
          "Miramar", "Hialeah", "Waterbury", "Longmont", "Boulder", "Centennial", "Arvada", "Pueblo", "Thornton", "Lakewood", "Napa", "Tracy", "Alhambra",
          "Temecula", "Antioch", "Burbank", "Murrieta", "Fairfield", "Carlsbad", "Inglewood", "Downey", "Victorville", "Vallejo", "Roseville", "Visalia",
          "Sunnyvale", "Escondido", "Hayward", "Torrance", "Pomona", "Salinas", "Corona", "Glendale", "Irvine", "Oceanside", "Fontana", "Oxnard", "Modesto",
          "Fremont", "Anaheim", "Oakland", "Fresno", "Springdale", "Avondale", "Yuma", "Surprise", "Tempe", "Gilbert", "Gainesville", "Plantation"]
#  API url template
#api.openweathermap.org/data/2.5/weather?q=atlanta&appid=a6501ad09aae11365e9abba37620e112
    weather_json= []
    url = "https://api.openweathermap.org/data/2.5/weather?q="
    api_key = "&cnt=7&units=imperial&appid=a6501ad09aae11365e9abba37620e112"

#Iterate through cities list for API Calls
    for city in cities_list: 
    
        api_url = url +city+ api_key
        weather_data = requests.get(api_url).json()
    
        if "name" in weather_data: 
            weather_json.append(weather_data)


# Check weather data
    print(weather_json)
    return weather_json

make7daycall()
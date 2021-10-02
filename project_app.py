# Imports
import weather_data
import seven_day_forecast
import pymongo
from flask_pymongo import PyMongo
import os
import json
import pandas as pd
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
################################################

mongo_current = PyMongo(app, uri="mongodb://localhost:27017/current_dashboard")
mongo_seven_day = PyMongo(app, uri="mongodb://localhost:27017/seven_day_dashboard")

# API call
current_data = weather_data.makecall()
seven_day_data = seven_day_forecast.make7daycall()

mongo_current.db.collection.update({}, current_data, upsert=True)
mongo_seven_day.db.collection.update({}, seven_day_data, upsert=True)

# API one time refresh for initialzing json routes
count1 = 0
count2 = 0

# Routes
@app.route("/")
def home(): 
    current = mongo_current.db.collection.find_one()
    forecast = mongo_seven_day.db.collection.find_one()
    meep = False
    if count1 == 0:
        meep = True
        count1 += 1
        return redirect("/current-data-json", meep)
    if count2 == 0:
        meep = True
        count2 += 1
        return redirect("/seven-day-data-json", meep)

    return render_template('index.html')

@app.route("/current-data-json")
def current_json(meep):
    current = mongo_current.db.collection.find_one()
    if meep:
        meep = False
        return jsonify(current)
    return redirect("/")

@app.route("/seven-day-data-json")
def weekly_forecast(meepmeep):
    forecast = mongo_seven_day.db.collection.find_one()
    if meepmeep:
        meepmeep = False
        return jsonify(forecast)
    return redirect("/")
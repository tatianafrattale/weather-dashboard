# Imports

from api_calls import current_data1, seven_day_data1
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
current_data = {"data": current_data1}
seven_day_data = {"data": seven_day_data1}

mongo_current.db.collection.update({}, current_data, upsert=True)
mongo_seven_day.db.collection.update({}, seven_day_data, upsert=True)

# Routes
@app.route("/")
def home(): 
    return render_template('index.html')

@app.route("/current-data-json")
def current_json():
    current = mongo_current.db.collection.find_one()
    return jsonify(current["data"])
    
@app.route("/seven-day-data-json")
def weekly_forecast():
    forecast = mongo_seven_day.db.collection.find_one()
    return jsonify(forecast["data"])


if __name__ == "__main__":
    app.run(debug=True)
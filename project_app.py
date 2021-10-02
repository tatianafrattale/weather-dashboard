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

mongo = PyMongo(app, uri="mongodb://localhost:27017/weather_dashboard")

# API call
current_data = weather_data.makecall()
seven_day_data = seven_day_forecast.make7daycall()
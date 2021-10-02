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
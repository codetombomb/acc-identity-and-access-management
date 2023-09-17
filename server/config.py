from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.json.compact = False

#https://furry-shrimp-4f0.notion.site/Cookies-and-Sessions-Cheatsheet-2e4cbcd1c8ee4d71b8b0da395ebb3fe4?pvs=4
app.secret_key = "Secret Key goes here" 

db = SQLAlchemy()
migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

CORS(app)
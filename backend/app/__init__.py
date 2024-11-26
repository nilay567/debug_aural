from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, MongoClient
from flask_mongoengine import MongoEngine
from app.config import config
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config.from_object(config)
app.config["JWT_SECRET_KEY"] = "aURALaPPpROTOTYPE"
jwt = JWTManager(app)
app.app_context().push()
db = MongoEngine()
mongo = PyMongo(app)
client = MongoClient(
    "mongodb+srv://auralsoftware:AuralAppPrototype1@cluster0.yaoih7w.mongodb.net/"
)


def init_app(app):
    db.init_app(app)
    mongo.init_app(app)
    if mongo.cx:
        print("Connected to MongoDB")
    else:
        print("Failed to connect to MongoDB")


def register_blueprints():
    from app.routes import routes

    app.register_blueprint(routes, url_prefix="/")

    from app.userAPI import user_api

    app.register_blueprint(user_api, url_prefix="/")

    from app.mentorAPI import mentor_api

    app.register_blueprint(mentor_api, url_prefix="/")

    from app.courseAPI import course_api

    app.register_blueprint(course_api, url_prefix="/")

    from app.adminAPI import admin_api

    app.register_blueprint(admin_api, url_prefix="/")

    from app.courseLevelAPI import courselevel_api

    app.register_blueprint(courselevel_api, url_prefix="/")

    from app.lectureAPI import lecture_api

    app.register_blueprint(lecture_api, url_prefix="/")

    from app.calendlyAPI import calendly_api

    app.register_blueprint(calendly_api, url_prefix="/")
    
    from app.contactAPI import contact_api

    app.register_blueprint(contact_api, url_prefix="/")
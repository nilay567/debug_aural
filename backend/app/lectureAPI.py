from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource
from bson import ObjectId, json_util
from app.__init__ import client
from flask import current_app as app
from app.models import Lecture

db = client.AuralApp
api = Api(app)

lecture_api = Blueprint("lecture_api", __name__)

class lecture(Resource):
    def post(self):
        lecturecollection = db["Lectures"]
        data = request.get_json()
        data = Lecture(**data)
        courselevelcollection = db["CourseLevels"]

        if(courselevelcollection.find_one({"name":data.name})):
            if(lecturecollection.find_one({"name":data.name, "lecturenumber":data.lecturenumber})):
                return jsonify({"message": "Lecture already exists"})
            else:
                if(courselevelcollection.find_one({"name":data.name, "levelnumber":data.courselevelnumber})):
                    

                    lecturecollection.insert_one(data.to_mongo().to_dict())
                    curr_lecture=lecturecollection.find_one({"name": data.name, "lecturenumber": data.lecturenumber})
                    print(curr_lecture['_id'])
                    courselevelcollection.update_one({"name": data['name'],"levelnumber":data['courselevelnumber']}, {"$push": {"lectures": curr_lecture['_id']}})
                    return jsonify({"message": "Lecture added successfully"})
                else:
                    return jsonify({"message": "Course Level does not exist"})
        else:
            return jsonify({"message": "Course does not exist"})

api.add_resource(lecture, "/addLecture")


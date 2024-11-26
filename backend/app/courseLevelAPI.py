from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource
from bson import ObjectId, json_util
from app.__init__ import client
from flask import current_app as app
from app.models import CourseLevel
from app.models import User

db = client.AuralApp
api = Api(app)

courselevel_api = Blueprint("courselevel_api", __name__)


class courseLevel(Resource):

    def post(self):
        levelcollection = db["CourseLevels"]
        coursecollection = db["Courses"]
        data = request.get_json()
        data['lectures']=[]
        data['assignments']=[]
        data = CourseLevel(**data)  
        print(data.name)

        if(coursecollection.find_one({"name":data.name})):
            if(levelcollection.find_one({"name":data.name, "levelnumber":data.levelnumber})):
                return jsonify({"message": "Course Level already exists"})
            else:
                levelcollection.insert_one(data.to_mongo().to_dict())
                curr_courselevel=levelcollection.find_one({"name": data.name, "levelnumber": data.levelnumber})
                print(curr_courselevel['_id'])
                coursecollection.update_one({"name": data['name']}, {"$push": {"levels": curr_courselevel['_id']}})
                return jsonify({"message": "Course Level added successfully"})
        else:
            print("course does not exist")

# @app.route("/addFavourite/<id>",methods=["PATCH"])
# def update_one(id):
#     collection=db["Users"]
#     try:
#         userData=collection.find_one({"_id":ObjectId(id)})
#         if userData:
#             collection.update_one({"_id":ObjectId(id)},{"$set":{'favourites':[]}})
#             return jsonify({'message': f'Favorites field added for user {id}'}), 200
#         else:
#             return jsonify({'message': f'User with ID {id} not found'}), 404
#     except Exception as e:
#         return jsonify({"message":"Something is wrong","error":str(e)})

class FavouriteLevels(Resource):
    def patch(self,levelId,userId):
        collection=db["Users"]
        try:
            userData=collection.find_one({"_id":ObjectId(userId)})
            if(levelId not in userData["favourites"]):
                favourites=userData["favourites"]
                favourites.append(levelId)
                collection.update_one(
                    {"_id":ObjectId(userId)},{"$set":{"favourites":favourites}}
                )
                return jsonify({
                    "status":"success","message":"Level added to Favourites Successfully"
                })
            else:
                return jsonify({
                    "status":"Failed","message":"Level is already a favourite"
                })
        except Exception as e:
            return jsonify({
              "status":"Failed","message":"Something went wrong","error":str(e)
            })

class UnfavouriteLevels(Resource):
    def patch(self,levelId,userId):
        collection=db["Users"]
        try:
            userData=collection.find_one({"_id":ObjectId(userId)})
            if(levelId in userData["favourites"]):
                favourites=userData["favourites"]
                favourites.remove(levelId)
                collection.update_one(
                    {"_id":ObjectId(userId)},{"$set":{"favourites":favourites}}
                )
                return jsonify({
                    "status":"success","message":"Level removed from Favourites Successfully"
                })
            else:
                return jsonify({
                    "status":"Failed","message":"Level was not found"
                })
        except Exception as e:
            return jsonify({
              "status":"Failed","message":"Something went wrong","error":str(e)
            })
            


api.add_resource(courseLevel, "/courselevel")
api.add_resource(FavouriteLevels,"/favouriteLevel/<levelId>/<userId>")
api.add_resource(UnfavouriteLevels,"/unfavouriteLevel/<levelId>/<userId>")

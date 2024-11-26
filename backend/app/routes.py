import json
from flask import Blueprint, jsonify, request
from app.__init__ import mongo, client
from app.models import User

routes = Blueprint("routes", __name__)


@routes.route("/", methods=["GET", "POST"])
def home():
    return "Home"




# @routes.route('/add_data', methods= ['GET','POST'])
# def add_data():
#     db = client.AuralApp
#     collection= db["Users"]
#     try:
#         new_user=request.json
#         user=User(**new_user)
#         try:
#             if collection.find_one({"username": user.username}):
#                 return jsonify({'status': 'fail', 'message': 'User already exists'})
#             if collection.find_one({"email": user.email}):
#                 return jsonify({'status': 'fail', 'message': 'Email already exists'})
#             if collection.find_one({"phone": user.phone}):
#                 return jsonify({'status': 'fail', 'message': 'Phone already exists'})
#             collection.insert_one(user.to_mongo().to_dict())
#             return jsonify({'status': 'success', 'message': 'User added successfully'})
#         except Exception as e:
#             return jsonify({'error': str(e)})
#     except Exception as e:
#         return jsonify({'error': str(e), 'status': 'fail', 'message': 'User not added'})

# @routes.route('/mentorData', methods= ['GET','POST'])
# def get_data():
#     db = client.AuralApp
#     collection= db["Users"]
#     try:
#         data = list(collection.find())
#         mentorData=[data for data in data if "Mentor" in data["roles"]]
#         return jsonify({'data': mentorData})
#     except Exception as e:
#         return jsonify({'error': str(e)})

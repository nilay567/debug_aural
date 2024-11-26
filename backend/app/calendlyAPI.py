from flask import Blueprint, jsonify, request, make_response
from flask_restful import Api, Resource
from bson import ObjectId, json_util
from app.__init__ import client
from flask import current_app as app
import requests


db = client.AuralApp
api = Api(app)
calendly_api = Blueprint("calendly_api", __name__)

collection = db["Calendly"]

BASE_URL = "https://api.calendly.com"


class apikey(Resource):
    # set the user's api key
    def post(self):
        data = request.get_json()
        print(data)
        # validate post data
        print(type(data))

        if "api_key" not in data or data["api_key"] == "":
            return make_response(jsonify({"message": "api key not provided"}), 200)
        elif "username" not in data or data["username"] == "":
            return make_response(jsonify({"message": "user not provided"}), 200)

        # get user's object id from username
        user = db["Users"].find_one({"username": data["username"]})
        if user is None:
            return make_response(jsonify({"message": "user not found"}), 200)
        else:
            user_id = user["_id"]

        # check if api key is valid and get uri
        response = requests.get(
            f"{BASE_URL}/users/me",
            headers={"Authorization": "Bearer " + data["api_key"]},
        )
        response = response.json()
        if "resource" in response:
            uri = response["resource"]["uri"]
        else:
            if response["title"] == "Unauthenticated":
                
                return make_response(jsonify({"message": "invalid api key"}), 200)
            else:
                return make_response(
                    jsonify({"message": "error in calendly's api"}), 200
                )

        collection.insert_one(
            {"user_id": ObjectId(user_id), "api_key": data["api_key"], "uri": uri}
        )

        return jsonify({"message": "success"})

    def get(self):
        data = request.get_json()
        # validate post data
        if "username" not in data or data["username"] == "":
            return make_response(jsonify({"message": "user not provided"}), 400)

        # check if user exists
        user = db["Users"].find_one({"username": data["username"]})

        if user is None:
            return make_response(jsonify({"message": "user not found"}), 404)

        # get user's api key
        user = collection.find_one({"user_id": ObjectId(user["_id"])})
        if user is None:
            return make_response(jsonify({"message": "user not found"}), 404)
        else:
            return jsonify({"api_key": user["api_key"]})


class url(Resource):
    def get(self):
        data = request.get_json()
        # validate post data

        if "mentor_username" not in data or data["mentor_username"] == "":
            return make_response(jsonify({"message": "mentor not provided"}), 400)

        if "user_id" not in data or data["user_id"] == "":
            if "username" not in data or data["username"] == "":
                return make_response(jsonify({"message": "user not provided"}), 400)
            else:
                # get user's object id from username
                user = db["Users"].find_one({"username": data["username"]})
                if user is None:
                    return make_response(jsonify({"message": "user not found"}), 404)

                data["user_id"] = user["_id"]

        # check if user exists
        user = collection.find_one({"user_id": ObjectId(data["user_id"])})

        if user is None:
            return make_response(jsonify({"message": "user not found"}), 404)

        apikey = user["api_key"]

        # get mentor's userid
        mentor = db["Users"].find_one({"username": data["mentor_username"]})
        if mentor is None:
            return make_response(jsonify({"message": "mentor not found"}), 404)
        else:
            mentor_id = mentor["_id"]

        # get mentor's uri
        mentor = collection.find_one({"user_id": ObjectId(mentor_id)})
        if mentor is None:
            return make_response(jsonify({"message": "mentor not found"}), 404)
        else:
            mentor_uri = mentor["uri"]

        # get mentor's scheduling url
        response = requests.get(
            mentor_uri, headers={"Authorization": "Bearer " + apikey}
        )

        response = response.json()
        if "resource" in response:
            url = response["resource"]["scheduling_url"]
        else:
            if response["title"] == "Unauthenticated":
                return make_response(jsonify({"message": "invalid api key"}), 400)
            else:
                return make_response(
                    jsonify({"message": "error in calendly's api"}), 500
                )

        return jsonify({"url": url})


api.add_resource(apikey, "/calendly/apikey")
api.add_resource(url, "/calendly/url")

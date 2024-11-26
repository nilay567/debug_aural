from flask import Blueprint, jsonify, request, make_response
from flask_restful import Api, Resource
from app.__init__ import client
from flask import current_app as app
import datetime
from bson.json_util import dumps
import email_validator

db = client.AuralApp
api = Api(app)
contact_api = Blueprint("contact_api", __name__)

collection = db["Contact"]


class contact(Resource):
    def post(self):
        try:
            data = request.get_json()

            if data == None:
                return make_response(jsonify({"message": "No data sent"}), 400)

            if data["name"] == "" and data["username"] == "":
                return make_response(
                    jsonify({"message": "Name and Username cannot be empty"}), 400
                )
            if data["email"] == "":
                return make_response(jsonify({"message": "Email cannot be empty"}), 400)
            if data["message"] == "":
                return make_response(
                    jsonify({"message": "Message cannot be empty"}), 400
                )

            username = data["username"]
            name = data["name"]
            email = data["email"]
            message = data["message"]
            time = datetime.datetime.now()

            # validate email
            try:
                email_validator.validate_email(email, check_deliverability=False)
            except Exception as e:
                e = str(e)
                return make_response(jsonify({"message": e}), 400)

            if name == "":
                name = None

            if username == "":
                username = None
            else:
                # check if username exists and find the user's name
                if db["Users"].find_one({"username": username}):
                    name = (
                        db["Users"].find_one({"username": username})["first_name"]
                        + " "
                        + db["Users"].find_one({"username": username})["last_name"]
                    )
                else:
                    return make_response(
                        jsonify({"message": "Username does not exist"}), 400
                    )

            # insert into database
            collection.insert_one(
                {
                    "username": username,
                    "name": name,
                    "email": email,
                    "message": message,
                    "time ": time,
                }
            )

            return make_response(
                jsonify({"message": "Contact query sent successfully"}), 200
            )

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "An error occured"}), 500)

    def get(self):
        try:
            # return all contact queries in descending order of time

            data = collection.find({}, {"_id": 0}).sort("time", -1)
            # data is a cursor object
            data = list(data)

            # check if data is empty
            if data == []:
                return make_response(jsonify({"message": "No data found"}), 404)

            data = dumps(data)

            return make_response(jsonify({"message": data}), 200)

        except Exception as e:
            print(e)
            return make_response(jsonify({"message": "An error occured"}), 500)


api.add_resource(contact, "/api/contact")

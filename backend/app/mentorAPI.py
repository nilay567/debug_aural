from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource
from bson import ObjectId, json_util
from app.__init__ import client
from flask import current_app as app

db = client.AuralApp
api = Api(app)
mentor_api = Blueprint("mentor_api", __name__)


class getMentor(Resource):
    """
    Represents a resource for retrieving mentors.

    Methods:
        - get: Retrieves all mentors from the database.
    """

    def get(self):
        """
        Retrieves all mentors from the database.

        Returns:
            A JSON object containing all mentors in the database.
        """

        collection = db["Users"]

        users = list(collection.find())
        mentors = [users for users in users if "Mentor" in users["roles"]]

        return jsonify(json_util.dumps(mentors))


class MentorById(Resource):
    """
    Represents a resource for retrieving a mentor by ID.

    Methods:
        - get: Retrieves a mentor by ID from the database.
        - delete: Deletes a mentor by ID from the database.
        - put: Updates a mentor by ID in the database.
    """

    def get(self, id):
        """
        Retrieves a mentor by ID from the database.

        Args:
            id: The ID of the mentor to retrieve.

        Returns:
            A JSON object containing the mentor with the specified ID.

        """
        collection = db["Users"]
        print(id)

        try:
            mentor = list(collection.find({"_id": ObjectId(id)}))
            return jsonify({"status": "success", "data": json_util.dumps(mentor)})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def delete(self, id):
        collection = db["Users"]
        try:
            collection.delete_one({"_id": ObjectId(id)})
            return jsonify(
                {"status": "success", "message": "Mentor deleted successfully"}
            )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def put(self, id):
        collection = db["Users"]
        try:
            collection.update_one({"_id": ObjectId(id)}, {"$set": request.json})
            return jsonify(
                {"status": "success", "message": "Mentor updated successfully"}
            )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})


# students of mentor
class StudentsOfMentor(Resource):
    """
    Represents an API resource for retrieving students of a mentor.

    Methods:
    - get: Retrieves the students associated with a mentor.
    """

    def get(self, id):
        """
        Retrieves the students associated with a mentor.

        Args:
        - id (str): The ID of the mentor.

        Returns:
        - Flask Response: A JSON response containing the status and data.
        """
        collection = db["Users"]
        try:
            users = list(collection.find())
            students = [users for users in users if id in users["mentors"]]
            return jsonify({"status": "success", "data": json_util.dumps(students)})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})


class deleteStudentFromMentor(Resource):
    """
    Represents an API resource for deleting a student from a mentor.

    Methods:
    - delete: Deletes a student from a mentor.
    """

    def delete(self, mentorId, studentId):
        """
        Deletes a student from a mentor.

        Args:
        - mentorId (str): The ID of the mentor.
        - studentId (str): The ID of the student.

        Returns:
        - A JSON response containing the status and message.
        """
        collection = db["Users"]
        try:
            studentData = collection.find_one({"_id": ObjectId(studentId)})
            mentors = studentData["mentors"]
            mentors.remove(mentorId)
            collection.update_one(
                {"_id": ObjectId(studentId)}, {"$set": {"mentors": mentors}}
            )
            return jsonify(
                {"status": "success", "message": "Student deleted successfully"}
            )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

class subscribe(Resource):
    """
    Represents an API resource for subscribing to a mentor.

    Methods:
    - post: Subscribes to a mentor.
    """

    def post(self, mentorId, studentId):
        """
        Subscribes to a mentor.

        Args:
        - mentorId (str): The ID of the mentor.
        - studentId (str): The ID of the student.

        Returns:
        - A JSON response containing the status and message.
        """
        collection = db["Users"]
        try:
            
            studentData = collection.find_one({"_id": ObjectId(studentId)})
            print(studentData)
            if(mentorId==studentId):
                return jsonify(
                    {"status": "success", "message": "Student cannot subscribe to self"}
                )
            if(mentorId not in studentData["mentors"]):
                mentors = studentData["mentors"]
                mentors.append(mentorId)
                collection.update_one(
                {   "_id": ObjectId(studentId)}, {"$set": {"mentors": mentors}}
                )
                return jsonify(
                    {"status": "success", "message": "Student subscribed successfully"}
                )
            else:
                return jsonify(
                    {"status": "success", "message": "Student already subscribed"}
                )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})
        
class unSubscribe(Resource):
    def post(self, mentorId, studentId):
        """
        Subscribes to a mentor.

        Args:
        - mentorId (str): The ID of the mentor.
        - studentId (str): The ID of the student.

        Returns:
        - A JSON response containing the status and message.
        """
        collection = db["Users"]
        try:
            studentData = collection.find_one({"_id": ObjectId(studentId)})
            mentors = studentData["mentors"]
            if(mentorId not in mentors):
                return jsonify(
                    {"status": "success", "message": "Student not subscribed"}
                )
            
            mentors.remove(mentorId)
            collection.update_one(
                {"_id": ObjectId(studentId)}, {"$set": {"mentors": mentors}}
            )
            return jsonify(
                {"status": "success", "message": "Student unsubscribed successfully"}
            )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

api.add_resource(unSubscribe, "/unSubscribe/<mentorId>/<studentId>")
api.add_resource(subscribe, "/subscribe/<mentorId>/<studentId>")
api.add_resource(getMentor, "/getMentor")
api.add_resource(MentorById, "/MentorById/<id>")
api.add_resource(StudentsOfMentor, "/StudentsOfMentor/<id>")
api.add_resource(
    deleteStudentFromMentor, "/deleteStudentFromMentor/<mentorId>/<studentId>"
)

from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource
from bson import ObjectId, json_util
from app.__init__ import client
from flask import current_app as app

db = client.AuralApp
api = Api(app)
assignments_api = Blueprint("assignments_api", __name__)


# Define Resources
class getAssignments(Resource):
    """
    Represents a resource for retrieving assignments.

    Methods:
        get(self): Retrieves all assignments from the database.
    """

    def get(self):
        """
        Retrieves all assignments from the database.

        Returns:
            A JSON response containing the assignments.
        """
        collection = db["Assignments"]

        assignments = list(collection.find())

        print(assignments)

        return jsonify(json_util.dumps(assignments))


class AssignmentById(Resource):
    """
    Represents a resource for retrieving, deleting, and updating assignments by id.

    Methods:
        get(self, id): Retrieves an assignment from the database by id.
        delete(self, id): Deletes an assignment from the database by id.
        put(self, id): Updates an assignment in the database by id.
    """

    def get(self, id):
        """
        Retrieves an assignment from the database by id.

        Args:
            id: The id of the assignment to retrieve.

        Returns:
            A JSON response containing the assignment.
        """
        collection = db["Assignments"]
        print(id)

        try:
            assignment = list(collection.find({"_id": ObjectId(id)}))
            return jsonify({"status": "success", "data": json_util.dumps(assignment)})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def delete(self, id):
        """
        Deletes an assignment from the database by id.

        Args:
            id: The id of the assignment to delete.

        Returns:
            A JSON response containing the status of the deletion.
        """
        collection = db["Assignments"]
        try:
            collection.delete_one({"_id": ObjectId(id)})
            return jsonify(
                {"status": "success", "message": "Assignment deleted successfully"}
            )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def put(self, id):
        """
        Updates an assignment in the database by id.

        Args:
            id: The id of the assignment to update.

        Returns:
            A JSON response containing the status of the update.
        """
        collection = db["Assignments"]
        try:
            collection.update_one({"_id": ObjectId(id)}, {"$set": request.json})
            return jsonify(
                {"status": "success", "message": "Assignment updated successfully"}
            )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})


# Add resources to API
api.add_resource(getAssignments, "/getAssignments")
api.add_resource(AssignmentById, "/AssignmentById/<id>")

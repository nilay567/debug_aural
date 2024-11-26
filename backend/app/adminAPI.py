from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource
from bson import ObjectId, json_util
from app.__init__ import client
from flask import current_app as app

db = client.AuralApp
api = Api(app)
admin_api = Blueprint("admin_api", __name__)

# Define resources


class CourseByAdmin(Resource):
    """
    Represents a resource for courses with admin permissions.

    Methods:
        - get(id): Retrieves courses based on admin permissions.
        - post(id): Adds a course based on admin permissions.
        - delete(id): Deletes a course based on admin permissions.
        - put(id): Updates a course based on admin permissions.
    """

    def get(self, id):
        """
        Endpoint: /courseByAdmin/<id>
        Method: GET
        Description: Retrieves courses based on admin permissions.
        Parameters:
            - id: User ID to check for admin permissions.
        """
        collection = db["Courses"]
        try:
            user = list(collection.find({"_id": ObjectId(id)}))
            if "Admin" in user[0]["roles"]:
                courses = list(collection.find())
                return jsonify({"status": "success", "data": json_util.dumps(courses)})
            else:
                return jsonify({"status": "failed", "error": "You are not an admin"})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def post(self, id):
        """
        Endpoint: /courseByAdmin/<id>
        Method: POST
        Description: Adds a course based on admin permissions.
        Parameters:
            - id: User ID to check for admin permissions.
        """
        collection = db["Courses"]
        try:
            user = list(collection.find({"_id": ObjectId(id)}))
            if "Admin" in user[0]["roles"]:
                collection.insert_one(request.json)
                return jsonify(
                    {"status": "success", "message": "Course added successfully"}
                )
            else:
                return jsonify({"status": "failed", "error": "You are not an admin"})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def delete(self, id):
        """
        Endpoint: /courseByAdmin/<id>
        Method: DELETE
        Description: Deletes a course based on admin permissions.
        Parameters:
            - id: User ID to check for admin permissions.
        """
        collection = db["Courses"]
        try:
            user = list(collection.find({"_id": ObjectId(id)}))
            if "Admin" in user[0]["roles"]:
                collection.delete_one({"_id": ObjectId(id)})
                return jsonify(
                    {"status": "success", "message": "Course deleted successfully"}
                )
            else:
                return jsonify({"status": "failed", "error": "You are not an admin"})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def put(self, id):
        """
        Endpoint: /courseByAdmin/<id>
        Method: PUT
        Description: Updates a course based on admin permissions.
        Parameters:
            - id: User ID to check for admin permissions.
        """
        collection = db["Courses"]
        try:
            user = list(collection.find({"_id": ObjectId(id)}))
            if "Admin" in user[0]["roles"]:
                collection.update_one({"_id": ObjectId(id)}, {"$set": request.json})
                return jsonify(
                    {"status": "success", "message": "Course updated successfully"}
                )
            else:
                return jsonify({"status": "failed", "error": "You are not an admin"})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})


class GetAllUsersByAdmin(Resource):
    """
    Represents a resource for users with admin permissions.

    Methods:
        - get(id): Retrieves all users based on admin permissions.
    """
    def get(self, id):
        """
        Endpoint: /getAllUsersByAdmin/<id>
        Method: GET
        Description: Retrieves all users based on admin permissions.
        Parameters:
            - id: User ID to check for admin permissions.
        """
        collection = db["Users"]
        try:
            user = list(collection.find({"_id": ObjectId(id)}))
            if "Admin" in user[0]["roles"]:
                users = list(collection.find())
                return jsonify({"status": "success", "data": json_util.dumps(users)})
            else:
                return jsonify({"status": "failed", "error": "You are not an admin"})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})


class UserByAdmin(Resource):
    """
    Represents a resource for users with admin permissions.

    Methods:
        - get(userId, adminId): Retrieves a user based on admin permissions.
        - delete(userId, adminId): Deletes a user based on admin permissions.
        - put(userId, adminId): Updates a user based on admin permissions.

    Note:
        - To create a user, use the UserAPI resource.
    """

    def get(self, userId, adminId):
        """
        Endpoint: /getUserByAdmin/<userId>/<adminId>
        Method: GET
        Description: Retrieves a user based on admin permissions.
        Parameters:
            - userId: User ID to retrieve.
            - adminId: User ID to check for admin permissions.
        """
        collection = db["Users"]
        try:
            user = list(collection.find({"_id": ObjectId(adminId)}))
            if "Admin" in user[0]["roles"]:
                user = list(collection.find({"_id": ObjectId(userId)}))
                return jsonify({"status": "success", "data": json_util.dumps(user)})
            else:
                return jsonify({"status": "failed", "error": "You are not an admin"})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def delete(self, userId, adminId):
        """
        Endpoint: /deleteUserByAdmin/<userId>/<adminId>
        Method: DELETE
        Description: Deletes a user based on admin permissions.
        Parameters:
            - userId: User ID to delete.
            - adminId: User ID to check for admin permissions.
        """
        collection = db["Users"]
        try:
            user = list(collection.find({"_id": ObjectId(adminId)}))
            if "Admin" in user[0]["roles"]:
                collection.delete_one({"_id": ObjectId(userId)})
                return jsonify(
                    {"status": "success", "message": "User deleted successfully"}
                )
            else:
                return jsonify({"status": "failed", "error": "You are not an admin"})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def put(self, userId, adminId):
        """
        Endpoint: /updateUserByAdmin/<userId>/<adminId>
        Method: PUT
        Description: Updates a user based on admin permissions.
        Parameters:
            - userId: User ID to update.
            - adminId: User ID to check for admin permissions.
        """
        collection = db["Users"]
        try:
            user = list(collection.find({"_id": ObjectId(adminId)}))
            if "Admin" in user[0]["roles"]:
                collection.update_one({"_id": ObjectId(userId)}, {"$set": request.json})
                return jsonify(
                    {"status": "success", "message": "User updated successfully"}
                )
            else:
                return jsonify({"status": "failed", "error": "You are not an admin"})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})


class GetAllMentorsByAdmin(Resource):
    def get(self, id):
        """
        Endpoint: /getMentorsByAdmin/<id>
        Method: GET
        Description: Retrieves mentors based on admin permissions.
        Parameters:
            - id: User ID to check for admin permissions.
        """
        collection = db["Users"]
        try:
            user = list(collection.find({"_id": ObjectId(id)}))
            if "Admin" in user[0]["roles"]:
                users = list(collection.find())
                mentors = [users for users in users if "Mentor" in users["roles"]]
                return jsonify({"status": "success", "data": json_util.dumps(mentors)})
            else:
                return jsonify({"status": "failed", "error": "You are not an admin"})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})


class MentorByAdmin(Resource):
    """
    Represents a resource for mentors with admin permissions.

    Methods:
        - get(mentorId, adminId): Retrieves a mentor based on admin permissions.
        - post(id): Adds a mentor based on admin permissions.
        - delete(mentorId, adminId): Deletes a mentor based on admin permissions.
        - put(mentorId, adminId): Updates a mentor based on admin permissions.
    """

    def get(self, mentorId, adminId):
        """
        Endpoint: /getMentorByAdmin/<mentorId>/<adminId>
        Method: GET
        Description: Retrieves a mentor based on admin permissions.
        Parameters:
            - mentorId: Mentor ID to retrieve.
            - adminId: User ID to check for admin permissions.
        """
        collection = db["Users"]
        try:
            user = list(collection.find({"_id": ObjectId(adminId)}))
            if "Admin" in user[0]["roles"]:
                mentor = list(collection.find({"_id": ObjectId(mentorId)}))
                return jsonify({"status": "success", "data": json_util.dumps(mentor)})
            else:
                return jsonify({"status": "failed", "error": "You are not an admin"})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def post(self, id):
        """
        Endpoint: /addMentorByAdmin/<id>
        Method: POST
        Description: Adds a mentor based on admin permissions.
        Parameters:
            - id: User ID to check for admin permissions.
        """
        collection = db["Users"]
        try:
            user = list(collection.find({"_id": ObjectId(id)}))
            if "Admin" in user[0]["roles"]:
                collection.insert_one(request.json)
                return jsonify(
                    {"status": "success", "message": "Mentor added successfully"}
                )
            else:
                return jsonify({"status": "failed", "error": "You are not an admin"})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def delete(self, mentorId, adminId):
        """
        Endpoint: /deleteMentorByAdmin/<mentorId>/<adminId>
        Method: DELETE
        Description: Deletes a mentor based on admin permissions.
        Parameters:
            - mentorId: Mentor ID to delete.
            - adminId: User ID to check for admin permissions.
        """
        collection = db["Users"]
        try:
            user = list(collection.find({"_id": ObjectId(adminId)}))
            if "Admin" in user[0]["roles"]:
                collection.delete_one({"_id": ObjectId(mentorId)})
                return jsonify(
                    {"status": "success", "message": "Mentor deleted successfully"}
                )
            else:
                return jsonify({"status": "failed", "error": "You are not an admin"})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def put(self, mentorId, adminId):
        """
        Endpoint: /updateMentorByAdmin/<mentorId>/<adminId>
        Method: PUT
        Description: Updates a mentor based on admin permissions.
        Parameters:
            - mentorId: Mentor ID to update.
            - adminId: User ID to check for admin permissions.
        """
        collection = db["Users"]
        try:
            user = list(collection.find({"_id": ObjectId(adminId)}))
            if "Admin" in user[0]["roles"]:
                collection.update_one(
                    {"_id": ObjectId(mentorId)}, {"$set": request.json}
                )
                return jsonify(
                    {"status": "success", "message": "Mentor updated successfully"}
                )
            else:
                return jsonify({"status": "failed", "error": "You are not an admin"})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

class userWitUserNameByAdmin(Resource):
    
    def get(self,username,adminid):
        collection=db['Users']
        admin=collection.find_one({"_id":ObjectId(adminid)})
        if admin['roles'][0]=='Admin':
            user=collection.find_one({"username":username})
            return jsonify({"status":"success","data":json_util.dumps(user)})
        else:
            return jsonify({"status":"failed","error":"You are not an admin"})
    
    def delete(self,username,adminid):
        collection=db['Users']
        admin=collection.find_one({"_id":ObjectId(adminid)})
        print(admin)
        if "Admin" in admin['roles']:
            if(username==admin['username']):
                return jsonify({"status":"failed","error":"You cannot delete yourself"})
            if(collection.find_one({"username":username})==None):
                return jsonify({"status":"failed","error":"User does not exist"})
            else:
                collection.delete_one({"username":username})
                return jsonify({"status":"success","message":"User deleted successfully"})
        else:
            return jsonify({"status":"failed","error":"You are not an admin"})
            






# Add resources to API
api.add_resource(userWitUserNameByAdmin,"/userWithUserNameByAdmin/<username>/<adminid>")
api.add_resource(CourseByAdmin, "/courseByAdmin/<id>")
api.add_resource(GetAllUsersByAdmin, "/getAllUsersByAdmin/<id>")
api.add_resource(UserByAdmin, "/UserByAdmin/<userId>/<adminId>")
api.add_resource(GetAllMentorsByAdmin, "/getMentorsByAdmin/<id>")
api.add_resource(MentorByAdmin, "/MentorByAdmin/<mentorId>/<adminId>")

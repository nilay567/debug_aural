from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource
from bson import ObjectId, json_util
from app.__init__ import client
from flask import current_app as app
from app.models import User
import bcrypt
from flask_jwt_extended import create_access_token, jwt_required
from flask_cors import CORS  # Import the CORS extension
from datetime import datetime
import cloudinary
import cloudinary.uploader
import cloudinary.api



import os
db = client.AuralApp
api = Api(app)
user_api = Blueprint("user_api", __name__)

# Initialize CORS with your Flask app
CORS(app)



@user_api.route("/login", methods=["POST"])
def login():
    collection = db["Users"]
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    curr_user = collection.find_one({"username": username})
    curr_user["_id"]=str(curr_user["_id"])
   
    # print(curr_user)
    # return jsonify({"data":curr_user})

    try:
        if curr_user and bcrypt.checkpw(
            password.encode("utf8"), curr_user["password"].encode("utf8")
        ):
            del curr_user["password"]
            access_token = create_access_token(identity=username)
            return jsonify({ "status": "success",
                "message": "User added successfully","access_token": access_token,"id":curr_user["_id"]}), 200
        else:
            return jsonify({"error": "Invalid username or password"}), 401
    except Exception as e:

        return jsonify({"error": "An error occurred during authentication"}), 500



# testing jwt
class Protected(Resource):
    @jwt_required()
    def get(self):
        return jsonify({"hello": "world"})


api.add_resource(Protected, "/protected")

# Your logic to add a new user to the database goes here...

@user_api.route("/addUser", methods=["POST"])
def signup():
    try:
        collection = db["Users"]
        new_user = request.get_json()
        date_of_birth = new_user.get("date_of_birth")

        if date_of_birth:
            # Convert ISO string to datetime object
            date_of_birth = datetime.fromisoformat(date_of_birth)
            new_user["date_of_birth"] = date_of_birth

        # Check if username, email, and phone are unique
        if collection.find_one({"username": new_user["username"]}):
            return jsonify({"status": "fail", "message": "Username already exists"})
        if collection.find_one({"email": new_user["email"]}):
            return jsonify({"status": "fail", "message": "Email already exists"})
        if collection.find_one({"phone": new_user["phone"]}):
            return jsonify({"status": "fail", "message": "Phone already exists"})

        user = User(**new_user)
        try:
            password = user["password"]
            hashed_password = bcrypt.hashpw(password.encode("utf8"), bcrypt.gensalt())
            user["password"] = hashed_password

            newUser = collection.insert_one(user.to_mongo().to_dict())
            newUser_data = collection.find_one({"_id": newUser.inserted_id})
            newUser_data["password"] = None
            newUser_data["_id"] = str(newUser_data["_id"])

            access_token = create_access_token(identity=newUser_data["username"])

            return jsonify({
                "status": "success",
                "message": "User added successfully",
                "id": newUser_data["_id"],
                "token": access_token
            })
        except Exception as e:
            return jsonify({"error": str(e)})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e), "status": "fail", "message": "User not added"})
    
    #  updating user    
    
@user_api.route("/updateUser/<user_id>", methods=["PUT"])
def update_user(user_id):
    try:
        collection = db["Users"]
        user_id = ObjectId(user_id)
        updated_data = request.get_json()

        print('Received PUT request for user_id:', user_id)
        print('Received data:', updated_data)

        existing_username = collection.find_one({"username": updated_data.get("username")})
        existing_email = collection.find_one({"email": updated_data.get("email")})
        existing_phone = collection.find_one({"phone": updated_data.get("phone")})

        if existing_username and existing_username["_id"] != user_id:
            return jsonify({"status": "fail", "message": "Username not available"})

        if existing_email and existing_email["_id"] != user_id:
            return jsonify({"status": "fail", "message": "Email already exists"})

        if existing_phone and existing_phone["_id"] != user_id:
            return jsonify({"status": "fail", "message": "Phone already exists"})

        # Check if the new password is provided
        if 'password' in updated_data:
            # If provided, hash the new password using bcrypt
            hashed_password = bcrypt.hashpw(updated_data['password'].encode("utf8"), bcrypt.gensalt())
            updated_data['password'] = hashed_password.decode("utf-8")  # Store as a string

        # Update user information
        result = collection.update_one({"_id": user_id}, {"$set": updated_data})

        if result.modified_count > 0:
            # Fetch the updated user data
            updated_user_data = collection.find_one({"_id": user_id})
            
            # Optionally, remove sensitive information before sending the response
            updated_user_data["password"] = None

            # Convert ObjectId to string
            updated_user_data["_id"] = str(updated_user_data["_id"])

            return jsonify({
                "status": "success",
                "message": "User information updated successfully",
                "user": updated_user_data
            })
        else:
            return jsonify({"status": "fail", "message": "No changes were made"})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e), "status": "fail", "message": "User information not updated"})
    
    
#   deleting user   
    
@user_api.route("/deleteUser/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        collection = db["Users"]
        user_id = ObjectId(user_id)

        # Check if the user exists
        if collection.find_one({"_id": user_id}):
            # Delete the user
            collection.delete_one({"_id": user_id})
            return jsonify({"status": "success", "message": "User deleted successfully"})
        else:
            return jsonify({"status": "fail", "message": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail", "message": "Failed to delete user"}), 500
    
    # verify password

@user_api.route("/verify-previous-password", methods=["POST"])
def verify_previous_password():
    try:
        user_id = request.json.get("userId")
        previous_password = request.json.get("previousPassword")

        collection = db["Users"]
        user = collection.find_one({"_id": ObjectId(user_id)})

        if user:
            hashed_password_from_db = user.get("password", None)

            try:
                if bcrypt.checkpw(previous_password.encode("utf-8"), hashed_password_from_db.encode("utf-8")):
                    return jsonify({"message": "Password is correct"}), 200
                else:
                    return jsonify({"message": "Incorrect password"}), 401
            except Exception as e:
                return jsonify({"error": str(e), "message": "An error occurred during password verification"}), 500
        else:
            return jsonify({"status": "fail", "message": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e), "status": "fail", "message": "An error occurred during password verification"}), 500

# add user to newsletter

@user_api.route("/newsletter/add", methods=["POST"])
def add_user_to_newsletter():
    # get email id through request body
    email = request.json.get("email")
    # check if email id exists in newsletter collection
    collection = db["Newsletter"]
    existing_email = collection.find_one({"email": email})
    if existing_email:
        return jsonify({"status": "fail", "message": "Email already exists"})
    else:
        # add email id to newsletter collection
        current_time = datetime.now()
        collection.insert_one({"email": email, "time": current_time})
        return jsonify({"status": "success", "message": "Email added successfully"})
    

@user_api.route("/newsletter/remove", methods=["DELETE"])
def remove_user_from_newsletter():
    # get email id through request body
    email = request.json.get("email")
    # check if email id exists in newsletter collection
    collection = db["Newsletter"]
    existing_email = collection.find_one({"email": email})
    if existing_email:
        # remove email id from newsletter collection
        collection.delete_one({"email": email})
        return jsonify({"status": "success", "message": "Email removed successfully"})
    else:
        return jsonify({"status": "fail", "message": "Email does not exist"})
    

# Define Resources


# class addUser(Resource):
#     """
#     Represents a resource for adding a new user.

#     Methods:
#     - post: Adds a new user to the database.
#     """

#     def post(self):
#         """
#         Add a new user to the database.

#         Returns:
#             A JSON response indicating the status and message of the operation.
#         """
#         collection = db["Users"]
#         try:
            
#             new_user = request.json
#             date_of_birth = new_user.get("date_of_birth")

#             if date_of_birth:
#                 # Convert ISO string to datetime object
#                 date_of_birth = datetime.fromisoformat(date_of_birth)
#                 new_user["date_of_birth"] = date_of_birth

#             # Check if username, email, and phone are unique
#             if collection.find_one({"username": new_user["username"]}):
#                 return jsonify({"status": "fail", "message": "Username already exists"})
#             if collection.find_one({"email": new_user["email"]}):
#                 return jsonify({"status": "fail", "message": "Email already exists"})
#             if collection.find_one({"phone": new_user["phone"]}):
#                 return jsonify({"status": "fail", "message": "Phone already exists"})

#             user = User(**new_user) 
#             try:
                
#                 password = user["password"]
#                 hashed_password = bcrypt.hashpw(
#                     password.encode("utf8"), bcrypt.gensalt()
#                 )
#                 print(hashed_password)
#                 decrypt = bcrypt.checkpw(password.encode("utf8"), hashed_password)
#                 print(decrypt)
#                 user["password"] = hashed_password

#                 collection.insert_one(user.to_mongo().to_dict())
#                 return jsonify(
#                     {"status": "success", "message": "User added successfully"}
#                 )
#             except Exception as e:
#                 return jsonify({"error": str(e)})
#         except Exception as e:
#             return jsonify(
#                 {"error": str(e), "status": "fail", "message": "User not added"}
#             )



class studentData(Resource):
    """
    Represents a resource for retrieving student data.

    This class provides an API endpoint for retrieving student data from the database.

    Methods:
    - get: Retrieves the student data from the database and returns it as a JSON response.
    """

    def get(self):
        """
        Retrieves all users from the database.

        Returns:
            A JSON response containing the list of users.
        """
        collection = db["Users"]
        users = list(collection.find())
        print(users)
        return jsonify(json_util.dumps(users))


class StudentById(Resource):
    """
    Represents a resource for retrieving, deleting, and updating a student by ID.
    """

    def get(self, id):
        """
        Retrieves a student by ID.

        Args:
            id (str): The ID of the student.

        Returns:
            str: If the user is not a student, returns "User is not a student".
            dict: If the user is a student, returns a JSON response with the status and data of the student.
            If an exception occurs, returns a JSON response with the status and error message.
        """

        collection = db["Users"]
        print(id)

        try:
            student = list(collection.find({"_id": ObjectId(id)}))
            if "Student" not in student[0]["roles"]:
                return "User is not a student"
            return jsonify({"status": "success", "data": json_util.dumps(student)})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def delete(self, id):
        """
        Deletes a student by ID.

        Args:
            id (str): The ID of the student.

        Returns:
            str: If the user is not a student, returns "User is not a student".
            dict: If the student is deleted successfully, returns a JSON response with the status and message.
            If an exception occurs, returns a JSON response with the status and error message.
        """

        collection = db["Users"]
        try:
            userData = collection.find_one({"_id": ObjectId(id)})
            if "Student" not in userData["roles"]:
                return "User is not a student"
            collection.delete_one({"_id": ObjectId(id)})
            return jsonify(
                {"status": "success", "message": "Student deleted successfully"}
            )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def put(self, id):
        """
        Updates a student by ID.

        Args:
            id (str): The ID of the student.

        Returns:
            str: If the user is not a student, returns "User is not a student".
            dict: If the student is updated successfully, returns a JSON response with the status and message.
            If an exception occurs, returns a JSON response with the status and error message.
        """

        collection = db["Users"]
        try:
            userData = collection.find_one({"_id": ObjectId(id)})
            if "Student" not in userData["roles"]:
                return "User is not a student"
            collection.update_one({"_id": ObjectId(id)}, {"$set": request.json})
            return jsonify(
                {"status": "success", "message": "Student updated successfully"}
            )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})


class getFollowersList(Resource):
    """
    Represents a resource for retrieving the followers list of a user.

    Methods:
    - get: Retrieves the followers list of a user based on the provided ID.
    """

    def get(self, id):
        """
        Retrieves the followers list of a user based on the provided ID.

        Args:
        - id: The ID of the user.

        Returns:
        - A JSON response containing the status and the followers list of the user.
        """
        collection = db["Users"]
        try:
            userData = collection.find_one({"_id": ObjectId(id)})
            followersList = userData["followers"]
            return jsonify(
                {"status": "success", "data": json_util.dumps(followersList)}
            )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})


class getFollowingList(Resource):
    """
    Represents a resource for retrieving the following list of a user.

    Methods:
    - get: Retrieves the followers list of a user based on the provided ID.
    """

    def get(self, id):
        """
        Retrieves the list of users that the specified user is following.

        Parameters:
        id (str): The ID of the user.

        Returns:
        dict: A JSON response containing the status and the following list.

        Raises:
        Exception: If there is an error while retrieving the following list.
        """
        collection = db["Users"]
        try:
            userData = collection.find_one({"_id": ObjectId(id)})
            followingList = userData["following"]
            return jsonify(
                {"status": "success", "data": json_util.dumps(followingList)}
            )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})


class addFollower(Resource):
    """
    Represents a resource for adding a follower.

    Methods:
    - put: Adds a follower to the specified user.
    """

    def put(self, followerId, followingId):
        """
        Add a follower to a user's following list and a user to a follower's followers list.

        Args:
            followerId (str): The ID of the follower user.
            followingId (str): The ID of the user being followed.

        Returns:
            dict: A JSON response indicating the status and message of the operation.
                - If the follower does not exist, returns {"status": "failed", "message": "Follower does not exist"}.
                - If the user being followed does not exist, returns {"status": "failed", "message": "Following does not exist"}.
                - If the follower already exists in the user's following list, returns {"status": "failed", "message": "Follower already exists"}.
                - If the user already exists in the follower's followers list, returns {"status": "failed", "message": "Following already exists"}.
                - If the follower is successfully added to the user's following list and the user is successfully added to the follower's followers list, returns {"status": "success", "message": "Follower added successfully"}.
                - If any other exception occurs, returns {"status": "failed", "error": <exception message>}.
        """
        collection = db["Users"]
        follower = collection.find_one({"_id": ObjectId(followerId)})
        if follower is None:
            return jsonify({"status": "failed", "message": "Follower does not exist"})
        following = collection.find_one({"_id": ObjectId(followingId)})
        if following is None:
            return jsonify({"status": "failed", "message": "Following does not exist"})
        try:
            if followingId in follower["following"]:
                return jsonify(
                    {"status": "failed", "message": "Follower already exists"}
                )
            if followerId in following["followers"]:
                return jsonify(
                    {"status": "failed", "message": "Following already exists"}
                )
            follower["following"].append(followingId)
            collection.update_one(
                {"_id": ObjectId(followerId)},
                {"$set": {"following": follower["following"]}},
            )
            following["followers"].append(followerId)
            collection.update_one(
                {"_id": ObjectId(followingId)},
                {"$set": {"followers": following["followers"]}},
            )
            return jsonify(
                {"status": "success", "message": "Follower added successfully"}
            )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})


class removeFollower(Resource):
    """
    Represents an API resource for removing a follower.

    Methods:
    - delete: Removes a follower from the specified user.
    """

    def delete(self, followerId, followingId):
        """
        Delete a follower from a user's following list and remove the user from the follower's followers list.

        Args:
            followerId (str): The ID of the follower user.
            followingId (str): The ID of the user being followed.

        Returns:
            dict: A JSON response containing the status and message.

        Raises:
            Exception: If an error occurs during the deletion process.
        """
        collection = db["Users"]
        follower = collection.find_one({"_id": ObjectId(followerId)})
        if follower is None:
            return jsonify({"status": "failed", "message": "Follower does not exist"})
        following = collection.find_one({"_id": ObjectId(followingId)})
        if following is None:
            return jsonify({"status": "failed", "message": "Following does not exist"})
        try:
            if followingId not in follower["following"]:
                return jsonify(
                    {"status": "failed", "message": "Follower does not exist"}
                )
            if followerId not in following["followers"]:
                return jsonify(
                    {"status": "failed", "message": "Following does not exist"}
                )
            follower["following"].remove(followingId)
            collection.update_one(
                {"_id": ObjectId(followerId)},
                {"$set": {"following": follower["following"]}},
            )
            following["followers"].remove(followerId)
            collection.update_one(
                {"_id": ObjectId(followingId)},
                {"$set": {"followers": following["followers"]}},
            )
            return jsonify(
                {"status": "success", "message": "Follower removed successfully"}
            )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})
        

cloudinary.config( 
  cloud_name = "dxhkqc1df", 
  api_key = "871297912786714", 
  api_secret = "uz6w-dcTYc_IaWmkqRPLb0MPeA8",
  
)
class ProfileImage(Resource):
    def post(self,id):
        
        collection=db["Users"]
        file=request.files.get("picture")
        try:
            userData=collection.find_one({"_id":ObjectId(id)})
         
            if(userData):
                if(userData["profile_picture"]!="" and userData["profile_id"]!=""):
                    profile_id=[]
                    profile_id=userData["profile_id"]
                    image_delete_result=cloudinary.api.delete_resources(profile_id)
                    print("done")
                    userData["profile_id"]=""
                    userData["profile_picture"]=""
                    if file:
                      upload_data=cloudinary.uploader.upload(file)
                      userData["profile_picture"]=upload_data["secure_url"]
                      userData["profile_id"]=upload_data["public_id"]
                      collection.update_one({"_id":ObjectId(id)},{"$set":userData})
                      return jsonify(
                        {"status":"success","data":json_util.dumps(userData)}
                      )
                    else:
                        return jsonify(
                            {"status":"failed","message":"Please provide a file"}
                        )



            
                elif file:
                    upload_data=cloudinary.uploader.upload(file)
                    userData["profile_picture"]=upload_data["secure_url"]
                    userData["profile_id"]=upload_data["public_id"]
                    collection.update_one({"_id":ObjectId(id)},{"$set":userData})
                    return jsonify(
                      {"status":"success","data":json_util.dumps(userData)}
                     )
                else:
                   return jsonify({"status": "failed", "error": "No file provided or User is not existed"})


        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

api.add_resource(ProfileImage,"/uploadImage/<id>")
   
# Add Resources to API
# api.add_resource(addUser, "/addUser")
api.add_resource(studentData, "/getUsers")
api.add_resource(StudentById, "/StudentById/<id>")
api.add_resource(getFollowersList, "/getFollowersList/<id>")
api.add_resource(getFollowingList, "/getFollowingList/<id>")
api.add_resource(
    addFollower, "/addFollower/<followerId>/<followingId>", methods=["PUT"]
)
api.add_resource(
    removeFollower, "/removeFollower/<followerId>/<followingId>", methods=["DELETE"]
)


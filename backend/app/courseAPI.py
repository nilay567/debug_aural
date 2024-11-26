from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource
from bson import ObjectId, json_util
from app.__init__ import client
from flask import current_app as app
from app.models import Course
import re

db = client.AuralApp
api = Api(app)
course_api = Blueprint("course_api", __name__)



class getCourse(Resource):
    """
    Represents a resource for retrieving courses.

    Methods:
        - get(self): Retrieves all courses from the database.
    """

    def get(self):
        """
        Retrieves all courses from the database.

        Returns:
            A JSON response containing the courses.
        """
       
        collection = db["Courses"]
        levelCollection=db["CourseLevels"]
        lectureCollection=db["Lectures"]
        assignmentCollection=db["Assignments"]
        courses=collection.find()   
        populated_courses=[]
        populated_levels=[]
        populated_lecture=[]
        populated_assignment=[]     
        for courses in courses:
            for level_id in courses["levels"]:
               level_data=levelCollection.find_one({"_id":ObjectId(level_id)})
               level_data["_id"]=str(level_data["_id"])
               if level_data["lectures"]!=[]:
                  for lecture_id in level_data["lectures"]:
                     lecture_data=lectureCollection.find({"_id":ObjectId(lecture_id)})
                     for lecture_data in lecture_data:
                        if lecture_data["courselevelnumber"]==level_data["levelnumber"]:
                            lecture_data["_id"]=str(lecture_data["_id"])
                            # print(lecture_data)
                            populated_lecture.append(lecture_data)
           
               if level_data["assignments"]!=[]:
                  for assignment_id in level_data["assignments"]:
                     assignment_data=assignmentCollection.find_one({"_id":ObjectId(assignment_id)})
                     assignment_data["_id"]=str(assignment_data["_id"])
                  populated_assignment.append(assignment_data)
               
               level_data["lectures"]=populated_lecture
               level_data["assignments"]=populated_assignment
               populated_levels.append(level_data)
            courses["_id"]=str(courses["_id"])
            courses["levels"]=populated_levels

            populated_courses.append(courses)
            for data in populated_courses:
              data["levels"]=[level for level in data["levels"] if data["name"]==level["name"]]
              for levels in data["levels"]:
                levels["lectures"] = [lecture for lecture in levels["lectures"] if lecture["courselevelnumber"] == levels["levelnumber"] and lecture["name"]==levels["name"]]
        return jsonify({"data":populated_courses})
       
class CourseById(Resource):
    """
    Represents a resource for retrieving, deleting, and updating courses by id.

    Methods:
        - get(self, id): Retrieves a course from the database by id.
        - delete(self, id): Deletes a course from the database by id.
        - put(self, id): Updates a course in the database by id.
    """

    def get(self, id):
        """
        Retrieves a course from the database by id.

        Args:
            id: The id of the course to retrieve.

        Returns:
            A JSON response containing the course.
        """
        collection = db["Courses"]
        print(id)

        try:
            course = list(collection.find({"_id": ObjectId(id)}))
            return jsonify({"status": "success", "data": course})
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def delete(self, id):
        """
        Deletes a course from the database by id.

        Args:
            id: The id of the course to delete.

        Returns:
            A JSON response containing the status of the deletion.
        """
        collection = db["Courses"]
        try:
            collection.delete_one({"_id": ObjectId(id)})
            return jsonify(
                {"status": "success", "message": "Course deleted successfully"}
            )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

    def put(self, id):
        """
        Updates a course in the database by id.

        Args:
            id: The id of the course to update.

        Returns:
            A JSON response containing the status of the update.
        """
        collection = db["Courses"]
        try:
            collection.update_one({"_id": ObjectId(id)}, {"$set": request.json})
            return jsonify(
                {"status": "success", "message": "Course updated successfully"}
            )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})


class getCoursesEnrolledByStudent(Resource):
    """
    Represents a resource for retrieving courses enrolled by student.

    Methods:
        - get(self, id): Retrieves all courses enrolled by student from the database.
    """

    def get(self, id):
        """
        Retrieves all courses enrolled by student from the database.

        Args:
            id: The id of the student.

        Returns:
            A JSON response containing the courses enrolled by student.
        """
        collection = db["Users"]

        try:
            user = list(collection.find({"_id": ObjectId(id)}))
            coursesEnrolled = user[0]["courses"]
            return jsonify(
                {"status": "success", "data": json_util.dumps(coursesEnrolled)}
            )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})

class postCourse(Resource):
    """
    Represents a resource for posting courses.

    Methods:
        - post(self): Posts a course to the database.
    """

    def post(self):
        """
        Posts a course to the database.

        Returns:
            A JSON response containing the status of the post.
        """
        collection = db["Courses"]
        course= request.json
        slugConversion=str(course["name"])
        course["slug"]=slugConversion.lower().replace(" ","-")
        
       
        # adding a new field to the course object
        course["levels"] = []
        course= Course(**course)
        try:
            if(collection.find_one({"name": course.name})):
                return jsonify({"status": "failed", "error": "Course already exists"})
            else:
                collection.insert_one(course.to_mongo().to_dict())
                return jsonify(
                    {"status": "success", "message": "Course posted successfully"}
                )
        except Exception as e:
            return jsonify({"status": "failed", "error": str(e)})


class subscribeCourse(Resource):
    def get(self,courseId,userId):
        collection=db["Users"]

        try:
            userData=collection.find_one({"_id":ObjectId(userId)})
           
            if(courseId not in userData["courses"]):
                courses=userData["courses"]
                courses.append(courseId)
                collection.update_one(
                  {"_id":ObjectId(userId)},{"$set":{"courses":courses}}
                )
                return jsonify(
                  {"status":"success","message":"Course Subscribed successfully"}
                )
            else:
                return jsonify(
                    {"status":"failed","message":"Course already Subscribed"}
                )
        except Exception as e:
            return jsonify({
                
                "status":"failed","error":str(e)
            })
        
class unsubscribeCourse(Resource):
    def get(self,courseId,userId):
        collection=db["Users"]

        try:
            userData=collection.find_one({"_id":ObjectId(userId)})
           

            if(courseId in userData["courses"]):
                courses=userData["courses"]
                courses.remove(courseId)
                collection.update_one(
                    {"_id":ObjectId(userId)},{"$set":{"courses":courses}}
                )
                return jsonify(
                    {"status":"success","message":"Course unsubscribed Successfully"}
                )
            else:
                return jsonify(
                    {"status":"failed","message":"Course was not found"}
                )
        except Exception as e:
            return jsonify(
                {"status":"failed","error":str(e)}
            )

api.add_resource(postCourse, "/postCourse")
api.add_resource(getCourse, "/getCourse")
api.add_resource(CourseById, "/CourseById/<id>")
api.add_resource(getCoursesEnrolledByStudent, "/getCoursesEnrolledByStudent/<id>")
api.add_resource(subscribeCourse,"/subscribeCourse/<courseId>/<userId>")
api.add_resource(unsubscribeCourse,"/unsubscribeCourse/<courseId>/<userId>")

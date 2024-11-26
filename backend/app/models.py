from app.__init__ import db
from pymongo import ASCENDING
from pymongo import ASCENDING


class User(db.Document):
    username = db.StringField(required=True, unique=True)
    email = db.EmailField(required=True, unique=True)
    phone = db.StringField(unique=True)
    password = db.StringField(required=True)
    first_name = db.StringField(required=True)
    last_name = db.StringField()
    date_of_birth = db.DateField(required=True)
    profile_picture = db.StringField(required=True, default="")
    roles_choices = ["Admin", "Student", "Mentor"]
    roles = db.ListField(db.StringField(), required=True, default=["Student"])
    followers = db.ListField(db.StringField(), default=[])
    following = db.ListField(db.StringField(), default=[])
    achievements = db.ListField(db.StringField(), default=[])
    courses = db.ListField(db.StringField(), default=[])
    mentors = db.ListField(db.StringField(), default=[])
    favourites=db.ListField(db.StringField(),default=[])
    profile_id=db.StringField(default="")

    def __repr__(self):
        return f"<User {self.username}>"


class Lecture(db.EmbeddedDocument):
    lecturenumber = db.IntField()
    courselevelnumber = db.IntField()
    name=db.StringField(required=True)
    title = db.StringField(required=True)
    description = db.StringField(required=True)
    videourl = db.URLField(required=True)

    def __repr__(self):
        return f"<Lecture {self.title}>"


class Assignment(db.EmbeddedDocument):
    assignmentnumber = db.IntField()
    courselevelnumber = db.IntField()
    name= db.StringField(required=True)
    question = db.ListField(required=True)
    answer = db.ListField(required=True)

    def __repr__(self):
        return f"<Assignment obj>"


class CourseLevel(db.EmbeddedDocument):
    name=db.StringField(required=True)
    levelnumber = db.IntField()
    title = db.StringField(required=True)
    description = db.StringField(required=True)
    lectures = db.ListField(db.EmbeddedDocumentField("Lecture"), required=True)
    assignments = db.ListField(db.EmbeddedDocumentField("Assignment"), required=True)

    def __repr__(self):
        return f"<CourseLevel {self.levelnumber}>"


class Course(db.Document):
    name = db.StringField(required=True, unique=True)
    description = db.StringField(required=True)
    slug=db.StringField()
    levels = db.ListField(db.EmbeddedDocumentField("CourseLevel"), required=True)

    def __repr__(self):
        return f"<Course {self.name}>"

class Calendy(db.Document):
    user = db.ReferenceField(User)
    apikey = db.StringField(required=True)
    uri = db.StringField(required=False)
    
    def __repr__(self):
        return f"<Calendy {self.user.username}>"
    
class Newsletter(db.Document):
    email = db.EmailField(required=True, unique=True)
    time = db.DateTimeField(required=True)

    def __repr__(self):
        return f"<{self.email}>"
    
class Contact(db.Document):
    username = db.StringField(required=False, blank=True)
    name = db.StringField(required=False, blank=True)
    email = db.EmailField(required=True)
    message = db.StringField(required=True)
    time = db.DateTimeField(required=True)

    def __repr__(self):
        return f"<{self.email}>"


# class UserProgress_Level(db.EmbeddedDocument):
#     level = db.ReferenceField("CourseLevel")
#     lecture = db.BooleanField(default=False, required=True)
#     assignment = db.BooleanField(default=False, required=True)

# class UserProgress_Course(db.EmbeddedDocument):
#     course = db.ReferenceField(Course)
#     completed = db.BooleanField(default=False, required=True)
#     exam= db.BooleanField(default=False, required=True)
#     completions = db.EmbeddedDocumentListField(UserProgress_Level)

# class UserProgress(db.Document):
#     courses = db.EmbeddedDocumentListField(UserProgress_Course)
#     user = db.ReferenceField(User)

#     def __repr__(self):
#         return f'<UserProgress {self.user.username}>'

# class Achievements(db.Document):
#     name = db.StringField(required = True)
#     description = db.StringField(required = True)
#     points = db.IntegerField(required = True)
#     image = db.StringField()

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);

  const [userid, setUserid] = useState("");

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("AuralApp")).data;
    console.log(data) 
  }, []);

  useEffect(() => {
    axios.get("http://127.0.0.1:5001/StudentById/")
  }, []);



  const [showUser, setShowUser] = useState(false);
  const [showCourse, setShowCourse] = useState(false);

  const showUserHandler = () => {
    setShowUser(true);
    setShowCourse(false);
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const hoverVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const [username, setUsername] = React.useState("");

  const deleteUser = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (shouldDelete) {
      axios
        .delete(
          "http://127.0.0.1:5001/userWithUserNameByAdmin/" +
            username +
            "/" +
            userid
        )
        .then((response) => {})
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    } else {
      alert("User not deleted");
    }
  };

  const [createCourse, setCreateCourse] = useState(false);
  const [updateCourse, setUpdateCourse] = useState(false);
  const [deleteCourse, setDeleteCourse] = useState(false);

  const [createCourses, setCreateCourses] = useState(false);
  const [createCourseLevel, setCreateCourseLevel] = useState(false);
  const [createLecture, setCreateLecture] = useState(false);
  const [createAssignment, setCreateAssignment] = useState(false);

  const handleCreateCourse = () => {
    setCreateCourse(true);
    setUpdateCourse(false);
    setDeleteCourse(false);
  };

  const handleUpdateCourse = () => {
    setCreateCourse(false);
    setUpdateCourse(true);
    setDeleteCourse(false);

    setCreateCourses(false);
    setCreateCourseLevel(false);
    setCreateLecture(false);
    setCreateAssignment(false);
  };

  const handleDeleteCourse = () => {
    setCreateCourse(false);
    setUpdateCourse(false);
    setDeleteCourse(true);

    setCreateCourses(false);
    setCreateCourseLevel(false);
    setCreateLecture(false);
    setCreateAssignment(false);
  };

  const handleCreateCourses = () => {
    setCreateCourses(true);
    setCreateCourseLevel(false);
    setCreateLecture(false);
    setCreateAssignment(false);
  };

  const handleCreateCourselevel = () => {
    setCreateCourses(false);
    setCreateCourseLevel(true);
    setCreateLecture(false);
    setCreateAssignment(false);
  };

  const handleCreateLecture = () => {
    setCreateCourses(false);
    setCreateCourseLevel(false);
    setCreateLecture(true);
    setCreateAssignment(false);
  };

  const handleCreateAssignment = () => {
    setCreateCourses(false);
    setCreateCourseLevel(false);
    setCreateLecture(false);
    setCreateAssignment(true);
  };

  const [newCourseForm, setnewCourseForm] = useState({
    name: "",
    description: "",
    levels: [],
  });

  const handleChangeForCourse = (e) => {
    const { name, value } = e.target;
    setnewCourseForm({
      ...newCourseForm,
      [name]: value,
    });
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5001/postCourse", newCourseForm)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [courseLevelForm, setCourseLevelForm] = useState({
    levelnumber: "",
    name: "",
    title: "",
    description: "",
  });

  const handleCourseLevelSubmit = (e) => {
    e.preventDefault();
    console.log(courseLevelForm);
    axios
      .post("http://127.0.0.1:5001/courselevel", courseLevelForm)
      .then((response) => {
        console.log(response);
      });
  };

  const handleChangeCourseLevel = (e) => {
    const { name, value } = e.target;
    setCourseLevelForm({
      ...courseLevelForm,
      [name]: value,
    });
  };

  const [lectureForm, setLectureForm] = useState({
    lecturenumber: "",
    courselevelnumber: "",
    name: "",
    title: "",
    description: "",
    videourl: "",
  });

  const handleChangeLecture = (e) => {
    const { name, value } = e.target;
    setLectureForm({
      ...lectureForm,
      [name]: value,
    });
  };

  const handleLectureSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5001/addLecture", lectureForm)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      {isAdmin && (
        <div className="flex justify-evenly mt-16">
          <button
            className="border-2 border-black p-2 m-3 rounded-md shadow-md"
            onClick={showUserHandler}
          >
            User
          </button>
          <button
            className="border-2 border-black p-2 m-3 rounded-md shadow-md"
            onClick={() => {
              setShowCourse(true);
              setShowUser(false);
            }}
          >
            Course
          </button>
        </div>
      )}
      <div>
        {showUser && (
          <div id="user">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex justify-center items-center"
            >
              <motion.div
                className="bg-white p-8 rounded-lg shadow-lg w-96 m-5"
                variants={hoverVariants}
              >
                <div>
                  <input
                    type="text"
                    placeholder="Enter User Details"
                    className="w-full border-2 border-gray-500 p-2 rounded-md"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="flex mt-4">
                  <motion.button
                    className="flex-1 m-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                    whileHover={{ backgroundColor: "#3182ce" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    className="flex-1 m-2 bg-red-500 text-white py-2 px-4 rounded-lg"
                    whileHover={{ backgroundColor: "#e53e3e" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={deleteUser}
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
        {showCourse && (
          <div id="course">
            <div className="flex">
              <div className="flex flex-col justify-start w-52">
                <button
                  className="m-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
                  onClick={handleCreateCourse}
                >
                  Create
                </button>
                <button
                  className="m-2 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:opacity-80"
                  onClick={handleUpdateCourse}
                >
                  Update
                </button>
                <button
                  className="m-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
                  onClick={handleDeleteCourse}
                >
                  Delete
                </button>
              </div>
              <div className="flex flex-col">
                {createCourse && (
                  <div className="flex flex-col">
                    <button
                      className="m-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
                      onClick={handleCreateCourses}
                    >
                      Course
                    </button>
                    <button
                      className="m-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
                      onClick={handleCreateCourselevel}
                    >
                      Course Level
                    </button>
                    <button
                      className="m-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
                      onClick={handleCreateLecture}
                    >
                      Lecture
                    </button>
                    <button
                      className="m-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:opacity-80"
                      onClick={handleCreateAssignment}
                    >
                      Assignment
                    </button>
                  </div>
                )}
              </div>

              {createCourses && (
                <div>
                  <form action="">
                    <div className="flex flex-col justify-center items-center border-2 border-black w-full p-7 m-10 rounded-lg shadow-xl">
                      <input
                        type="text"
                        className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                        placeholder="enter course name"
                        name="name"
                        onChange={handleChangeForCourse}
                        value={newCourseForm.name}
                      />
                      <textarea
                        type="text"
                        className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                        placeholder="enter description of course"
                        name="description"
                        onChange={handleChangeForCourse}
                        value={newCourseForm.description}
                      />
                      <button
                        className="m-3 w-40 items-center border-2 border-gray-500 py-2 px-4 rounded-lg hover:opacity-80"
                        onClick={handleCourseSubmit}
                      >
                        save
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {createCourseLevel && (
                <div>
                  <form action="" onSubmit={handleCourseLevelSubmit}>
                    <div className="flex flex-col justify-center items-center border-2 border-black w-full p-7 m-10 rounded-lg shadow-xl">
                      <input
                        type="text"
                        className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                        placeholder="enter level number"
                        name="levelnumber"
                        onChange={handleChangeCourseLevel}
                        value={courseLevelForm.levelnumber}
                      />
                      <input
                        type="text"
                        className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                        placeholder="enter course name"
                        name="name"
                        onChange={handleChangeCourseLevel}
                        value={courseLevelForm.name}
                      />
                      <input
                        type="text"
                        className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                        placeholder="enter title of course level"
                        name="title"
                        onChange={handleChangeCourseLevel}
                        value={courseLevelForm.title}
                      />
                      <textarea
                        type="text"
                        className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                        placeholder="enter description of course"
                        name="description"
                        onChange={handleChangeCourseLevel}
                        value={courseLevelForm.description}
                      />
                      <button
                        className="m-3 w-40 items-center border-2 border-gray-500 py-2 px-4 rounded-lg hover:opacity-80"
                        onClick={handleCourseLevelSubmit}
                      >
                        save
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {createLecture && (
                <div>
                  <form action="">
                    <div className="flex flex-col justify-center items-center border-2 border-black w-full p-7 m-10 rounded-lg shadow-xl">
                      <input
                        type="text"
                        className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                        placeholder="enter lecture number"
                        name="lecturenumber"
                        onChange={handleChangeLecture}
                        value={lectureForm.lecturenumber}
                      />
                      <input
                        type="text"
                        className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                        placeholder="enter course level number"
                        name="courselevelnumber"
                        onChange={handleChangeLecture}
                        value={lectureForm.courselevelnumber}
                      />
                      <input
                        type="text"
                        className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                        placeholder="enter course name"
                        name="name"
                        onChange={handleChangeLecture}
                        value={lectureForm.name}
                      />
                      <input
                        type="text"
                        className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                        placeholder="enter title of the lecture"
                        name="title"
                        onChange={handleChangeLecture}
                        value={lectureForm.title}
                      />
                      <textarea
                        type="text"
                        className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                        placeholder="enter description of the lecture"
                        name="description"
                        onChange={handleChangeLecture}
                        value={lectureForm.description}
                      />
                      <input
                        type="text"
                        className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                        placeholder="enter video url"
                        name="videourl"
                        onChange={handleChangeLecture}
                        value={lectureForm.video}
                      />
                      <button
                        className="m-3 w-40 items-center border-2 border-gray-500 py-2 px-4 rounded-lg hover:opacity-80"
                        onClick={handleLectureSubmit}
                      >
                        save
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {createAssignment && (
                <div>
                  <form action="">
                    <div className="flex flex-col justify-center items-center border-2 border-black w-full p-7 m-10 rounded-lg shadow-xl">
                      <input
                        type="text"
                        className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                        placeholder="enter assignment number"
                      />
                      <input
                        type="text"
                        className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                        placeholder="enter course level number"
                      />
                      <input
                        type="text"
                        className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                        placeholder="enter course name"
                      />

                      <div className="flex justify-center border-2 border-black m-2">
                        <textarea
                          type="text"
                          className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                          placeholder="enter question"
                        />
                        <input
                          type="text"
                          className=" w-full border-2 border-gray-500 p-3 rounded-md m-2"
                          placeholder="enter answer"
                        />
                      </div>
                      <button className="m-3 w-40 items-center border-2 border-gray-500 py-2 px-4 rounded-lg hover:opacity-80">
                        Add Question
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="flex justify-center">
                {deleteCourse && (
                  <div className="flex flex-col justify-center items-center border-2 border-black w-full p-7 m-10 rounded-lg shadow-xl">
                    <input
                      type="text"
                      className=" w-full border-2 border-gray-500 p-3 rounded-md"
                      placeholder="enter course name to delete"
                    />
                    <button className="m-3 w-40 items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:opacity-80">
                      delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

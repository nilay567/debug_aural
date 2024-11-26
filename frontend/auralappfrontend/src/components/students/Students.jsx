import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import defaultprofile from '../../assets/defaultProfile.png';
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([])
  const [isMentor,setIsMentor]=useState(false);

  

  const data = localStorage.getItem('AuralApp');
  const data1 = JSON.parse(data);
  
  const userId = data1.data;

  

  const check=async()=>{
  const details=await axios.get(`${url}/MentorById/${userId}`)
  const details1=JSON.parse(details.data.data)
  console.log(details1)
  if(details1[0].roles && details1[0].roles.includes('Mentor')){
     setIsMentor(true);
  }else{
    setIsMentor(false);
  }
  }

  
  const url = "http://localhost:5001";
  const fetchData = async () => {
    console.log(userId)
    const data = await axios.get(`${url}/StudentsOfMentor/${userId}`);
    const data1 = JSON.parse(data.data.data)
    setStudents(data1)
    console.log(data1);
   
  };
  useEffect(() => {
    check();
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  

  const [student, setStudent] = useState(null);
  const [pop, setPop] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");
  // const [newTask, setNewTask] = useState(" ");
  // const [newTaskDesc, setNewTaskDesc] = useState(" ");
  // const [selectedStudents, setSelectedStudents] = useState([]);

  const openPopup = (e) => {
    setStudent(e);
  };

  const openPopup2 = () => {
    setPop(true);
  };

  const closePopup = () => {
    setStudent(null);
  };

  const handleSearch = (e) => {
    const search = e.target.value
    const searchstu = [];

    students.map((stu) => {
      if (search !== "") {
        if (stu.first_name.toLowerCase().includes(search.toLowerCase())) {
          searchstu.push(stu);
        }
      }

    })
    setStudentSearch(searchstu)

  }

  // const closePopup2 = () => {
  //   setPop(null);
  // };

  // const addTask = (student) => {
  //   if (newTask.trim() === "" || newTaskDesc.trim() === "") {
  //     alert("Task name or task description cannot be empty.");
  //     return;
  //   }
  //   const newId = Math.max(...student.tasks.map((task) => task.taskId), 0) + 1;

  //   const stunewTask = {
  //     taskId: newId,
  //     task: newTask,
  //     taskDescription: newTaskDesc,
  //     completed: false,
  //   };

  //   const updatedStudents = students.map((stu) => {
  //     if (stu.id === student.id) {
  //       return {
  //         ...stu,
  //         tasks: [...stu.tasks, stunewTask],
  //       };
  //     }
  //     return stu;
  //   });

  //   setStudents(updatedStudents);
  // };

  // const checkBoxChange = (id) => {
  //   if (selectedStudents.includes(id)) {
  //     const updatedSelectedStudents = selectedStudents.filter(
  //       (selectedId) => selectedId !== id
  //     );
  //     setSelectedStudents(updatedSelectedStudents);
  //     console.log(selectedStudents);
  //   } else {
  //     const update = [...selectedStudents, id];
  //     setSelectedStudents(update);
  //     console.log(selectedStudents);
  //   }
  // };

  // const addMultiTask = () => {
  //   const updatedStudents = students.map((student) => {
  //     if (selectedStudents.includes(student.id)) {
  //       const stuNewTask = {
  //         taskId: 123,
  //         task: newTask,
  //         taskDescription: newTaskDesc,
  //         completed: false,
  //       };
  //       const updatedTasks = [...student.tasks, stuNewTask];

  //       return { ...student, tasks: updatedTasks };
  //     }

  //     return student;
  //   });

  //   setStudents(updatedStudents);
  // };

  return ( 
    <>
    {isMentor && ( 
    <div className="bg-gray-100 h-screen p-8 mt-10">
      <div className="flex flex-row items-center justify-between p-4">
        <motion.button
          className="bg-blue-900 border border-black px-8 py-3 text-white 
             font-semibold"
          whileHover={{ scale: 1.1 }}
          onClick={openPopup2}
        >
          Assign Task
        </motion.button>


        <div className="border-2 border-black flex-shrink">
          <input
            type="search"
            placeholder="Search Students"
            className="w-60 h-8 px-2 py-1"
            onChange={handleSearch}
          />
        </div>
      </div>

      <h1 className="text-5xl font-bold mt-3">Filtered Students</h1>
      <div className="flex flex-row items-center justify-between mx-4 mt-10">
        {studentSearch !== "" && studentSearch.map((student, index) => (
          <motion.div
            key={index}
            className="bg-blue-200 p-4 rounded-md shadow-md max-w-xs mr-4 mb-8"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-row justify-center text-lg font-bold text-blue-800 mb-2">
              {student.first_name + " "}
              {student.last_name}
            </div>
            {<img className='w-full h-40 mb-3' src={defaultprofile} />}
            <div className="text-indigo-600 text-xs mb-4">
              UserName: {student.username}
            </div>
            <ul className="flex flex-wrap mb-4">
              
              {student.roles.map((tag, index) => (
                <li key={index} className="text-indigo-600 text-xs mb-1 mr-2">
                  {tag}
                </li>
              ))}
            </ul>

            <div className="flex flex-row justify-between">
              <motion.button
                className="bg-blue-900 text-white px-10 py-2 mr-2 rounded-md text-sm flex-shrink-0 transition-transform"
                whileHover={{ scale: 1.1 }}
                onClick={() => openPopup(student)}
              >
                Profile
              </motion.button>

              <motion.button
                className="bg-blue-900 text-white px-10 py-2 mr-2 rounded-md text-sm flex-shrink-0 transition-transform"
                whileHover={{ scale: 1.1 }}
              >
                Tasks
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <h1 className="text-5xl font-bold mt-3">All Students</h1>
      <div className="flex flex-row items-center justify-between mx-4 mt-10">
        {students.map((student, index) => (
          <motion.div
            key={index}
            className="bg-blue-200 p-4 rounded-md shadow-md max-w-xs mr-4 mb-8"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-row justify-center text-lg font-bold text-blue-800 mb-2">
              {student.first_name + " "}
              {student.last_name}
            </div>
            {<img className='w-full h-40 mb-3' src={defaultprofile} />}
            <div className="text-indigo-600 text-xs mb-4">
              UserName: {student.username}
            </div>
            <ul className="flex flex-wrap mb-4">
              
              {student.roles.map((tag, index) => (
                <li key={index} className="text-indigo-600 text-xs mb-1 mr-2">
                  {tag}
                </li>
              ))}
            </ul>

            <div className="flex space-x-2">
              <motion.button
                className="bg-blue-900 text-white px-10 py-2 mr-2 rounded-md text-sm flex-shrink-0 transition-transform"
                whileHover={{ scale: 1.1 }}
                onClick={() => openPopup(student)}
              >
                Profile
              </motion.button>

              <motion.button
                className="bg-blue-900 text-white px-10 py-2 mr-2 rounded-md text-sm flex-shrink-0 transition-transform"
                whileHover={{ scale: 1.1 }}
              >
                Tasks
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {student && (
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-8 rounded-md shadow-md max-w-2xl"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
          >
            <div className="flex justify-end">
              <motion.button
                className="text-gray-700 text-sm transition-transform border border-gray-700 rounded-full w-6 h-6 flex items-center justify-center m-2"
                whileHover={{ scale: 1.1 }}
                onClick={closePopup}
              >
                X
              </motion.button>
            </div>
            <div className='flex flex-row'>
              <div>
                <img
                  className="w-full h-40 mb-4 object-cover rounded p-3 h-60 w-40"
                  src={defaultprofile}
                  alt={student.first_name}
                />
              </div>
              <div className='m-3'>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Hi, I am {student.first_name}</h2>
                <p className="text-gray-700 mb-4 text-sm">{student.summary}</p>
                <ul className="flex flex-wrap mb-4">
                  {student.roles.map((tag, index) => (
                    <li key={index} className="text-indigo-600 text-xs mr-2 mb-2">{tag}</li>
                  ))}
                </ul>
                <p>Followers: {student.followers.length}</p>
                <p>Following: {student.following.length}</p>
                <p className="text-gray-700 mb-4 text-sm">{student.email}</p>
              </div>
            </div>

            {/* achievements */}
            <div className='flex flex-row'>
              {student.achievements && student.achievements.length > 0 && (
                <div className='m-3'>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Achievements</h2>
                  {student.achievements.map((achievement, index) => (
                    <p className="text-gray-700 mb-4 text-sm" key={index}>{achievement}</p>
                  ))}
                </div>
              )}
            </div>


          </motion.div>
        </motion.div>
      )}

      {/* {student && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white p-4 rounded-md shadow-md mt-20"
          >
            <div className="flex justify-end ">
              <motion.button
                className="text-gray-700 text-sm transition-transform border border-gray-700 rounded-full w-6 h-6 flex items-center justify-center m-2
                        "
                whileHover={{ scale: 1.1 }}
                onClick={closePopup}
              >
                X
              </motion.button>
            </div>

            <h3 className="text-xl font-bold mb-4">Current Tasks</h3>
            {student.tasks.map((task, index) => (
              <div key={index} className="mb-4">
                <div className="mb-2">
                  <span className="mr-4">{index + 1}.</span>
                  <span className="font-bold">Task:</span> {task.task}
                </div>
                <div className="mb-2">
                  <span className="font-bold ml-6">Task Description:</span>{" "}
                  {task.taskDescription}
                </div>
                <div className="flex items-center">
                  <span className="mr-2 font-bold ml-6">Completed:</span>
                  {task.completed ? (
                    <span className="text-green-500 ">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-col mt-5 border-2 border-black">
              <h4 className="text-lg font-bold mb-2 pl-2">Assign Task</h4>
              <div className="flex flex-row  ml-2 mt-2 mb-3">
                <label className="font-bold text-sm mr-3">Name of task</label>
                <input
                  className="border px-1 flex items justify-center"
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
              </div>

              <div className="flex flex-col ml-2 mt-2 mb-3">
                <label className="font-bold text-sm mr-3 ">
                  Description of Task
                </label>
                <textarea
                  className="border px-1 mt-1 w-60 h-20"
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                />
              </div>

              <motion.button
                className="bg-blue-600 text-white text- text-sm px-4 py-2 mb-1 ml-auto mr-2 w-max"
                onClick={() => addTask(student)}
                whileHover={{ scale: 1.1 }}
              >
                Assign
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )} */}

      {/* {pop && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-gray-200 p-4 rounded-md shadow-md"
          >
            <div className="flex justify-end">
              <motion.button
                className="text-gray-700 text-sm transition-transform border border-gray-700 rounded-full w-6 h-6 flex items-center justify-center m-2"
                whileHover={{ scale: 1.1 }}
                onClick={closePopup2}
              >
                X
              </motion.button>
            </div>

            <div className="flex flex-col">
              <h4 className="text-lg font-bold mb-2 pl-2">Assign Task</h4>
              <div className="flex flex-row  ml-2 mt-2 mb-3">
                <label className="font-bold text-sm mr-3">Name of task</label>
                <input
                  className="border px-1 flex items justify-center"
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
              </div>

              <div className="flex flex-col ml-2 mt-2 mb-3">
                <label className="font-bold text-sm mr-3 ">
                  Description of Task
                </label>
                <textarea
                  className="border px-1 mt-1 w-60 h-20"
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                />
              </div>

              <div className="flex flex-col ml-2 mt-2 mb-3">
                <label className="font-bold text-sm mr-3">
                  Assign to Students:
                </label>

                {students.map((student) => (
                  <div key={student.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => checkBoxChange(student.id)}
                    />
                    <span className="ml-2">{student.name}</span>
                  </div>
                ))}

                <motion.button
                  className="bg-blue-600 text-white text- text-sm px-4 py-2 mb-1 ml-auto mr-2 w-max"
                  onClick={addMultiTask}
                  whileHover={{ scale: 1.1 }}
                >
                  Assign
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )} */}
    </div>
    )}
    </>
  );
};

export default Students;

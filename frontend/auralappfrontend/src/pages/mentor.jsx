import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import defaultprofile from "../assets/defaultProfile.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faComment } from "@fortawesome/free-solid-svg-icons";
import "../style/global.css";
const Mentor = () => {
  const [subscribedMentors, setSubscribedMentors] = useState([]);
  
   const navigate=useNavigate();

   const handleClick=()=>{
      navigate('/calendar')
   }
  
  useEffect(() => {
 
    let userid = JSON.parse(localStorage.getItem("AuralApp"));

    if (userid) {
      userid = userid.data;
      axios
        .get("http://127.0.0.1:5001/StudentById/" + userid)
        .then(async (res) => {
          let response = res.data.data;
          const userData = response.slice(1, -1);

          const user = JSON.parse(userData);
          const mentors = user.mentors;
          const requests = mentors.map((mentorId) =>
            axios.get("http://127.0.0.1:5001/MentorById/" + mentorId)
          );

          Promise.all(requests)
            .then((responses) => {
              const submentors = responses.map((res) => {
                let response = res.data.data;
                const userData = response.slice(1, -1);
                return JSON.parse(userData);
              });
              setSubscribedMentors(submentors);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }
  }, []);

  const [allMentors, setAllMentors] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5001/getMentor")
      .then(async (res) => {
        setAllMentors(JSON.parse(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [selectedMentor, setSelectedMentor] = useState(null);

  const openModal = (mentor) => {
    setSelectedMentor(mentor);
  };

  const closeModal = () => {
    setSelectedMentor(null);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        closeModal();
        closeSubscribeModal();
        closeUnSubscribeModal();
      }
    };

   

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSubscribe = (mentor) => {
    const mentorId = mentor._id.$oid;
    console.log(mentorId);

    let id = JSON.parse(localStorage.getItem("AuralApp")).data;
    console.log(id);
    axios
      .post("http://127.0.0.1:5001/subscribe/" + mentorId + "/" + id)
      .then(async (res) => {
        const msg = res.data.message;
        if (msg === "Student subscribed successfully") {
          alert("Subscribed Successfully");
          window.location.reload(true);
        }
        if (msg === "Student already subscribed") {
          alert("Already Subscribed");
        }
        if (msg === "Student cannot subscribe to self") {
          alert("You cannot subscribe to yourself");
        }
      });
  };

  const [modalContent, setModalContent] = useState(null);

  const closeSubscribeModal = () => {
    setModalContent(null);
  };
  const openSubscribeModal = (mentor) => {
    setModalContent(
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-md shadow-md max-w-xs opacity-0 animate-fade-in opacity-100">
          <p className="p-2 m-4">Confirm your subscription</p>
          <div className="flex justify-evenly">
            <button
              onClick={closeSubscribeModal}
              className="border-1 border-black"
            >
              Cancel
            </button>
            <button
              className="bg-blue-900 text-white px-3 py-2 rounded-md text-sm flex-shrink-0 transition-transform"
              onClick={() => {
                handleSubscribe(mentor);
                closeSubscribeModal();
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    );
  };

  const closeUnSubscribeModal = () => {
    setModalContent(null);
  };

  const openUnSubscribeModal = (mentor) => {
    setModalContent(
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-md shadow-md max-w-xs opacity-0 animate-fade-in opacity-100 w-1/2">
          <p className="p-2 m-4">Confirm your unsubscription</p>
          <div className="flex justify-evenly">
            <button
              onClick={closeSubscribeModal}
              className="border-1 border-black"
            >
              Cancel
            </button>
            <button
              className="bg-blue-900 text-white px-3 py-2 rounded-md text-sm flex-shrink-0 transition-transform"
              onClick={() => {
                handleUnSubscribe(mentor);
                closeSubscribeModal();
              }}
            >
              UnSubscribe
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleUnSubscribe = (mentor) => {
    const mentorId = mentor._id.$oid;
    let id = JSON.parse(localStorage.getItem("AuralApp")).data;
    axios
      .post("http://127.0.0.1:5001/unSubscribe/" + mentorId + "/" + id)
      .then(async (res) => {
        const msg = res.data.message;
        if (msg === "Student unsubscribed successfully") {
          alert("UnSubscribed Successfully");
          window.location.reload(true);
        }
        if (msg === "Student not subscribed") {
          alert("Not Subscribed");
        }
      });
  };

  const [mentorSearch, setMentorSearch] = useState("");

  const handleSearch = (event) => {
    const search = event.target.value;
    let mentors = [];
    allMentors.map((mentor) => {
      if (search !== "") {
        if (mentor.first_name.toLowerCase().includes(search.toLowerCase())) {
          mentors.push(mentor);
        }
      }
    });
    setMentorSearch(mentors);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 mt-16">
      <div className="flex justify-center">
        <input
          type="search"
          placeholder="Search Mentors"
          className="p-3 m-2 w-1/4 border-2 border-gray-5 rounded-3xl"
          onChange={handleSearch}
        />
      </div>
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Filtered Mentor's
      </h1>
      <div className="flex flex-wrap -mx-2 md:-mx-4">
        {mentorSearch !== "" &&
          mentorSearch.map((mentor, index) => (
            <motion.div
              key={index}
              className="bg-blue-200 p-2 md:p-4 rounded-md shadow-md max-w-xs mx-2 md:mx-4 mb-4 md:mb-8"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-row justify-around">
                <h2 className="text-lg font-bold mb-2 text-blue-800">
                  {mentor.first_name + " "}
                  {mentor.last_name}
                </h2>
              </div>
              <img
                className="w-full h-40 mb-4 object-cover rounded"
                src={defaultprofile}
                alt={mentor.first_name}
              />
              {/* username */}
              <p className="text-indigo-600 text-xs mb-4">
                UserName : {mentor.username}
              </p>
              <ul className="flex flex-wrap mb-4">
                {mentor.roles.map((tag, index) => (
                  <li key={index} className="text-indigo-600 text-xs mr-2 mb-2">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="flex justify-center justify-evenly space-x-2">
                {!subscribedMentors.find(
                  (subscribedMentor) =>
                    subscribedMentor._id.$oid === mentor._id.$oid
                ) && (
                  <>
                    <motion.button
                      className="bg-blue-900 text-white px-3 py-2 rounded-md text-sm flex-shrink-0 transition-transform"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => openSubscribeModal(mentor)}
                    >
                      Subscribe
                    </motion.button>
                  </>
                )}

                {subscribedMentors.find(
                  (subscribedMentor) =>
                    subscribedMentor._id.$oid === mentor._id.$oid
                ) && (
                  <>
                    <motion.button whileHover={{ scale: 1.25 }}>
                      <FontAwesomeIcon
                        icon={faVideo}
                        style={{ color: "#001a3d" }}
                      />
                    </motion.button>
                  </>
                )}
                <motion.button
                  className="bg-blue-900 text-white px-3 py-2 rounded-md text-sm flex-shrink-0 transition-transform"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => openModal(mentor)}
                >
                  Complete Profile
                </motion.button>
                {subscribedMentors.find(
                  (subscribedMentor) =>
                    subscribedMentor._id.$oid === mentor._id.$oid
                ) && (
                  <>
                    <motion.button whileHover={{ scale: 1.25 }}>
                      <FontAwesomeIcon
                        icon={faComment}
                        style={{ color: "#001a3d" }}
                      />
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
      </div>
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Subscribed Mentor's
      </h1>
      <div className="flex flex-wrap -mx-2 md:-mx-4">
        {subscribedMentors.map((mentor, index) => (
          <motion.div
            key={index}
            className="bg-blue-200 p-2 md:p-4 rounded-md shadow-md max-w-xs mx-2 md:mx-4 mb-4 md:mb-8"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-row justify-around">
              <h2 className="text-lg font-bold mb-2 text-blue-800">
                {mentor.first_name + " "}
                {mentor.last_name}
              </h2>
            </div>
            <img
              className="w-full h-40 mb-4 object-cover rounded"
              src={defaultprofile}
              alt={mentor.first_name}
            />
            <p className="text-indigo-600 text-xs mb-4">
              UserName : {mentor.username}
            </p>
            <ul className="flex flex-wrap mb-4">
              {mentor.roles.map((tag, index) => (
                <li key={index} className="text-indigo-600 text-xs mr-2 mb-2">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="flex justify-evenly">
              <motion.button whileHover={{ scale: 1.25 }} onClick={handleClick} >
                <FontAwesomeIcon icon={faVideo} style={{ color: "#001a3d" }} />
              </motion.button>

              <motion.button
                className="bg-blue-900 text-white px-3 py-2 rounded-md text-sm flex-shrink-0 transition-transform"
                whileHover={{ scale: 1.05 }}
                onClick={() => openModal(mentor)}
              >
                Complete Profile
              </motion.button>

              <motion.button whileHover={{ scale: 1.25 }}>
                <FontAwesomeIcon
                  icon={faComment}
                  style={{ color: "#001a3d" }}
                />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <h1 className="text-4xl font-bold mb-8 text-gray-800">All Mentor's</h1>
      <div className="flex flex-wrap -mx-4">
        {allMentors.map((mentor, index) => (
          <motion.div
            key={index}
            className="bg-blue-200 p-4 rounded-md shadow-md max-w-xs mx-4 mb-8"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-row justify-around">
              <h2 className="text-lg font-bold mb-2 text-blue-800">
                {mentor.first_name + " "}
                {mentor.last_name}
              </h2>
            </div>
            <img
              className="w-full h-40 mb-4 object-cover rounded"
              src={defaultprofile}
              alt={mentor.first_name}
            />
            {/* username */}
            <p className="text-indigo-600 text-xs mb-4">
              UserName : {mentor.username}
            </p>
            <ul className="flex flex-wrap mb-4">
              {mentor.roles.map((tag, index) => (
                <li key={index} className="text-indigo-600 text-xs mr-2 mb-2">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="flex justify-center justify-evenly space-x-2">
              {!subscribedMentors.find(
                (subscribedMentor) =>
                  subscribedMentor._id.$oid === mentor._id.$oid
              ) && (
                <>
                  <motion.button
                    className="bg-blue-900 text-white px-3 py-2 rounded-md text-sm flex-shrink-0 transition-transform"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => openSubscribeModal(mentor)}
                  >
                    Subscribe
                  </motion.button>
                </>
              )}

              {subscribedMentors.find(
                (subscribedMentor) =>
                  subscribedMentor._id.$oid === mentor._id.$oid
              ) && (
                <>
                  <motion.button whileHover={{ scale: 1.25 }}>
                    <FontAwesomeIcon
                      icon={faVideo}
                      style={{ color: "#001a3d" }}
                    />
                  </motion.button>
                </>
              )}
              <motion.button
                className="bg-blue-900 text-white px-3 py-2 rounded-md text-sm flex-shrink-0 transition-transform"
                whileHover={{ scale: 1.05 }}
                onClick={() => openModal(mentor)}
              >
                Complete Profile
              </motion.button>
              {subscribedMentors.find(
                (subscribedMentor) =>
                  subscribedMentor._id.$oid === mentor._id.$oid
              ) && (
                <>
                  <motion.button whileHover={{ scale: 1.25 }}>
                    <FontAwesomeIcon
                      icon={faComment}
                      style={{ color: "#001a3d" }}
                    />
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {selectedMentor && (
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
                onClick={closeModal}
              >
                X
              </motion.button>
            </div>
            <div className="flex flex-row">
              <div>
                <img
                  className="w-full h-40 mb-4 object-cover rounded p-3 h-60 w-40"
                  src={defaultprofile}
                  alt={selectedMentor.first_name}
                />
              </div>
              <div className="m-3">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Hi, I am {selectedMentor.first_name}
                </h2>
                <p className="text-gray-700 mb-4 text-sm">
                  {selectedMentor.summary}
                </p>
                <ul className="flex flex-wrap mb-4">
                  {selectedMentor.roles.map((tag, index) => (
                    <li
                      key={index}
                      className="text-indigo-600 text-xs mr-2 mb-2"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <p>Followers: {selectedMentor.followers.length}</p>
                <p>Following: {selectedMentor.following.length}</p>
                <p className="text-gray-700 mb-4 text-sm">
                  {selectedMentor.email}
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              {selectedMentor.achievements &&
                selectedMentor.achievements.length > 0 && (
                  <div className="m-3">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                      Achievements
                    </h2>
                    {selectedMentor.achievements.map((achievement, index) => (
                      <p className="text-gray-700 mb-4 text-sm" key={index}>
                        {achievement}
                      </p>
                    ))}
                  </div>
                )}
            </div>
            {(subscribedMentors.includes(selectedMentor) ||
              subscribedMentors.find(
                (subscribedMentor) =>
                  subscribedMentor._id.$oid === selectedMentor._id.$oid
              )) && (
              <div className="flex justify-center">
                <motion.button
                  className="bg-blue-900 text-white px-3 py-2 rounded-md text-sm flex-shrink-0 transition-transform"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => openUnSubscribeModal(selectedMentor)}
                >
                  unSubscribe
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
      {modalContent}

    </div>
  );
};

export default Mentor;

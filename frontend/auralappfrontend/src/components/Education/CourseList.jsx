import React, { useEffect, useState } from "react";
import { isAuth } from "../../helpers/authHelper";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  SubscribeToCourse,
  UnSubscribeCourse,
} from "../../services/courses.service";
import ToastProvider from "../../providers/ToastProvider";

export default function CourseList({ courseData, userData }) {
  const [subscribedCourseData, setSubscribedCourseData] = useState([]);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const userId = isAuth().data;
  const handleNavigate = useNavigate();
  const displayedCourses = showAllCourses ? courseData : courseData.slice(0, 3);

  useEffect(() => {
    if (userData[0]?.courses && Array.isArray(courseData)) {
      const filteredCourses = courseData.filter((course) => {
        const courseId = course._id?.$oid || course._id;
        const isIncluded = userData[0]?.courses.includes(courseId);

        return isIncluded;
      });

      setSubscribedCourseData(filteredCourses);
    }
  }, [userData, courseData]);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const openModal = (course) => {
    setSelectedCourse(course);
  };
  const closeModal = () => {
    setSelectedCourse(null);
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

  const handleSubscribe = async (course) => {
    const courseId = course?._id;
    try {
      const response = await SubscribeToCourse(courseId, userId);
      if (response) {
        console.log(response);
        toast.success("Course Subscribed Successfully");
      }
    } catch (error) {
      toast.error("something went wrong", error);
    }
  };

  const [modalContent, setModalContent] = useState(null);

  const closeSubscribeModal = () => {
    setModalContent(null);
  };
  const openSubscribeModal = (course) => {
    setModalContent(
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-md shadow-md max-w-xs opacity-100 animate-fade-in ">
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
                handleSubscribe(course);
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
  const handleUnSubscribe = async (course) => {
    const courseId = course?._id;
    try {
      const response = await UnSubscribeCourse(courseId, userId);
      if (response) {
        console.log(response);
        toast.success("Course Unsubscribed Successfully");
      }
    } catch (error) {
      toast.error("Something went wrong", error);
    }
  };
  const openUnSubscribeModal = (course) => {
    setModalContent(
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-md shadow-md max-w-xs animate-fade-in opacity-100 w-full">
          <p className="p-5 m-4">Confirm your unsubscription</p>
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
                handleUnSubscribe(course);
                closeSubscribeModal();
              }}
            >
              Unsubscribe
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ToastProvider></ToastProvider>
      <p className="text-3xl mt-20 font-semibold">Subscribed Courses</p>
      {subscribedCourseData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          <Fade direction="left">
            {subscribedCourseData.map((course, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 p-4 rounded-xl shadow-sm shadow-black hover:scale-105 transform transition-transform duration-300 hover:shadow-lg hover:shadow-black"
              >
                <div className="flex flex-col gap-2 items-start">
                  <p className="text font-semibold">{course.name}</p>
                  <p>{course.description}</p>
                  <div className="flex flex-row gap-4"></div>
                </div>
                <div className="grid grid-cols-2 w-fit justify-start gap-4 text-center">
                  <p
                    className="p-2 bg-red-400 rounded-lg cursor-pointer"
                    onClick={() => handleNavigate(`/courses/${course.slug}`)}
                  >
                    Start Course
                  </p>
                  <p
                    className="p-2 bg-blue-400 rounded-lg cursor-pointer"
                    // onClick={}
                  >
                    Revision
                  </p>
                  <div
                    className="p-2 bg-green-300 rounded-lg cursor-pointer"
                    onClick={() => openModal(course)}
                  >
                    UnSubscribe
                  </div>
                </div>
              </div>
            ))}
          </Fade>
        </div>
      )}
      <p className="text-3xl mt-20 font-semibold">Courses We Offer:</p>
      {displayedCourses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          <Fade direction="left">
            {displayedCourses.map((course, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 p-4 rounded-xl shadow-sm shadow-black hover:scale-105 transform transition-transform duration-300 hover:shadow-lg hover:shadow-black h-full"
              >
                <div className="flex flex-col gap-2 items-start">
                  <p className="text font-semibold">{course.name}</p>
                  <p>{course.description}</p>
                  <div className="flex flex-row gap-4"></div>
                </div>
                <div className="grid grid-cols-2 w-fit justify-start gap-4 text-center">
                  <p
                    className="p-2 bg-red-400 rounded-lg cursor-pointer"
                    onClick={() => handleNavigate(`/courses/${course.slug}`)}
                  >
                    Start Course
                  </p>
                  <p
                    className="p-2 bg-blue-400 rounded-lg cursor-pointer"
                    // onClick={}
                  >
                    Revision
                  </p>
                  <div className="flex justify-center  space-x-2">
                    {!subscribedCourseData.find(
                      (subscribedCourse) => subscribedCourse._id === course._id
                    ) && (
                      <>
                        <button
                          className="p-2 bg-green-300 rounded-lg cursor-pointer w-full"
                          onClick={() => openSubscribeModal(course)}
                        >
                          Subscribe
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Fade>
        </div>
      )}
      <div className="mt-4">
        <button
          className="p-3 bg-black rounded-lg cursor-pointer mx-auto mt-10 text-white font-semibold text-lg"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show Less Courses" : "View All Courses"}
        </button>
      </div>
      {selectedCourse && (
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
              <div className="m-3">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  {selectedCourse.name}
                </h2>
                <p className="text-gray-700 mb-4 text-sm">
                  {selectedCourse.description}
                </p>
              </div>
            </div>

            {(subscribedCourseData.includes(selectedCourse) ||
              subscribedCourseData.find(
                (subscribedCourse) =>
                  subscribedCourse._id === selectedCourse._id
              )) && (
              <div className="flex justify-center">
                <motion.button
                  className="bg-blue-900 text-white px-3 py-2 rounded-md text-sm flex-shrink-0 transition-transform"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => openUnSubscribeModal(selectedCourse)}
                >
                  unSubscribe
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
      {modalContent}
    </>
  );
}
//   const [showAllCourses, setShowAllCourses] = useState(false);
//   const handleNavigate = useNavigate();

//   const displayedCourses = showAllCourses ? courseData : courseData.slice(0, 3);

//   const [subscriptionStatus, setSubscriptionStatus] = useState({});

//   const { data } = isAuth();
//   const userId = data;
//   useEffect(() => {
//     const storedStatus = localStorage.getItem("subscriptionStatus");
//     if (storedStatus) {
//       setSubscriptionStatus(JSON.parse(storedStatus));
//     }
//   }, []);
//   const saveSubscriptionStatus = (status) => {
//     localStorage.setItem("subscriptionStatus", JSON.stringify(status));
//   };
//   const subscribe = async (index, courseId) => {
//     const response = await SubscribeToCourse(courseId, userId);
//     setSubscriptionStatus((prevStatus) => ({
//       ...prevStatus,
//       [index]: true,
//     }));
//     saveSubscriptionStatus({
//       ...subscriptionStatus,
//       [index]: true,
//     });
//   };

//   const unsubscribe = async (index, courseId) => {
//     const response = await UnSubscribeCourse(courseId, userId);
//     setSubscriptionStatus((prevStatus) => ({
//       ...prevStatus,
//       [index]: false,
//     }));
//     saveSubscriptionStatus({
//       ...subscriptionStatus,
//       [index]: false,
//     });
//   };

//   const handleClick = (index, courseId) => {
//     setSubscriptionStatus((prevStatus) => ({
//       ...prevStatus,
//       [index]: !prevStatus[index],
//     }));

//     if (subscriptionStatus[index]) {
//       unsubscribe(index, courseId);
//     } else {
//       subscribe(index, courseId);
//     }
//   };

//   return (
//     <div>
//       <p className="text-3xl mt-20 font-semibold">Courses We Offer:</p>
//       {displayedCourses.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
//           <Fade direction="left">
//             {displayedCourses.map((el, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col gap-3 p-4 rounded-xl shadow-sm shadow-black hover:scale-105 transform transition-transform duration-300 hover:shadow-lg hover:shadow-black"
//               >
//                 <div className="flex flex-col gap-2 items-start">
//                   <p className="text font-semibold">{el.name}</p>
//                   <p>{el.description}</p>
//                   <div className="flex flex-row gap-4"></div>
//                 </div>
//                 <div className="grid grid-cols-2 w-fit justify-start gap-4 text-center">
//                   <p
//                     className="p-2 bg-red-400 rounded-lg cursor-pointer"
//                     onClick={() => handleNavigate(`/courses/${el.slug}`)}
//                   >
//                     Start Course
//                   </p>
//                   <p
//                     className="p-2 bg-blue-400 rounded-lg cursor-pointer"
//                     // onClick={}
//                   >
//                     Revision
//                   </p>
// <div
//   className="p-2 bg-green-300 rounded-lg cursor-pointer"
//   onClick={() => handleClick(index, el._id)}
// >
//   {subscriptionStatus[index] ? "Unsubscribe" : "Subscribe"}
// </div>
//                 </div>
//               </div>
//             ))}
//           </Fade>
//         </div>
//       )}

//       <div className="mt-4">
// <button
//   className="p-3 bg-black rounded-lg cursor-pointer mx-auto mt-10 text-white font-semibold text-lg"
//   onClick={() => setShowAllCourses(!showAllCourses)}
// >
//   {showAllCourses ? "Show Less Courses" : "View All Courses"}
// </button>
//       </div>
//     </div>
//   );
// }

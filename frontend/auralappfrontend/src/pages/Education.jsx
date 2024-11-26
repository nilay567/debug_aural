/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import MainSection from "../components/Education/MainSection";
import CourseList from "../components/Education/CourseList";
import Container from "../components/Containers";
// import { allCourses } from "../services/courses.service";
import { getUserID } from "../services/users.service";
import { isAuth } from "../helpers/authHelper";

export default function Education({ courseData }) {
  const [newcourseData, setCourseData] = useState([]);
  const [userData, setUserData] = useState([]);
  const { data } = isAuth();
  // const getAllCourse = async () => {
  //   try {
  //     const { data } = await allCourses();
  //     setCourseData(data?.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    setCourseData(courseData);
  }, [courseData]);
  const fetchData = async () => {
    const response = await getUserID(data);

    setUserData(JSON.parse(response?.data?.data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MainSection />
      <Container className={"mb-20"}>
        <CourseList courseData={newcourseData} userData={userData} />
      </Container>
    </>
  );
}

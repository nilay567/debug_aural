/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Containers";
import Bookmark_unfilled from "../assets/images/bookmark-white.png";
import Bookmark_filled from "../assets/images/bookmark.png";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { isAuth } from "../helpers/authHelper";
import { getUserID } from "../services/users.service";
import ToastProvider from "../providers/ToastProvider";
import { toast } from "react-hot-toast";
import { FavouriteLevel, UnFavouriteLevel } from "../services/levels.service";
export default function Course({ courseData }) {
  const { slug } = useParams();
  const [newcourseData, setNewCourseData] = useState([]);
  const [favourites, setFavourites] = useState(false);
  const id = isAuth()?.data;
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if (Array.isArray(courseData)) {
      const filteredCourses = courseData.filter((course) => {
        const included = course.slug.includes(slug);
        return included;
      });
      setNewCourseData(filteredCourses);
    }
  }, [courseData]);
  const fetchData = async () => {
    const response = await getUserID(id);
    setUserData(JSON.parse(response?.data?.data));
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  // console.log(userData[0].favourites.map((level) => level.$oid));
  useEffect(() => {
    const isCourseInFavorites = userData[0]?.favourites.some((course) =>
      newcourseData[0]?.levels?.some((level) => level._id === course)
    );
    setFavourites(isCourseInFavorites);
  }, [userData, newcourseData]);

  const handleFavourite = async (levelId) => {
    try {
      await FavouriteLevel(levelId, id);

      toast.success("Level Added to Favourites Successfully");
    } catch (error) {
      toast.error("Something went wrong", error);
    }
  };
  const handleUnFavourite = async (levelId) => {
    try {
      await UnFavouriteLevel(levelId, id);

      toast.success("Level Removed from Favourites Successfully");
    } catch (error) {
      toast.error("Something went wrong", error);
    }
  };

  return (
    <>
      <ToastProvider />
      <div className="bg-[#EAFDFB]">
        <Container className={"py-20"}>
          <p className="text-3xl md:text-4xl xl:text-5xl text-center font-semibold text-purple-300 mt-10">
            Welcome To Course Page!
          </p>
          {newcourseData
            .filter((item) => item.slug === slug)
            .map((el, index) => (
              <div key={index}>
                <div className="flex flex-row justify-between ">
                  <div className="flex flex-col gap-6">
                    <p className="text-2xl md:text-5xl font-semibold mt-20">
                      {el.name}
                    </p>
                    <p className="text-lg md:text-2xl mt-5 ">
                      {el.description}
                    </p>
                  </div>
                  {el.levels.map((level, index) => (
                    <div className="w-fit my-auto" key={index}>
                      {favourites ? (
                        <div
                          className=" border-2 border-black flex flex-row gap-4 p-3 rounded-xl cursor-pointer"
                          onClick={() => {
                            setFavourites(!favourites);
                            handleUnFavourite(level?._id);
                          }}
                        >
                          <p className="my-auto">Favourites</p>
                          <img
                            src={Bookmark_filled}
                            alt="Bookmark_filled"
                            className="w-10 h-10"
                          />
                        </div>
                      ) : (
                        <div
                          className=" border-2 border-black flex flex-row gap-4  p-3 rounded-xl cursor-pointer"
                          onClick={() => {
                            setFavourites(!favourites);
                            handleFavourite(level?._id);
                          }}
                        >
                          <p className="my-auto">Add to Favourites</p>
                          <img
                            src={Bookmark_unfilled}
                            alt="Bookmark_unfilled"
                            className="w-10 h-10"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {el.levels.map((li, index) => (
                  <div key={index}>
                    <p className="text-center text-3xl font-semibold mb-20">
                      Levels {"->"} Lectures
                    </p>
                    <VerticalTimeline lineColor="black">
                      {li.lectures.map((list, index) => (
                        <VerticalTimelineElement
                          key={index}
                          className="vertical-timeline-element hover:scale-105 transform transition-transform duration-300 "
                          contentStyle={{
                            background: "#D3D3D3",
                            borderRadius: "8px",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                            borderColor: "#000", // Set line color to black
                          }}
                          contentArrowStyle={{
                            borderRight: "7px solid  rgb(33, 150, 243)",
                          }}
                          visible={false}
                          date={`Lecture: ${list.lecturenumber}`}
                          iconStyle={{
                            background: "#61dafb",
                            color: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          icon={
                            <span className="text-xl">
                              {list.lecturenumber}
                            </span>
                          }
                        >
                          <div className={`flex flex-col gap-4 p-4`}>
                            <p className="text-2xl font-bold">{list.title}</p>
                            <iframe
                              src={list.videourl}
                              className="rounded-lg"
                              id={`video-iframe-${index}`}
                              title="YouTube Video Player"
                              width="100%"
                              height="100%"
                              allow="autoplay"
                              allowFullScreen="true"
                              webkitRequestFullscreen="true"
                              mozRequestFullScreen="true"
                            ></iframe>
                            <p className="text-xl font-semibold">
                              {list.description}
                            </p>
                          </div>
                        </VerticalTimelineElement>
                      ))}
                    </VerticalTimeline>
                  </div>
                ))}
              </div>
            ))}
        </Container>
      </div>
    </>
  );
}

/* <VerticalTimeline lineColor="black">
                  {el.levels.map((li, levelIndex) => (
                    <VerticalTimelineElement
                      key={levelIndex}
                      className="vertical-timeline-element hover:scale-105 transform transition-transform duration-300"
                      contentStyle={{
                        background: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                        borderColor: "#000", // Set line color to black
                      }}
                      contentArrowStyle={{
                        borderRight: "7px solid  rgb(33, 150, 243)",
                      }}
                      visible={false}
                      date={`Level: ${li.levelnumber}`}
                      iconStyle={{
                        background: "#61dafb",
                        color: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      icon={<span className="text-xl">{li.levelnumber}</span>}
                    >
                      <div className={`flex flex-col gap-4 p-4`}>
                        <p className="text-2xl font-bold">{li.title}</p>
                        <p className="text-xl font-semibold">
                          {li.description}
                        </p>
                        {li.lectures.map((newList, optionIndex) => (
                          <p key={optionIndex} className="text-blue-300">
                            {newList.title}
                          </p>
                        ))}
                      </div>
                    </VerticalTimelineElement>
                  ))}
                </VerticalTimeline> */

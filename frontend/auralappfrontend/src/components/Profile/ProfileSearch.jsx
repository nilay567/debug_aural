import React from "react";
import { useState, useEffect } from "react";
import { styles } from "../../styles";
import { github } from "../../assets";
import SectionWrapper from "../../hoc/SectionWrapper";
import axios from "axios";
import PopUp from "./PopUp";
import PopUp2 from "./PopUp2";
const ProfileSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [profile, setProfile] = useState([]);
  const user = JSON.parse(localStorage.getItem("AuralApp"));
  const userid = user?.data?._id;
  const userFollowers = user?.data?.followers;
  const userFollowing = user?.data?.following;
  const [curProfile, setcurProfile] = useState([]);
  const [followerModal, setfollowerModal] = useState(false);
  const [followingModal, setfollowingModal] = useState(false);
  const [searchClick, setSearchClick] = useState(false);

  // console.log(userid)
  // console.log(userFollowers.length)
  useEffect(() => {
    axios.get("http://127.0.0.1:5001/getUsers").then((response) => {
      // console.log(response.data);
      let respons = response.data;
      // respons = respons.slice(1,-1);
      // console.log(respons);
      let res = JSON.parse(respons);
      setProfile(res);

      // setProfile(res);
    });
    //console.log((profile));
    setcurProfile(user?.data);
  }, []);

  const filteredUsers = profile.filter((user) =>
    user?.username?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );
  //  console.log("HI")
  // console.log(filteredUsers)
  console.log("CUR: ", curProfile?._id);
  console.log("user: ", userid);
  return (
    <>
      <section className="relative w-full h-[100vh] mx-auto  bg-slate-300 flex flex-col items-center object-contain">
        <div
          className={`w-full h-auto border-black py-6 relative top-[4rem] flex flex-col justify-center items-center z-50`}
        >
          <div className="border-black h-auto my-4 w-full">
            <p
              className={` text-black text-[30px] sm:text-[48px] font-bold flex justify-center`}
            >
              Profile Search
            </p>
          </div>

          <form className="flex items-center relative justify-center">
            <label htmlFor="voice-search" className="sr-only">
              Search
            </label>
            {/* <div className="relative w-full flex"> */}
            {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                                </svg>
                            </div> */}
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              id="voice-search"
              className="flex justify-center bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[150px] sm:w-[300px] md:w-[500px] lg:w-[600px] ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Profiles"
              required
            />
            {/* <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                                </svg>
                            </button> */}
            {/* </div> */}
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setSearchTerm(e.target.value);
              }}
              className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              Search
            </button>
          </form>

          {/* </div> */}
        </div>
        <div className="flex relative top-[36px] right-[3.3rem] flex-col z-[50]">
          {searchTerm != "" &&
            filteredUsers.map((project, index) => (
              <div
                key={`project-${index}`}
                index={index}
                {...project}
                className="flex justify-start mx-[50px] bg-slate-500 text-white h-auto w-[150px] sm:w-[300px] md:w-[500px] lg:w-[600px] z-50"
              >
                <p className="text-[12px] sm:text-[15px] mx-[39px]">
                  <button
                    onClick={(e) => {
                      setSearchClick(true);
                      setcurProfile(project);
                    }}
                  >
                    {project.username}
                  </button>
                </p>
              </div>
            ))}
        </div>
        {1 && (
          <div className="w-full border-black py-0 sm:py-6 absolute z-0 top-[22rem] flex flex-row justify-evenly h-auto px-20">
            <div className="border-cyan-100 w-[132px]  justify-center items-center hidden sm:flex">
              <img src={github} className="w-auto object-contain h-32" />
            </div>
            <div className="border-cyan-100 w-[600px] h-auto flex-col flex">
              <div className="border-cyan-50 h-[20px] md:h-[25%] flex items-center mx-1 justify-between">
                <p className="font-bold text-[13px] sm:text-[30px] ">
                  {curProfile?.first_name}
                </p>
                <div className="text-[9px] xs:text-[11px] sm:text-[13px] justify-end flex flex-col">
                  <button
                    onClick={() => setfollowerModal(true)}
                    className=" hover:font-black"
                  >
                    {" "}
                    Followers: {curProfile?.followers?.length}
                  </button>
                  <button
                    onClick={() => setfollowingModal(true)}
                    className="hover:font-black"
                  >
                    {" "}
                    Following: {curProfile?.following?.length}
                  </button>
                </div>
              </div>

              <div className="border-cyan-50 md:h-[25%] flex flex-row justify-start ">
                <div className="border-black border w-[50px] h-auto rounded-md mx-1 flex justify-center my-3 xs:my-1 font-semibold text-[10px] items-center ">
                  Student
                </div>
                <div className="border-black border font-semibold w-[50px] h-auto  rounded-md mx-1 flex justify-center my-3 xs:my-1 text-[10px] items-center">
                  Content{" "}
                </div>
              </div>
              <div className="border-cyan-50 h-[50%] my-1 flex flex-row justify-center overflow-auto items-center font-medium">
                <p className="mx-2 text-[11px] sm:text-[13px] md:text-[15px] overflow-auto">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam aspernatur facere eveniet commodi beatae delectus
                  porro minus fugiat perspiciatis incidunt?
                </p>
              </div>
            </div>
            {curProfile?._id != userid && curProfile?._id?.$oid != userid && (
              <div className="border-cyan-100 w-auto flex flex-col justify-center items-center">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[50px] sm:w-[100px] text-[8px] sm:text-sm flex justify-center"
                >
                  Follow
                </button>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[50px] sm:w-[100px] text-[8px] sm:text-sm flex justify-center"
                >
                  Message
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      <PopUp
        followerModal={followerModal}
        setfollowerModal={setfollowerModal}
        profile={profile}
        user={curProfile}
        setcurProfile={setcurProfile}
        setSearchTerm={setSearchTerm}
      />
      <PopUp2
        followingModal={followingModal}
        setfollowingModal={setfollowingModal}
        profile={profile}
        user={curProfile}
        setcurProfile={setcurProfile}
        setSearchTerm={setSearchTerm}
      />
    </>
  );
};

export default SectionWrapper(ProfileSearch, "profileSearch");

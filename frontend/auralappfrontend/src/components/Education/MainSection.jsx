import React, { useState, useRef, useEffect } from "react";
import SearchBarIcon from "../../assets/svgs/SearchBar.svg";
import { allCourses } from "../../services/courses.service";
import { useNavigate } from "react-router-dom";
export default function MainSection() {
  const [searchInput, setSearchInput] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [searchdiv, setSearchDiv] = useState(false);
  const [selectedName, setSelectedName] = useState(null);
  const [searchParams, setsearchParamas] = useState("");

  const handleNavigate = useNavigate();

  const getAllCourse = async () => {
    const { data } = await allCourses();
    setCourseData(data?.data);
  };

  useEffect(() => {
    getAllCourse();
  }, []);

  useEffect(() => {
    setSearchDiv(searchInput !== "");
  }, [searchInput]);

  const filteredCourses = courseData.filter((course) =>
    course.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleNameClick = (name) => {
    setSearchInput(name);
    setSelectedName(name);
    const slugConversion = name.toLowerCase().replace(/ /g, "-");
    setsearchParamas(slugConversion);
  };

  const handlechange = (e) => {
    setSearchInput(e.target.value);
  };

  const ref = useRef();
  return (
    <div className="bg-[#EAFDFB] flex flex-col p-8 items-center justify-center pb-20">
      <p className="text-2xl md:text-5xl font-semibold mt-20">
        Welcome to Education Page
      </p>
      <div
        className={`mt-10 w-full xl:w-9/12 text-[#7D4E35] p-4 rounded-xl`}
        ref={ref}
      >
        <div
          className={`flex flex-row p-4 justify-between  bg-[#FFB636]  ${
            searchdiv ? "rounded-tr-xl rounded-tl-xl" : "rounded-full"
          }`}
        >
          <input
            type="text"
            placeholder="Type to Search Courses...."
            className={`text-base focus-none outline-none border-none bg-[#FFB636] w-full text-[#7D4E35] placeholder-[#7D4E35]`}
            onChange={handlechange}
            value={searchInput}
          />

          <img
            src={SearchBarIcon}
            alt="Icon"
            className="cursor-pointer"
            onClick={() => handleNavigate(`/courses/${searchParams}`)}
          />
        </div>
        <div className="flex relative flex-col overflow-auto z-50">
          {searchdiv &&
            filteredCourses.map((el, index) => (
              <div
                key={index}
                className={`flex justify-start bg-[#FFB636] text-black text-normal font-semibold h-auto z-50 px-4 cursor-pointer p-2 hover:bg-slate-400${
                  selectedName === el.name ? "selected" : ""
                }`}
                onClick={() => handleNameClick(el.name)}
              >
                <p className="">{el.name}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-row gap-10 justify-center mt-10">
        <p
          className="text-sm md:text-base rounded-lg px-3 py-2 text-white bg-black cursor-pointer"
          // onClick={}
        >
          Go To Favourites
        </p>
        <p
          className="text-sm md:text-base rounded-lg p-2 text-white bg-black cursor-pointer"
          // onClick={}
        >
          Subscribed Courses
        </p>
      </div>
    </div>
  );
}

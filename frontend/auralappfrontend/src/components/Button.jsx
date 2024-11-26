import React from "react";

function Button() {
  return (
    <div className="flex justify-center items-center">
      <button className="relative border transition-transform hover:scale-105 duration-500 group cursor-pointer text-sky-50 overflow-hidden h-14 w-56 rounded-md bg-sky-800 p-2 flex justify-center items-center font-extrabold">
        <div className="absolute z-10 w-48 h-48 rounded-full transition-transform hover:scale-150 duration-500 ease-in-out bg-sky-900 delay-150 group-hover:delay-75"></div>
        <div className="absolute z-10 w-40 h-40 rounded-full transition-transform hover:scale-150 duration-500 ease-in-out bg-sky-800 delay-150 group-hover:delay-100"></div>
        <div className="absolute z-10 w-32 h-32 rounded-full transition-transform hover:scale-150 duration-500 ease-in-out bg-sky-700 delay-150 group-hover:delay-150"></div>
        <div className="absolute z-10 w-24 h-24 rounded-full transition-transform hover:scale-150 duration-500 ease-in-out bg-sky-600 delay-150 group-hover:delay-200"></div>
        <p className="z-10">Get Started</p>
      </button>
    </div>
  );
}

export default Button;

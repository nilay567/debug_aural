import React from "react";
import { useNavigate } from "react-router-dom";
export default function EducationButton() {
    const handleNavigate=useNavigate()
  return (
    <div className="h-screen flex items-center justify-center">
      <p className=" p-7 bg-black text-white rounded-xl cursor-pointer" onClick={()=>handleNavigate("/education")}>
        Education Button
      </p>
    </div>
  );
}

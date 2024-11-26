import React, { useState, useRef, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../pages/logout";

const Navbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("AuralApp")) || {};

  const [menu, setMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleLogout = () => {
    setShowProfileDropdown(false);
    setShowAlert(true);
  };

  const handleCancelLogout = () => {
    setShowAlert(false);
  };

  const handleConfirmLogout = () => {
    // clear the local storage
    localStorage.clear();
    setShowAlert(false);
  };

  const handleSettingsClick = () => {
    navigate("/settings");
    setShowProfileDropdown(false);
  };

  const handleClickOutside = (event) => {
    // Close dropdown if the user clicks outside of it
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowProfileDropdown(false);
    }
  };

  useEffect(() => {
    // Attach click event listener for handling clicks outside the dropdown
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener on component unmount
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const isLoggedIn = !!user.data;

  return (
    <div className="relative">
      <div className="md:hidden lg:hidden bg-blue-200 fixed top-0 w-full z-10">
        <div className="grid grid-cols-6 p-3">
          <div className="col-span-1"></div>

          <div className="col-span-4 flex items-center justify-center">
            <a
              href="/aural-app"
              className="text-gray-800 text-xl m-2 font-bold transform transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <i>AuralApp</i>
            </a>
          </div>

          <div className="col-span-1 flex justify-end">
            <button onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>

      {menu && (
        <div
          className="absolute top-0 left-0 right-0 bg-opacity-50 backdrop-filter backdrop-blur-lg z-20 lg:hidden md:hidden"
          id="navphone"
          style={{
            animation: `${
              menu ? "slideIn" : "slideOut"
            } 0.3s ease-in-out forwards`,
          }}
        >
          <style jsx>{`
            @keyframes slideIn {
              0% {
                transform: translateY(-100%);
              }
              100% {
                transform: translateY(0);
              }
            }

            @keyframes slideOut {
              0% {
                transform: translateY(0);
              }
              100% {
                transform: translateY(-100%);
              }
            }
          `}</style>

          <div className="flex justify-end">
            <button onClick={toggleMenu}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="flex flex-col items-center">
            <a
              href="/"
              className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <i className="fas fa-home"></i> Home
            </a>
            <a
              href="/education"
              className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <i className="fas fa-graduation-cap"></i> Education
            </a>
            <a
              href="/mentor"
              className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <i className="fas fa-user"></i> Mentor
            </a>

            <a
              href="/student-profile"
              className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <i className="fas fa-user-graduate"></i> StudentProfile
            </a>
            <a
              href="/admin"
              className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <i className="fas fa-user-cog"></i> Admin
            </a>
            <a
              href="/students"
              className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <i className="fas fa-user-graduate"></i> Students
            </a>
            <div className="relative" ref={dropdownRef}>
              {/* Conditionally render login section or user section */}
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
                  >
                    <i className="fas fa-user"></i> {user?.username || ""}{" "}
                    <i
                      className={`fas ${
                        showProfileDropdown ? "fa-caret-up" : "fa-caret-down"
                      }`}
                    ></i>
                  </button>

                  {/* Dropdown content */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={handleSettingsClick}
                      >
                        <i className="fas fa-cog mr-2" />
                        Settings
                      </div>
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={handleLogout}
                      >
                        <i className="fas fa-sign-out-alt mr-2" />
                        Sign Out
                      </div>
                    </div>
                  )}
                </>
              ) : (
                // If not logged in, display login section
                <div className="flex">
                  <a
                    href="/signin"
                    className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
                  >
                    <i className="fas fa-user-plus"></i> SignIn
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tablet and laptop menu */}
      <div className="hidden md:flex lg:grid grid-cols-10 sm:hidden  items-center p-2 bg-blue-200 fixed top-0 w-full z-10">
        <div className="col-span-5 p-2">
          <div className="flex justify-center">
            <a
              href="/aural-app"
              className="text-gray-800 text-3xl m-2 font-bold transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
            >
              <i>AuralApp</i>
            </a>
          </div>
        </div>

        <div className="col-span-5 p-2">
          <div className="flex justify-evenly">
            <a
              href="/"
              className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <i className="fas fa-home"></i> Home
            </a>
            <a
              href="/education"
              className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <i className="fas fa-graduation-cap"></i> Education
            </a>
            <a
              href="/mentor"
              className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <i className="fas fa-user"></i> Mentor
            </a>

            <a
              href="/student-profile"
              className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <i className="fas fa-user-graduate"></i> StudentProfile
            </a>
            {isAdmin && (
              <a
                href="/admin"
                className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
              >
                <i className="fas fa-user-cog"></i> Admin
              </a>
            )}
              <a
              href="/students"
              className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <i className="fas fa-user-graduate"></i> Students
            </a>
            <div className="relative" ref={dropdownRef}>
              {/* Conditionally render login section or user section */}
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
                  >
                    <i className="fas fa-user"></i> {user?.username || ""}{" "}
                    <i
                      className={`fas ${
                        showProfileDropdown ? "fa-caret-up" : "fa-caret-down"
                      }`}
                    ></i>
                  </button>

                  {/* Dropdown content */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={handleSettingsClick}
                      >
                        <i className="fas fa-cog mr-2" />
                        Settings
                      </div>
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={handleLogout}
                      >
                        <i className="fas fa-sign-out-alt mr-2" />
                        Sign Out
                      </div>
                    </div>
                  )}
                </>
              ) : (
                // If not logged in, display login section
                <div className="flex">
                  <a
                    href="/signin"
                    className="text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110"
                  >
                    <i className="fas fa-user-plus"></i> SignIn
                  </a>
                </div>
              )}
            </div>

            {/* Profile section */}

            {showAlert && (
              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-75 transition-opacity"></div>

                  <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
                    <div className="flex items-center justify-center w-screen">
                      <div className="w-[300px] md:w-[500px]">
                        <LogoutModal
                          onConfirm={handleConfirmLogout}
                          onCancel={handleCancelLogout}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default Navbar;
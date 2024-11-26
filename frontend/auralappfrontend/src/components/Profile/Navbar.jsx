import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className='relative'>
      <div className='md:hidden lg:hidden bg-blue-200'>
        <div className='grid grid-cols-6 p-3'>
          <div className='col-span-1'>

          </div>

          <div className='col-span-4 flex items-center justify-center'>
            <a
              href='/aural-app'
              className='text-gray-800 text-xl m-2 font-bold transform transition-transform duration-300 ease-in-out hover:scale-110'
            >
              <i>AuralApp</i>
            </a>
          </div>

          <div className='col-span-1 flex justify-end'>
            <button onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
            </button></div>
        </div>

      </div>


      {menu && (
        <div className='md:hidden lg:hidden absolute top-0 left-0 right-0 bg-opacity-50 backdrop-filter backdrop-blur-lg z-10' id='navphone' style={{ animation: `${menu ? 'slideIn' : 'slideOut'} 0.3s ease-in-out forwards` }}>
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
      
        <div className='flex justify-end mr-3 mt-3'>
          <button onClick={toggleMenu}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      
        <div className='flex flex-col items-center'>
          <a
            href='/'
            className='text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110'
          >
            <i className='fas fa-home'></i> Home
          </a>
          <a
            href='/education'
            className='text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110'
          >
            <i className='fas fa-graduation-cap'></i> Education
          </a>
          <a
            href='/mentor'
            className='text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110'
          >
            <i className='fas fa-user'></i> Mentor
          </a>
      
          <a
            href='/student-profile'
            className='text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110'
          >
            <i className='fas fa-user-graduate'></i> StudentProfile
          </a>
          <a
            href='/admin'
            className='text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110'
          >
            <i className='fas fa-user-cog'></i> Admin
          </a>
          <a
            href='/signin'
            className='text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110'
          >
            <i className='fas fa-user-plus'></i> SignUp
          </a>
        </div>
      </div>
      
      )}

      {/* Tablet and laptop menu */}
      <div className='hidden md:flex lg:flex sm:hidden justify-evenly items-center p-2 bg-blue-200'>
        <a
          href='/'
          className='text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110'
        >
          <i className='fas fa-home'></i> Home
        </a>
        <a
          href='/education'
          className='text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110'
        >
          <i className='fas fa-graduation-cap'></i> Education
        </a>
        <a
          href='/mentor'
          className='text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110'
        >
          <i className='fas fa-user'></i> Mentor
        </a>
        <a
          href='/aural-app'
          className='text-gray-800 text-xl m-2 font-bold transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg'
        >
          <i>AuralApp</i>
        </a>
        <a
          href='/student-profile'
          className='text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110'
        >
          <i className='fas fa-user-graduate'></i> StudentProfile
        </a>
        <a
          href='/admin'
          className='text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110'
        >
          <i className='fas fa-user-cog'></i> Admin
        </a>
        <a
          href='/signin'
          className='text-gray-800 m-2 hover:text-gray-600 transform transition-transform duration-300 ease-in-out hover:scale-110'
        >
          <i className='fas fa-user-plus'></i> SignUp
        </a>
      </div>
    </div>
  );
};

export default Navbar;
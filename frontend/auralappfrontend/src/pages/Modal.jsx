import React from 'react';

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
          <div className="flex items-center justify-center w-screen">
            <div className="w-[300px] md:w-[500px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

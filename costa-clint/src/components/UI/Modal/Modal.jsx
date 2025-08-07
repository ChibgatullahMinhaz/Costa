// src/components/Modal.jsx
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
      onClick={onClose} 
    >
      <div
        className="p-6 bg-white rounded shadow-lg"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="float-right mb-2 text-gray-500 hover:text-gray-900"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

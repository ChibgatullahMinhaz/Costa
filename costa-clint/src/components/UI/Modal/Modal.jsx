// src/components/Modal.jsx
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0  flex justify-center items-center z-50"
      onClick={onClose} // Close on outside click
    >
      <div
        className="bg-white p-6 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-900 float-right mb-2"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

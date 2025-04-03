import { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close modal when clicking outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className=" rounded-lg p-6 shadow-lg max-w-md w-full relative"
      >
        {/* <button
          className="absolute top-2 right-2 text-gray-600 dark:text-white hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
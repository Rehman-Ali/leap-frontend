
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={onClose} // Close when clicking outside
      >
        <div 
          className="bg-white dark:bg-black rounded-lg p-6 shadow-lg max-w-md w-full relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          <button 
            className="absolute top-2 right-2 text-gray-600 dark:text-white hover:text-gray-900"
            onClick={onClose}
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
  
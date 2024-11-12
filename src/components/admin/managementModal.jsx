import { useEffect } from "react";

const Modal = ({
  title,
  message,
  isOpen,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  // Prevent background scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white dark:text-white font-primary">
            {title || "Are you sure?"}
          </h2>
        </div>
        <div className="mb-6">
          <p className="text-sm text-white dark:text-gray-300 font-primary">
            {message || "This action cannot be undone."}
          </p>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 font-primary"
          >
            {cancelText || "Cancel"}
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 font-primary"
          >
            {confirmText || "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

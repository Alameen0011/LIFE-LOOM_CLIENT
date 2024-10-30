import { useEffect } from 'react';

const Modal = ({ title, message, isOpen, onClose, onConfirm, confirmText = "Confirm", cancelText = "Cancel" }) => {
  // Prevent background scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
        </div>
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">{message}</p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
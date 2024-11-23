import React from "react";

const OrderHistoryModal = ({
  title,
  message,
  isOpen,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (isOpen) {
    console.log("modla open");
  }

  if (!isOpen) return null;

  console.log("inside order history modal");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex justify-center items-center">
      <div
        className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96 mx-auto mt-10"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        tabIndex="-1"
      >
        <div className="mb-4">
          <h2
            id="modal-title"
            className="text-xl font-semibold text-gray-900 dark:text-white font-primary"
          >
            {title || "Are you sure?"}
          </h2>
        </div>
        <div className="mb-6">
          <p
            id="modal-description"
            className="text-sm text-gray-600 dark:text-gray-300 font-primary"
          >
            {message || "This action cannot be undone."}
          </p>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 font-primary"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 font-primary"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryModal;

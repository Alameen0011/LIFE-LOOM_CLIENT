import React from "react";

const OrderConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? "block" : "hidden"}`}
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-800">Are you sure?</h2>
        <p className="mt-4 text-gray-600">
          {message || "This action cannot be undone."}
        </p>
        <div className="mt-6 flex justify-between">
          <button
            className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md transition"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;

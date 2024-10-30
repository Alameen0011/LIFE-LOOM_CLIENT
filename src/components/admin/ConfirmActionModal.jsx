import React from 'react';

const ConfirmActionModal = ({ isOpen, onClose, onConfirm, category ,actionType}) => {
  if (!isOpen) return null;

  console.log(actionType,"action type in modal")
  console.log(category,"cateogoy")

  const actionMessage =
    actionType === "block"
      ? `Are you sure you want to block`
      : `Are you sure you want to delete`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold text-white mb-4 font-primary">Confirm Action</h2>
        <p className='text-white font-primary'>{actionMessage}<strong> {category.categoryName} </strong>?</p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="bg-gray-300 font-primary text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 font-primary text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            onClick={onConfirm}
          >
            {actionType === "block" ? "Block" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
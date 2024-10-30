import { useFetchUsersQuery, useUpdateUserstatusMutation } from "@/app/service/adminApiSlice";
import Modal from "@/components/admin/managementModal";
import { Input } from "@/components/ui/input";
import {  Search } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const UserManagement = () => {

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 


  
  const { data: Allusers, isLoading } = useFetchUsersQuery();
  const [updateStatus] = useUpdateUserstatusMutation()

  console.log(Allusers)

  // Function to handle blocking the user via the modal
  const handleBlockUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Function to handle toggle action
  const handleToggle = async(user) => {
    if (user.isActive) {
      handleBlockUser(user);  // Trigger modal for block confirmation
    } else {
      // Activate user immediately without modal
    const res = await updateStatus(user._id).unwrap()
    console.log(res,"response from api unblock")
    toast.success("user unblocked successfully")
      // Call your API to set the user as active here
    }
  };

  // Confirm block user in modal
  const handleConfirmBlock = async() => {
    if (selectedUser) {
      console.log('User blocked:', selectedUser._id);
     const res = await updateStatus(selectedUser._id).unwrap()
     console.log(res,"response from api block")
     toast.error("user blocked")


      // Call your API to block the user here
      setShowModal(false);  // Close the modal
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
<div className="p-4 rounded max-w-5xl dark:text-slate-50 mt-8">
  <h1 className="text-2xl font-semibold mb-2font-primary ml-14 font-primary  mt-8">User Management</h1>
  
  {/* Container for search input */}
  <div className="flex justify-start  ml-[50px] mt-5 items-start">
    <div className="relative  w-64">
      <Search className="absolute  left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search users" className="pl-8" />
    </div>
  </div>

  <div className="overflow-x-auto w-full">
    <table className="max-w-6xl mx-auto mt-10 table-fixed border-collapse bg-white text-sm text-left text-gray-500">
      <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-700">
        <tr>
          <th scope="col" className="px-4 py-3 border-b w-1/3 font-primary">ID</th>
          <th scope="col" className="px-4 py-3 border-b w-1/3 font-primary">Email</th>
          <th scope="col" className="px-4 py-3 border-b w-1/3 font-primary">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {Allusers?.users?.map((user) => (
          <tr key={user._id} className="hover:bg-gray-50">
            <td className="px-4 py-3 border-b truncate font-primary">{user._id}</td>
            <td className="px-4 py-3 border-b truncate font-primary">{user.email}</td>
            <td className="px-4 py-3 border-b">
              {user.isActive ? (
                <button
                  onClick={() => handleToggle(user)}
                  className="bg-red-900 text-white px-3 py-1 w-24 rounded-full hover:bg-red-600"
                >
                  Block
                </button>
              ) : (
                <button
                  onClick={() => handleToggle(user)}
                  className="bg-green-500 text-white px-3 py-1 w-24 rounded-full hover:bg-green-600"
                >
                  Unblock
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Reusable Modal */}
  <Modal
    isOpen={showModal}
    onClose={() => setShowModal(false)}  // Close modal when clicked cancel
    onConfirm={handleConfirmBlock}      // Block user when confirmed
    title="Block User"
    message={`Are you sure you want to block ${selectedUser?.email}?`}
    confirmText="Block"
    cancelText="Cancel"
  />
</div>
  );
};

export default UserManagement;

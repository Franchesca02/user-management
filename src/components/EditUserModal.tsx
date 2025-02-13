
import React, { useState } from "react";
import { User } from "./dataService";

interface EditUserModalProps {
  user: User | null;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose, onSave }) => {
  if (!user) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [editedUser, setEditedUser] = useState<User>({ ...user });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-[#242424] text-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit personal data</h2>
        
        <input
          type="text"
          name="name"
          value={editedUser.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-2"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={editedUser.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-2"
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={editedUser.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-2"
          placeholder="Phone"
        />
        <input
          type="text"
          name="website"
          value={editedUser.website}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mb-2"
          placeholder="Website"
        />

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-red-500 hover:text-black">
            Cancel
          </button>
          <button onClick={() => onSave(editedUser)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-500 hover:text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;

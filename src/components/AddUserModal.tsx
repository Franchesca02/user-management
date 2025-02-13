import { useState } from "react";
import { User } from "./dataService";

type AddUserModalProps = {
  onClose: () => void;
  onSave: (newUser: User) => void;
};

const AddUserModal = ({ onClose, onSave }: AddUserModalProps) => {
  const [newUser, setNewUser] = useState<User>({
    id: Date.now(), 
    name: "",
    email: "",
    phone: "",
    website: "",
    company: { name: "" },
    address: { city: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (newUser.name && newUser.email) {
      onSave(newUser);
      onClose();
    } else {
      alert("Name and Email are required.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50">
      <div className="bg-[#242424] p-5 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleChange}
          className="border p-2 rounded-lg w-full mb-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
          className="border p-2 rounded-lg w-full mb-3"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newUser.phone}
          onChange={handleChange}
          className="border p-2 rounded-lg w-full mb-3"
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={newUser.company.name}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              company: { name: e.target.value },
            })
          }
          className="border p-2 rounded-lg w-full mb-3"
        />
        <input
          type="text"
          name="address"
          placeholder="City"
          value={newUser.address.city}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              address: { city: e.target.value },
            })
          }
          className="border p-2 rounded-lg w-full mb-3"
        />
        <div className="flex justify-between gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-400 rounded-lg text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 hover:bg-green-400 rounded-lg text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchUsers, User } from "../ui/dataService";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import EditUserModal from "./EditUserModal";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddUserModal from "./AddUserModal";
import { toast } from "react-toastify";

const LOCAL_STORAGE_KEY = "users_data";

const UserList = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 5;

  useEffect(() => {
    const savedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedUsers) {
      setData(JSON.parse(savedUsers));
      setLoading(false);
    } else {
      fetchData();
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const users = await fetchUsers();
      setData(users);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    } catch (err) {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSave = useCallback(
    (updatedUser: User) => {
      const updatedData = data.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setData(updatedData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
      setSelectedUser(null);
    },
    [data]
  );

  const handleDelete = useCallback((userId: number) => {
    toast.warn(
      <div>
        <p>Are you sure you want to delete this user?</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => confirmDelete(userId)}
            className="px-3 py-1 bg-red-600 hover:bg-red-400 text-white rounded-lg"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-black rounded-lg"
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  }, [data]);

  const confirmDelete = useCallback(
    (userId: number) => {
      const updatedData = data.filter((user) => user.id !== userId);
      setData(updatedData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
      toast.dismiss();
      toast.success("User deleted successfully!", { autoClose: 5000 });
    },
    [data]
  );

  const handleSaveNewUser = useCallback(
    (newUser: User) => {
      const updatedData = [newUser, ...data];
      setData(updatedData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
      setIsAdding(false);
    },
    [data]
  );

  const filteredData = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return data.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery) ||
        user.company.name.toLowerCase().includes(lowerCaseQuery) ||
        user.website.toLowerCase().includes(lowerCaseQuery) ||
        user.address.city.toLowerCase().includes(lowerCaseQuery) ||
        user.phone.includes(lowerCaseQuery)
    );
  }, [searchQuery, data]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredData]);

  if (loading) return <p className="text-center text-xl mt-5">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-5">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <SearchBar onSearch={setSearchQuery} />

        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-green-800 hover:bg-green-500 text-white rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Create New Item
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
        {currentItems.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded-lg bg-gray-200 shadow-2xl transform transition-transform duration-300 hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-black hover:text-gray-600">
              <span className="text-blue-400 text-sm">Name:</span> {user.name}
            </h2>
            <p className="text-red-700 text-lg hover:text-red-300 cursor-pointer">
              <span className="text-blue-400 text-sm">Email:</span> {user.email}
            </p>
            <p className="text-gray-800 text-lg hover:text-gray-400">
              <span className="text-blue-400 text-sm">Company:</span>{" "}
              {user.company.name}
            </p>
            <p className="text-gray-800 text-lg hover:text-gray-400">
              <span className="text-blue-400 text-sm">Phone:</span> {user.phone}
            </p>
            <p className="text-gray-800 text-lg hover:text-gray-400">
              <span className="text-blue-400 text-sm">Address:</span>{" "}
              {user.address.city}
            </p>
            <p className="text-gray-800 text-lg hover:text-gray-400 cursor-pointer">
              <span className="text-blue-400 text-sm">Website:</span>{" "}
              {user.website}
            </p>
            <div className="flex gap-2 justify-between mt-2">
              <button
                onClick={() => setSelectedUser(user)}
                className="p-2 bg-gray-800 hover:bg-gray-500 hover:text-gray-800 text-white rounded-lg"
              >
                <FaEdit size={15} />
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="p-2 bg-red-800 hover:bg-red-500 text-white rounded-lg"
              >
                <FaTrash size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {isAdding && (
        <AddUserModal
          onClose={() => setIsAdding(false)}
          onSave={handleSaveNewUser}
        />
      )}

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserList;

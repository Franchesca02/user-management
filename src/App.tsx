import { ToastContainer } from "react-toastify";
import UserList from "./components/UserList";


const App = () => {

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">User Dashboard</h1>
      <UserList />
      <ToastContainer />
    </div>
  );
};

export default App;

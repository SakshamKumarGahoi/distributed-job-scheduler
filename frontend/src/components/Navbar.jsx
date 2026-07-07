import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  function logout() {

    localStorage.removeItem("token");

    navigate("/");

  }

  return (

    <div className="h-16 bg-white shadow flex items-center justify-between px-8">

      <div>

        <h2 className="text-xl font-semibold text-slate-800">
          Distributed Job Scheduler
        </h2>

      </div>

      <div className="flex items-center gap-4">

        <span className="text-gray-600">

          Admin

        </span>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >

          Logout

        </button>

      </div>

    </div>

  );

}
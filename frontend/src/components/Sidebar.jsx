import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Projects", path: "/projects" },
  { name: "Queues", path: "/queues" },
  { name: "Jobs", path: "/jobs" },
  { name: "Workers", path: "/workers" },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white h-screen p-6">

      <h1 className="text-2xl font-bold mb-10">
        Scheduler
      </h1>

      <nav className="space-y-3">

        {links.map((link) => (

          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {link.name}
          </NavLink>

        ))}

      </nav>

    </div>
  );
}
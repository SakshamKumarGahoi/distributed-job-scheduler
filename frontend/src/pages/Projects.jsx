import { useEffect, useState } from "react";
import api from "../api/axios";
import Table from "../components/Table";

export default function Projects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const res = await api.get("/projects");
      setProjects(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  const columns = [
    { key: "name", label: "Project" },
    { key: "createdAt", label: "Created At" },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Projects</h1>

      <Table columns={columns} data={projects} />
    </>
  );
}
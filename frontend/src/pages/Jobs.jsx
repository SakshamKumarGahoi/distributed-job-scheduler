import { useEffect, useState } from "react";
import api from "../api/axios";
import Table from "../components/Table";

export default function Jobs() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    load();

  }, []);

  async function load() {

    const res = await api.get("/jobs");

    setJobs(res.data.data);

  }

  const columns = [

    {
      key: "type",
      label: "Type",
    },

    {
      key: "status",
      label: "Status",
    },

    {
      key: "priority",
      label: "Priority",
    },

    {
      key: "attempt",
      label: "Attempts",
    },

  ];

  return (

    <>

      <h1 className="text-4xl font-bold mb-8">

        Jobs

      </h1>

      <Table
        columns={columns}
        data={jobs}
      />

    </>

  );

}
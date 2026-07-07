import { useEffect, useState } from "react";
import api from "../api/axios";
import Table from "../components/Table";

export default function Workers() {

  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    loadWorkers();
  }, []);

  async function loadWorkers() {
    try {
      const res = await api.get("/workers");
      setWorkers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  const columns = [
    { key: "hostname", label: "Hostname" },
    { key: "status", label: "Status" },
    { key: "lastHeartbeatAt", label: "Heartbeat" },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Workers</h1>

      <Table columns={columns} data={workers} />
    </>
  );
}
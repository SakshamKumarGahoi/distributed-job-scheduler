import { useEffect, useState } from "react";
import api from "../api/axios";
import Table from "../components/Table";

export default function Queues() {

  const [queues, setQueues] = useState([]);

  useEffect(() => {
    loadQueues();
  }, []);

  async function loadQueues() {
    try {
      const res = await api.get("/queues");
      setQueues(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  const columns = [
    { key: "name", label: "Queue" },
    { key: "concurrencyLimit", label: "Concurrency" },
    { key: "isPaused", label: "Paused" },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Queues</h1>

      <Table columns={columns} data={queues} />
    </>
  );
}
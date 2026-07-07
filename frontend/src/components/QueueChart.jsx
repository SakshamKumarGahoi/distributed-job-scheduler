import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function QueueChart({ stats }) {
  const data = [
    { name: "Queued", value: stats.QUEUED || 0 },
    { name: "Running", value: stats.RUNNING || 0 },
    { name: "Completed", value: stats.COMPLETED || 0 },
    { name: "Failed", value: stats.FAILED || 0 },
    { name: "Dead", value: stats.DEAD || 0 },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Queue Statistics
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";
import QueueChart from "../components/QueueChart";
export default function Dashboard() {

    const [queueStats, setQueueStats] = useState({});

    const [stats,setStats]=useState({
        projects:0,
        queues:0,
        jobs:0,
        workers:0,
    });

    useEffect(()=>{

        load();

    },[]);

    async function load(){

        const dashboard = await api.get("/dashboard");

        setStats(dashboard.data.data);

        const queues = await api.get("/queues");

        if (queues.data.data.length > 0) {

            const queueId = queues.data.data[0].id;

            const stats = await api.get(`/queues/${queueId}/stats`);

            setQueueStats(stats.data.data);

        }

        const res=await api.get("/dashboard");

        setStats(res.data.data);

    }

    return(

        <>

        <h1 className="text-4xl font-bold mb-8">

            Dashboard

        </h1>

        <div className="grid grid-cols-4 gap-6">

            <StatCard
                title="Projects"
                value={stats.projects}
            />

            <StatCard
                title="Queues"
                value={stats.queues}
            />

            <StatCard
                title="Jobs"
                value={stats.jobs}
            />

            <StatCard
                title="Workers"
                value={stats.workers}
            />

            <QueueChart stats={queueStats} />

        </div>

        </>

    );

}
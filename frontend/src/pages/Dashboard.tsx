import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import StatCard from "../components/dashboard/StatCard";
import ProgressChart from "../components/dashboard/ProgressChart";
import AIWidget from "../components/dashboard/AIWidget";

import {
  Flame,
  Target,
  Trophy,
  CalendarCheck,
} from "lucide-react";

import { getDashboard } from "../services/dashboard";
import type { DashboardData } from "../types/dashboard";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        console.log(
  "Dashboard Token:",
  localStorage.getItem("token")
);
        const data = await getDashboard();
        setDashboard(data);
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <Layout>
        <h2 className="text-2xl font-bold">
          Loading dashboard...
        </h2>
      </Layout>
    );
  }

  if (!dashboard) {
    return (
      <Layout>
        <h2 className="text-2xl font-bold text-red-500">
          Failed to load dashboard.
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-2">
        Welcome back, Bhavya 👋
      </h1>

      <p className="text-gray-500 mb-8">
        Let's build better habits today.
      </p>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Current Streak"
          value={`${dashboard.streak} Days`}
          icon={<Flame size={35} />}
        />

        <StatCard
          title="Productivity"
          value={`${dashboard.productivity}%`}
          icon={<Target size={35} />}
        />

        <StatCard
          title="XP Earned"
          value={`${dashboard.xp}`}
          icon={<Trophy size={35} />}
        />

        <StatCard
          title="Today's Habits"
          value={`${dashboard.completed_habits} / ${dashboard.total_habits}`}
          icon={<CalendarCheck size={35} />}
        />
      </div>

      {/* Chart + AI Widget */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        <div className="xl:col-span-2">
          <ProgressChart />
        </div>

        <AIWidget message={dashboard.ai_message} />
      </div>
    </Layout>
  );
}
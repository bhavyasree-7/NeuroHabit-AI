import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import HabitCard from "../components/habits/HabitCard";

import { getHabits } from "../services/habit";
import type { Habit } from "../types/habit";

export default function Habits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHabits();
  }, []);

const loadHabits = async () => {
  try {
    const data = await getHabits();

    console.log("Habits:", data);

    setHabits(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">
          My Habits
        </h1>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >
          + Add Habit
        </button>
      </div>

      <div className="grid gap-5">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            refresh={loadHabits}
          />
        ))}
      </div>
    </Layout>
  );
}
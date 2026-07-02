import {
  CheckCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Habit } from "../../types/habit";

import {
  deleteHabit,
  completeHabit,
} from "../../services/habit";

interface Props {
  habit: Habit;
  refresh: () => void;
}

export default function HabitCard({
  habit,
  refresh,
}: Props) {

  const handleDelete = async () => {
    await deleteHabit(habit.id);
    refresh();
  };

  const handleComplete = async () => {
    await completeHabit(habit.id);
    refresh();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center">

      <div>
        <h2 className="text-xl font-bold">
          {habit.title}
        </h2>

        <p className="text-gray-500 mt-2">
          {habit.description}
        </p>

        <span className="inline-block mt-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {habit.frequency}
        </span>
      </div>

      <div className="flex gap-3">

        <button
          onClick={handleComplete}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl"
        >
          <CheckCircle size={22} />
        </button>

        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-xl"
        >
          <Pencil size={22} />
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
        >
          <Trash2 size={22} />
        </button>

      </div>

    </div>
  );
}
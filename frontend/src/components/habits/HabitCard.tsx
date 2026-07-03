import { useState } from "react";
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

import EditHabitDialog from "./EditHabitDialog";

interface Props {
  habit: Habit;
  refresh: () => void;
}

export default function HabitCard({
  habit,
  refresh,
}: Props) {
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteHabit(habit.id);
      refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete habit");
    }
  };

  const handleComplete = async () => {
    try {
      await completeHabit(habit.id);
      refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to complete habit");
    }
  };

  return (
    <>
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
            title="Complete Habit"
          >
            <CheckCircle size={22} />
          </button>

          <button
            onClick={() => setShowEdit(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-xl"
            title="Edit Habit"
          >
            <Pencil size={22} />
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
            title="Delete Habit"
          >
            <Trash2 size={22} />
          </button>
        </div>
      </div>

    {/* Edit dialog temporarily disabled */}  
    </>
  );
}
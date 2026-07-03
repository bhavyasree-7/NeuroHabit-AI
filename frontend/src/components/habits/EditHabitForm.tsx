import { useState } from "react";

import type { Habit } from "../../types/habit";
import { updateHabit } from "../../services/habit";

interface Props {
  habit: Habit;
  refresh: () => void;
  onClose: () => void;
}

export default function EditHabitForm({
  habit,
  refresh,
  onClose,
}: Props) {
  const [title, setTitle] = useState(habit.title);
  const [description, setDescription] = useState(habit.description);
  const [frequency, setFrequency] = useState(habit.frequency);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await updateHabit(habit.id, {
        title,
        description,
        frequency,
      });

      await refresh();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update habit");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        className="w-full border rounded-lg p-3"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        className="w-full border rounded-lg p-3"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <select
        className="w-full border rounded-lg p-3"
        value={frequency}
        onChange={(e) =>
          setFrequency(e.target.value)
        }
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl"
      >
        Update Habit
      </button>
    </form>
  );
}
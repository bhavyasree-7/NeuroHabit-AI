import type { Habit } from "../../types/habit";
import EditHabitForm from "./EditHabitForm";

interface Props {
  habit: Habit;
  refresh: () => void;
  onClose: () => void;
}

export default function EditHabitDialog({
  habit,
  refresh,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[450px] shadow-xl">

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">
            Edit Habit
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        <EditHabitForm
          habit={habit}
          refresh={refresh}
          onClose={onClose}
        />

      </div>
    </div>
  );
}
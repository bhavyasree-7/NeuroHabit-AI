import { Brain } from "lucide-react";

interface AIWidgetProps {
  message: string;
}

export default function AIWidget({ message }: AIWidgetProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-6 h-full">
      <div className="flex items-center gap-3 mb-4">
        <Brain size={30} />
        <h2 className="text-xl font-bold">AI Coach</h2>
      </div>

      <p className="leading-7">
        {message}
      </p>

      <div className="mt-6 border-t border-blue-300 pt-4">
        <p className="text-sm opacity-90">
          🚀 Keep your streak alive by completing today's habits!
        </p>
      </div>
    </div>
  );
}
import {
  LayoutDashboard,
  CheckSquare,
  CheckCircle,
  BarChart3,
  Brain,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Habits", icon: CheckSquare },
  { name: "Analytics", icon: BarChart3 },
  { name: "AI Coach", icon: Brain },
  { name: "Settings", icon: Settings },
  {
  title: "Habits",
  icon: CheckCircle,
  href: "/habits",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          🧠 NeuroHabit AI
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition"
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
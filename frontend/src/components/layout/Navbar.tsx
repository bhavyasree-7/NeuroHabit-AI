import { Bell, Moon, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <Search className="text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search habits..."
          className="outline-none bg-transparent text-sm w-64"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="hover:text-blue-600 transition">
          <Moon size={20} />
        </button>

        <button className="relative hover:text-blue-600 transition">
          <Bell size={20} />
          <span className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            B
          </div>

          <div>
            <h2 className="font-semibold">Bhavya</h2>
            <p className="text-xs text-gray-500">
              AI Productivity
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
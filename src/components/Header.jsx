import { useDispatch, useSelector } from "react-redux";
import {
  SunIcon,
  MoonIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { toggleDarkMode, setShowAddListModal } from "../store/uiSlice";
import { setSearchTerm } from "../store/boardsSlice";

export default function Header() {
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.ui.darkMode);
  const searchTerm = useSelector((state) => state.boards.searchTerm);

  const { boards, activeBoardId } = useSelector((state) => state.boards);
  const activeBoard = boards.find((b) => b.id === activeBoardId);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        {/* 🔥 FLEX RESPONSIVE */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* LEFT */}
          <div className="flex items-center justify-between sm:justify-start space-x-3">
            <h1 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trello Clone
            </h1>

            {activeBoard && (
              <span className="hidden sm:inline px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium">
                {activeBoard.title}
              </span>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* SEARCH */}
            <div className="relative flex-1 min-w-37.5 sm:min-w-62.5">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search cards..."
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* ADD LIST */}
            <button
              onClick={() => dispatch(setShowAddListModal(true))}
              className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1 sm:gap-2 shadow-md hover:shadow-lg transition-all text-sm"
            >
              <PlusIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Add List</span>
            </button>

            {/* DARK MODE */}
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

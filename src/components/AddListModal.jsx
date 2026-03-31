import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../store/boardsSlice"; // ✅ FIXED: Import from boardsSlice
import { setShowAddListModal } from "../store/uiSlice";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function AddListModal({ isOpen }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addList(title.trim())); // ✅ Now works correctly
      setTitle("");
      dispatch(setShowAddListModal(false));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Add New List
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 'Ideas', 'To Do', 'In Progress'"
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              autoFocus
            />

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  dispatch(setShowAddListModal(false));
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl border border-gray-300 dark:border-slate-600 transition-all"
              >
                <XMarkIcon className="w-4 h-4" />
                <span>Cancel</span>
              </button>

              <button
                type="submit"
                disabled={!title.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                <CheckIcon className="w-4 h-4" />
                <span>Create List</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

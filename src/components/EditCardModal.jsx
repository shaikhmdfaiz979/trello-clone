import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCard, deleteCard } from "../store/boardsSlice";
import { XMarkIcon, CheckIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function EditCardModal({ isOpen, card, listId, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (card) setTitle(card.title);
  }, [card]);

  if (!isOpen || !card) return null;

  const handleSave = () => {
    dispatch(updateCard({ cardId: card.id, listId, title }));
    onClose();
  };

  const handleDelete = () => {
    dispatch(deleteCard({ cardId: card.id, listId }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Edit Card
          </h2>
        </div>

        <div className="p-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleDelete}
              className="flex-1 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <TrashIcon className="w-5 h-5 inline mr-2" />
              Delete
            </button>
            <button
              onClick={handleSave}
              className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <CheckIcon className="w-5 h-5 inline mr-2" />
              Save
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-3 p-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

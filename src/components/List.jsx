import { useDispatch } from "react-redux";
import Card from "./Card";
import { PlusIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { updateList, deleteList } from "../store/boardsSlice";

export default function List({ list, onAddCard, onEditCard }) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);

  const handleQuickAdd = () => {
    onAddCard(list.id);
  };

  const handleSave = () => {
    if (title.trim()) {
      dispatch(updateList({ listId: list.id, title }));
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 min-h-100 flex flex-col">
      {/* HEADER */}
      <div className="p-5 border-b border-gray-200 dark:border-slate-700 rounded-t-lg bg-linear-to-r from-gray-50 to-gray-100 dark:from-slate-900/50 dark:to-slate-800/50 flex items-center justify-between">
        {/* TITLE / EDIT MODE */}
        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="w-full px-2 py-1 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white outline-none"
            autoFocus
          />
        ) : (
          <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
            {list.title} ({list.cards.length})
          </h3>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 ml-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
          >
            <PencilIcon className="w-4 h-4" />
          </button>

          <button
            onClick={() => dispatch(deleteList({ listId: list.id }))}
            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div className="p-4 space-y-3 flex-1">
        {list.cards.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            No cards yet
          </div>
        ) : (
          
          <SortableContext
            items={list.cards.map((card) => card.id)}
            strategy={verticalListSortingStrategy}
            >
            {list.cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                listId={list.id}
                onEdit={onEditCard}
                />
            ))}
          </SortableContext>
        )}
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-700">
        <button
          onClick={handleQuickAdd}
          className="w-full p-3 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-all flex items-center justify-center gap-2 group"
        >
          <PlusIcon className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          <span>Add a card</span>
        </button>
      </div>
    </div>
  );
}

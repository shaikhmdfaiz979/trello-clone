import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { deleteCard } from "../store/boardsSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Card({ card, listId, onEdit }) {
  const dispatch = useDispatch();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative p-4 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
    >
      {/* 🔥 DRAG HANDLE (ONLY THIS PART DRAGS) */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-4">
          {card.title}
          
        </h4>
      </div>

      {/* ACTION BUTTONS */}
      <div className="absolute top-3.25 right-2 opacity-0 group-hover:opacity-100 transition-all  flex gap-2">
        <button
          onClick={() => onEdit(card, listId)}
          className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-sm"
        >
          <PencilIcon className="w-4 h-4" />
        </button>

        <button
          onClick={() => dispatch(deleteCard({ cardId: card.id, listId }))}
          className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-sm"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

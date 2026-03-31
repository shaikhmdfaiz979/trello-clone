import { useSelector, useDispatch } from "react-redux";
import List from "./List";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { moveCard } from "../store/boardsSlice";

export default function Board({ onAddCard, onEditCard }) {
  const dispatch = useDispatch();

  const { boards, activeBoardId, searchTerm } = useSelector(
    (state) => state.boards,
  );

  const activeBoard = boards.find((b) => b.id === activeBoardId);

  if (!activeBoard) return null;

  // 🔍 SEARCH FILTER
  const filteredLists = activeBoard.lists.map((list) => ({
    ...list,
    cards: list.cards.filter((card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  }));

  // 🔥 find list
  const findList = (id) => {
    for (let list of activeBoard.lists) {
      if (list.cards.find((c) => c.id === id)) return list;
    }
    return activeBoard.lists.find((l) => l.id === id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const fromList = findList(active.id);
    const toList = findList(over.id);

    if (!fromList || !toList) return;

    if (fromList.id === toList.id && active.id === over.id) return;

    dispatch(
      moveCard({
        fromListId: fromList.id,
        toListId: toList.id,
        cardId: active.id,
        index: 0,
      }),
    );
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      {/* ✅ RESPONSIVE GRID FIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-3 sm:p-6 items-start">
        {filteredLists.map((list) => (
          <List
            key={list.id}
            list={list}
            onAddCard={onAddCard}
            onEditCard={onEditCard}
          />
        ))}
      </div>
    </DndContext>
  );
}

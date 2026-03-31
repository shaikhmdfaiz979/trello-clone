import React, { useState } from "react"; // ✅ Add React import
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./store";
import Header from "./components/Header";
import Board from "./components/Board";
import AddListModal from "./components/AddListModal";
import AddCardModal from "./components/AddCardModal";
import EditCardModal from "./components/EditCardModal";
import { setShowAddListModal } from "./store/uiSlice";

function AppContent() {
  const dispatch = useDispatch();
  const { darkMode, showAddListModal } = useSelector((state) => state.ui);

  // ✅ Fix: useState from React
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedListId, setSelectedListId] = useState(null);

  const handleAddCard = (listId) => {
    setSelectedListId(listId);
    setShowAddCardModal(true);
  };

  const handleEditCard = (card, listId) => {
    setSelectedCard(card);
    setSelectedListId(listId);
    setShowEditModal(true);
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-slate-900" : "bg-gray-50"}`}
    >
      <Header />
      <Board onAddCard={handleAddCard} onEditCard={handleEditCard} />

      <AddListModal isOpen={showAddListModal} />
      <AddCardModal
        isOpen={showAddCardModal}
        listId={selectedListId}
        onClose={() => setShowAddCardModal(false)}
      />
      <EditCardModal
        isOpen={showEditModal}
        card={selectedCard}
        listId={selectedListId}
        onClose={() => setShowEditModal(false)}
      />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;

import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  boards: [
    {
      id: "1",
      title: "My Board",
      lists: [
        {
          id: "1",
          title: "To Do",
          cards: [
            {
              id: nanoid(),
              title: "Welcome to Trello Clone!",
              color: "blue",
            },
            {
              id: nanoid(),
              title: "Drag & Drop working 🔥",
              color: "green",
            },
          ],
        },
        {
          id: "2",
          title: "In Progress",
          cards: [
            {
              id: nanoid(),
              title: "Build UI",
              color: "orange",
            },
          ],
        },
        {
          id: "3",
          title: "Done",
          cards: [
            {
              id: nanoid(),
              title: "Redux setup complete",
              color: "purple",
            },
          ],
        },
      ],
    },
  ],
  activeBoardId: "1",
  searchTerm: "",
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    // ✅ ADD LIST
    addList: (state, action) => {
      const board = state.boards.find((b) => b.id === state.activeBoardId);
      if (!board) return;

      board.lists.push({
        id: nanoid(),
        title: action.payload,
        cards: [],
      });
    },

    // ✅ UPDATE LIST
    updateList: (state, action) => {
      const { listId, title } = action.payload;

      const board = state.boards.find((b) => b.id === state.activeBoardId);
      if (!board) return;

      const list = board.lists.find((l) => l.id === listId);
      if (list) list.title = title;
    },

    // ✅ DELETE LIST
    deleteList: (state, action) => {
      const { listId } = action.payload;

      const board = state.boards.find((b) => b.id === state.activeBoardId);
      if (!board) return;

      board.lists = board.lists.filter((l) => l.id !== listId);
    },

    // ✅ ADD CARD
    addCard: (state, action) => {
      const { listId, title } = action.payload;

      const board = state.boards.find((b) => b.id === state.activeBoardId);
      if (!board) return;

      const list = board.lists.find((l) => l.id === listId);
      if (!list) return;

      list.cards.push({
        id: nanoid(),
        title: title || "New Card",
        color: "blue",
      });
    },

    // ✅ UPDATE CARD
    updateCard: (state, action) => {
      const { cardId, listId, title } = action.payload;

      const board = state.boards.find((b) => b.id === state.activeBoardId);
      if (!board) return;

      const list = board.lists.find((l) => l.id === listId);
      if (!list) return;

      const card = list.cards.find((c) => c.id === cardId);
      if (card) {
        card.title = title;
      }
    },

    // ✅ DELETE CARD
    deleteCard: (state, action) => {
      const { cardId, listId } = action.payload;

      const board = state.boards.find((b) => b.id === state.activeBoardId);
      if (!board) return;

      const list = board.lists.find((l) => l.id === listId);
      if (!list) return;

      list.cards = list.cards.filter((c) => c.id !== cardId);
    },

    // 🔥 MOVE CARD (DRAG & DROP)
    moveCard: (state, action) => {
      const { fromListId, toListId, cardId, index } = action.payload;

      const board = state.boards.find((b) => b.id === state.activeBoardId);
      if (!board) return;

      const fromList = board.lists.find((l) => l.id === fromListId);
      const toList = board.lists.find((l) => l.id === toListId);

      if (!fromList || !toList) return;

      const cardIndex = fromList.cards.findIndex((c) => c.id === cardId);
      if (cardIndex === -1) return;

      const [movedCard] = fromList.cards.splice(cardIndex, 1);

      // if same list adjust index
      if (fromListId === toListId) {
        toList.cards.splice(index ?? cardIndex, 0, movedCard);
      } else {
        toList.cards.splice(index ?? 0, 0, movedCard);
      }
    },

    // 🔍 SEARCH
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  addList,
  updateList,
  deleteList,
  addCard,
  updateCard,
  deleteCard,
  moveCard,
  setSearchTerm,
} = boardsSlice.actions;

export default boardsSlice.reducer;

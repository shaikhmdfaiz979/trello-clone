import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./boardsSlice";
import uiReducer from "./uiSlice";

// 🔥 Load from localStorage
const loadState = () => {
  try {
    const state = localStorage.getItem("trelloState");
    return state ? JSON.parse(state) : undefined;
  } catch {
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    ui: uiReducer,
  },
  preloadedState: loadState(),
});

// 🔥 Save to localStorage
store.subscribe(() => {
  localStorage.setItem("trelloState", JSON.stringify(store.getState()));
});

export { store };

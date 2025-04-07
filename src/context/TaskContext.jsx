import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { saveToStorage, getFromStorage } from "../utils/storage";

const TaskContext = createContext();

const initialState = {
  tasks: [],
  weights: {
    deadline: 1,
    importance: 1,
    difficulty: 1,
    duration: 1,
    impact: 1,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    case "SET_WEIGHTS":
      return { ...state, weights: action.payload };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false); // Tambahan flag

  // Load data dari localStorage saat mount
  useEffect(() => {
    const storedTasks = getFromStorage("tasks", []);
    const storedWeights = getFromStorage("weights", initialState.weights);

    if (storedTasks && Array.isArray(storedTasks)) {
      dispatch({ type: "SET_TASKS", payload: storedTasks });
    }

    if (storedWeights && typeof storedWeights === "object") {
      dispatch({ type: "SET_WEIGHTS", payload: storedWeights });
    }

    setIsInitialized(true); // Set flag setelah load selesai
  }, []);

  // Simpan tasks ke localStorage setelah data berhasil di-load
  useEffect(() => {
    if (isInitialized) {
      saveToStorage("tasks", state.tasks);
      console.log("Tasks saved:", state.tasks);
      console.log(
        "Verification - tasks in storage:",
        getFromStorage("tasks", [])
      );
    }
  }, [state.tasks, isInitialized]);

  // Simpan weights juga
  useEffect(() => {
    if (isInitialized) {
      saveToStorage("weights", state.weights);
    }
  }, [state.weights, isInitialized]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);

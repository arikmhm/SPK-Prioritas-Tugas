import "./App.css";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import { TaskProvider } from "./context/TaskContext";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <TaskProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </TaskProvider>
  );
}

export default App;

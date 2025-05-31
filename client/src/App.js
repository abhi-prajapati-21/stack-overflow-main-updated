import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { useQuestions } from "./hooks/useQuestions";
import { useUsers } from "./hooks/useUsers";
import Navbar from "./components/Navbar/navbar";
import AllRoutes from "./components/AllRoutes";

function App() {
  // Prefetch data on app load
  const { data: questions } = useQuestions();
  const { data: users } = useUsers();

  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;

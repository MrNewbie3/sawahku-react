import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Controls from "./pages/Controls";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/controls" element={<Controls />} />
      </Routes>
    </Router>
  );
}

export default App;

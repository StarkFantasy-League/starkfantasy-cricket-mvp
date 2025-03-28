import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./app/page.tsx";
import CricketRulesContent from "./app/cricket-rules/page.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen w-full p-4 sm:p-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/welcomePage" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<CricketRulesContent />} />
  <Route path="/rules" element={<CricketRulesContent />} />
  <Route path="/starkfantasyleague" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

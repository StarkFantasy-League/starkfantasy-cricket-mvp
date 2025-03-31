import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./app/page.tsx";
import CricketRulesContent from "./app/cricket-rules/page.tsx";
import PremierLeague from "./app/Cricket/leagues/premier/Premier.tsx";
import MyTeam from "./app/Cricket/leagues/my-team/MyTeam.tsx";
import Team from "./app/Cricket/leagues/my-team/subroutes/Team.tsx";
import Pools from "./app/Cricket/leagues/my-team/subroutes/Pools.tsx";
import Results from "./app/Cricket/leagues/my-team/subroutes/Results.tsx";
import "./index.css";

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen w-full">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/welcomePage" element={<HomePage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<CricketRulesContent />} />
                    <Route path="/rules" element={<CricketRulesContent />} />
                    <Route path="/starkfantasyleague" element={<HomePage />} />
                    <Route path="/premierLeague" element={<PremierLeague />} />
                    <Route path="/my-team" element={<MyTeam />}>
                        <Route index element={<Team />} />
                        <Route path="pools" element={<Pools />} />
                        <Route path="results" element={<Results />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

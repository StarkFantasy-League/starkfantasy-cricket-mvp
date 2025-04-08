/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./features/page.tsx";
import CricketRulesContent from "./features/cricket-rules/page.tsx";
import PremierLeague from "./features/Cricket/leagues/premier/Premier.tsx";
import MyTeam from "./features/Cricket/leagues/my-team/MyTeam.tsx";
import Team from "./features/Cricket/leagues/my-team/subroutes/Team.tsx";
import Pools from "./features/Cricket/leagues/my-team/subroutes/Pools.tsx";
import Results from "./features/Cricket/leagues/my-team/subroutes/Results.tsx";
import SupportPage from "./features/support/SupportPage.tsx";
import AboutPage from "./features/about/AboutPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen w-full">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/welcomePage" element={<HomePage />} />
                    <Route path="/About" element={<AboutPage/>} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/rules" element={<CricketRulesContent />} />
                    <Route path="/Support" element={<SupportPage/>} />
                    <Route path="/starkfantasyleague" element={<HomePage />} />
                    <Route path="/tournaments/indianpremierleague" element={<PremierLeague />} />
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

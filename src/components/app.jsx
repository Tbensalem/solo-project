import React, { useState } from "react";
import Game from "./game.jsx";
import GetLeaderboard from './getLeaderBoard.jsx'


const App = (props) => {
    
    const [showLeaderBoard, setShowLeaderBoard] = useState(false)

    const toggleLeaderboard = () => {
        setShowLeaderBoard(!showLeaderBoard);
    }


    return (
        <div>
            {/* <h1 id="hello"> Does this work?</h1> */}
            <div id="game">
                <Game />
            </div>
        <button id="lButton" onClick={toggleLeaderboard}>Get Leaderboard</button>
            {showLeaderBoard ? (
                <div id="leaderboardToggle">
                <GetLeaderboard />
                </div>
            ) : null}
        </div>
    );
};

export default App;

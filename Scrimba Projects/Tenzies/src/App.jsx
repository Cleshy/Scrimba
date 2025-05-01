import "./App.css";
import Confetti from "react-confetti";
import GameContainer from "./components/GameContainer";
import GameInfo from "./components/GameInfo";
import GameBoard from "./components/GameBoard";
import { useState } from "react";

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  return (
    <>
      {showConfetti && <Confetti />}
      <GameContainer>
        <GameInfo />
        <GameBoard setShowConfetti={setShowConfetti} />
      </GameContainer>
    </>
  );
}

export default App;

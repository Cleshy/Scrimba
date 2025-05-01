import "./App.css";
import GameContainer from "./components/GameContainer";
import GameInfo from "./components/GameInfo";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <GameContainer>
      <GameInfo />
      <GameBoard />
    </GameContainer>
  );
}

export default App;

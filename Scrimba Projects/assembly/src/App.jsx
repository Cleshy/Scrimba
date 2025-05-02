import "./styles/App.css";
import GameContainer from "./components/Game/GameContainer";
import GameInfo from "./components/Game/GameInfo";
import GameBoard from "./components/Game/GameBoard";

function App() {
  return (
    <GameContainer>
      <GameInfo />
      <GameBoard />
    </GameContainer>
  );
}

export default App;

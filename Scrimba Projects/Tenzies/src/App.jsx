import "./App.css";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <section className="game-container">
      <h1 class="game-heading">Tenzies</h1>
      <p class="game-description">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <GameBoard />
    </section>
  );
}

export default App;

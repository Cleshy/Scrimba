import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <section className="game-container">
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <Board />
      <button className="btn btn-cta">New Game</button>
    </section>
  );
}

export default App;

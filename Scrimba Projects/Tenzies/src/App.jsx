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

/*
1. Add a timer and a roll counter to see how quickly you can win the game
2. Style the dice to look like real dice with pips instead of numbers
3. Deploy your project live for others to play!
*/

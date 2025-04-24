import "./App.css";
import Header from "./components/Header";
import Entry from "./components/Entry";
import data from "../data";

function App() {
  const travels = data.map((travel) => {
    return <Entry key={travel.id} travel={travel} />;
  });
  return (
    <>
      <Header />
      <section className="entry-container">{travels}</section>
    </>
  );
}

export default App;

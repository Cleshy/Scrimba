import globe from "/assets/globe.png";

export default function Header() {
  return (
    <header className="header">
      <img className="logo" src={globe} alt="Travel journal logo" />
      <h1 className="logo-title">my travel journal.</h1>
    </header>
  );
}

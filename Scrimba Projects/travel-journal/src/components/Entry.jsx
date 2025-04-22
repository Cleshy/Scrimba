import marker from "/assets/marker.png";

export default function Entry() {
  return (
    <article className="entry">
      <img
        className="entry-image"
        src="https://scrimba.com/links/travel-journal-japan-image-url"
        alt=""
      />
      <div className="entry-content">
        <div className="entry-content-top">
          <div className="entry-location-container">
            <img className="entry-marker" src={marker} alt="Marker icon" />
            <span className="entry-location">Japan</span>
          </div>
          <a className="entry-map" href="#">
            View on Google Maps
          </a>
        </div>
        <div className="entry-content-bottom">
          <h1 className="entry-title">Mount Fuji</h1>
          <p className="entry-date">12 Jan, 2023 - 24 Jan, 2023</p>
          <p className="entry-description">
            Mount Fuji is the tallest mountain in Japan, standing at 3,776
            meters (12,380 feet). Mount Fuji is the single most popular tourist
            site in Japan, for both Japanese and foreign tourists.
          </p>
        </div>
      </div>
    </article>
  );
}

import marker from "/assets/marker.png";

export default function Entry({ travel }) {
  return (
    <article className="entry">
      <img className="entry-image" src={travel.img.src} alt={travel.img.alt} />
      <div className="entry-content">
        <div className="entry-content-top">
          <div className="entry-location-container">
            <img className="entry-marker" src={marker} alt="Marker icon" />
            <span className="entry-location">{travel.country}</span>
          </div>
          <a className="entry-map" href={travel.googleMapsLink} target="_blank">
            View on Google Maps
          </a>
        </div>
        <div className="entry-content-bottom">
          <h1 className="entry-title">{travel.title}</h1>
          <p className="entry-date">{travel.dates}</p>
          <p className="entry-description">{travel.text}</p>
        </div>
      </div>
    </article>
  );
}

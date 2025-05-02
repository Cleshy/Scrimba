export default function Languages({ attempts, languages }) {
  const languageElements = languages.map((lang, currentIndex) => {
    let className = `language ${lang.value.toLowerCase()} `;

    if (currentIndex < attempts) {
      className += " language-inactive";
    }

    return (
      <span key={lang.id} className={className}>
        {lang.value}
      </span>
    );
  });

  return <div className="language-container">{languageElements}</div>;
}

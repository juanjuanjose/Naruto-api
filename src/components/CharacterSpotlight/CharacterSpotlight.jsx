import PropTypes from "prop-types";

const renderList = (items) => {
  if (!items.length) {
    return <span className="text-[var(--color-text-subtle)]">Sin datos</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="premium-pill">
          {item}
        </span>
      ))}
    </div>
  );
};

const CharacterSpotlight = ({ character }) => {
  if (!character) {
    return (
      <section className="premium-empty-state min-h-56">
        <p className="text-2xl font-bold text-[var(--color-text-primary)]">Selecciona un personaje.</p>
        <p className="max-w-2xl text-center leading-7 text-[var(--color-text-muted)]">
          El panel de detalles ampliados aparecerá aquí con biografía, clan, afiliaciones, jutsu y datos personales.
        </p>
      </section>
    );
  }

  return (
    <section className="premium-card overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-80">
          <img src={character.image} alt={character.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,15,0.05),rgba(11,11,15,0.92))]" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <span className="premium-pill">{character.village}</span>
            <h2 className="mt-4 text-left text-4xl font-black uppercase tracking-[0.08em] text-white md:text-5xl">
              {character.name}
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-white/78">{character.summary}</p>
          </div>
        </div>

        <div className="space-y-8 p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="premium-stat-card">
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-text-subtle)]">Clan</p>
              <p className="mt-3 text-2xl font-bold text-[var(--color-text-primary)]">{character.clan}</p>
            </div>
            <div className="premium-stat-card">
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-text-subtle)]">Rango</p>
              <p className="mt-3 text-2xl font-bold text-[var(--color-text-primary)]">{character.rank}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">Debut</h3>
              <ul className="mt-4 space-y-2 text-[var(--color-text-muted)]">
                {character.debutEntries.map(([label, value]) => (
                  <li key={label}>
                    <span className="font-semibold text-[var(--color-text-primary)]">{label}: </span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">Perfil personal</h3>
              <ul className="mt-4 space-y-2 text-[var(--color-text-muted)]">
                {character.personalEntries.map(([label, value]) => (
                  <li key={label}>
                    <span className="font-semibold text-[var(--color-text-primary)]">{label}: </span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">Afinidades y equipo</h3>
            <div className="mt-4 space-y-4">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[var(--color-text-subtle)]">Naturalezas</p>
                {renderList(character.natureTypes)}
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[var(--color-text-subtle)]">Jutsu destacados</p>
                {renderList(character.jutsuHighlights)}
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[var(--color-text-subtle)]">Afiliaciones</p>
                {renderList(character.affiliations)}
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[var(--color-text-subtle)]">Familia</p>
                {renderList(character.familyHighlights)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

CharacterSpotlight.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    village: PropTypes.string.isRequired,
    clan: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    debutEntries: PropTypes.arrayOf(PropTypes.array).isRequired,
    personalEntries: PropTypes.arrayOf(PropTypes.array).isRequired,
    natureTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    jutsuHighlights: PropTypes.arrayOf(PropTypes.string).isRequired,
    affiliations: PropTypes.arrayOf(PropTypes.string).isRequired,
    familyHighlights: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

CharacterSpotlight.defaultProps = {
  character: null,
};

export default CharacterSpotlight;

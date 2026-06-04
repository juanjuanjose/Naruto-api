import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Heart, Sparkles } from "lucide-react";

const FAVORITES_STORAGE_KEY = "favorites";

const getStoredFavorites = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const CharacterCard = ({ character, isSelected, onSelect }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = getStoredFavorites();
    setIsFavorite(
      storedFavorites.includes(character.id) ||
        storedFavorites.includes(String(character.id)) ||
        storedFavorites.includes(character.name),
    );
  }, [character.id, character.name]);

  const handleFavoriteClick = () => {
    const storedFavorites = getStoredFavorites();
    const favoriteId = String(character.id);
    const updatedFavorites = isFavorite
      ? storedFavorites.filter(
          (favorite) => favorite !== favoriteId && favorite !== character.id && favorite !== character.name,
        )
      : [...storedFavorites.filter((favorite) => favorite !== character.name), favoriteId];

    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <article
      className={`premium-card group flex h-full flex-col overflow-hidden transition duration-300 ${
        isSelected ? "ring-1 ring-[var(--color-accent)] shadow-[0_0_35px_rgba(255,120,0,0.18)]" : ""
      }`}
    >
      <div className="relative aspect-[4/4.2] overflow-hidden">
        <img
          src={character.image}
          alt={`Personaje ${character.name}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_10%,rgba(11,11,15,0.28)_55%,rgba(11,11,15,0.95)_100%)]" />
        <div className="absolute right-4 top-4 flex gap-2">
          <span className="premium-pill border-red-500/30 bg-red-500/10 text-red-200">{character.rank}</span>
          <span className="premium-pill">{character.village}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
            {character.clan}
          </p>
          <h3 className="mt-2 text-3xl font-black text-white">{character.name}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/75">{character.summary}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-white/4 p-3">
            <p className="text-xs uppercase tracking-[0.26em] text-[var(--color-text-subtle)]">Debut</p>
            <p className="mt-2 text-sm font-medium text-[var(--color-text-primary)]">{character.debutLabel}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/4 p-3">
            <p className="text-xs uppercase tracking-[0.26em] text-[var(--color-text-subtle)]">Naturaleza</p>
            <p className="mt-2 text-sm font-medium text-[var(--color-text-primary)]">{character.natureSummary}</p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-[var(--color-text-subtle)]">Jutsu destacados</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {character.jutsuHighlights.map((jutsu) => (
              <span key={jutsu} className="premium-pill">
                {jutsu}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleFavoriteClick}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 font-semibold transition ${
              isFavorite
                ? "bg-red-500 text-white hover:bg-red-400"
                : "border border-white/10 bg-white/5 text-[var(--color-text-primary)] hover:border-red-400/50 hover:bg-white/8"
            }`}
            aria-pressed={isFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} aria-hidden="true" />
            <span>{isFavorite ? "Favorito guardado" : "Guardar favorito"}</span>
          </button>

          <button type="button" onClick={onSelect} className="premium-button-primary inline-flex flex-1 items-center justify-center gap-2">
            <Sparkles className="h-5 w-5" />
            {isSelected ? "Detalle activo" : "Ver detalles"}
          </button>
        </div>
      </div>
    </article>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    clan: PropTypes.string.isRequired,
    village: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    debutLabel: PropTypes.string.isRequired,
    natureSummary: PropTypes.string.isRequired,
    jutsuHighlights: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CharacterCard;

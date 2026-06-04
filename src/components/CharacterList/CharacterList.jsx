import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";
import CharacterCard from "../CharacterCard/CharacterCard";

const CharacterList = ({
  characters,
  loading,
  error,
  page,
  limit,
  total,
  hasPrev,
  hasNext,
  selectedCharacterId,
  searchTerm,
  onSearchChange,
  onRetry,
  onPageChange,
  onSelectCharacter,
}) => {
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  const rangeStart = total === 0 ? 0 : (page - 1) * limit + 1;
  const rangeEnd = total === 0 ? 0 : Math.min(page * limit, total);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-black/35 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur-md lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">
            Archivo Dattebayo
          </p>
          <h2 className="text-3xl font-black uppercase tracking-[0.08em] text-[var(--color-text-primary)] md:text-4xl">
            Personajes de Naruto
          </h2>
          <p className="max-w-2xl leading-7 text-[var(--color-text-muted)]">
            Página {page} · mostrando {rangeStart}-{rangeEnd} de {total} registros. Usa la búsqueda local para filtrar el lote visible sin romper la paginación del API.
          </p>
        </div>

        <label className="relative block w-full max-w-md">
          <span className="sr-only">Buscar personaje</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-subtle)]" />
          <input
            type="search"
            placeholder="Buscar en esta página..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full rounded-full border border-white/10 bg-white/5 py-3 pr-4 pl-12 text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-accent)] focus:bg-white/8"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-muted)]">
        <span className="premium-pill">Límite: {limit}</span>
        <span className="premium-pill">Resultados visibles: {filteredCharacters.length}</span>
        <span className="premium-pill">Favoritos persisten en localStorage</span>
      </div>

      {loading ? (
        <div className="premium-empty-state min-h-72">
          <Loader2 className="h-10 w-10 animate-spin text-[var(--color-accent)]" />
          <p className="text-lg text-[var(--color-text-primary)]">Cargando archivos shinobi...</p>
        </div>
      ) : null}

      {!loading && error ? (
        <div className="premium-empty-state min-h-72">
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">No pudimos cargar los personajes.</p>
          <p className="max-w-xl text-center leading-7 text-[var(--color-text-muted)]">{error}</p>
          <button type="button" onClick={onRetry} className="premium-button-primary">
            Reintentar carga
          </button>
        </div>
      ) : null}

      {!loading && !error && filteredCharacters.length === 0 ? (
        <div className="premium-empty-state min-h-72">
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">Sin resultados visibles.</p>
          <p className="max-w-xl text-center leading-7 text-[var(--color-text-muted)]">
            No encontramos personajes para esta búsqueda o página. Ajusta el filtro o cambia de página.
          </p>
        </div>
      ) : null}

      {!loading && !error && filteredCharacters.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              isSelected={selectedCharacterId === character.id}
              onSelect={() => onSelectCharacter(character)}
            />
          ))}
        </div>
      ) : null}

      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-black/30 p-5 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-6 text-[var(--color-text-muted)]">
          Navega por la colección oficial del API usando el estado de la URL para compartir o refrescar la página sin perder el contexto.
        </p>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrev || loading}
            className="premium-button-secondary inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </button>
          <span className="premium-pill">Página {page}</span>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNext || loading}
            className="premium-button-secondary inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  hasPrev: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired,
  selectedCharacterId: PropTypes.number,
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSelectCharacter: PropTypes.func.isRequired,
};

CharacterList.defaultProps = {
  error: null,
  selectedCharacterId: null,
};

export default CharacterList;

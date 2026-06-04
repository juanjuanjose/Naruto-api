import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CharacterList from "../../components/CharacterList/CharacterList";
import CharacterSpotlight from "../../components/CharacterSpotlight/CharacterSpotlight";
import { fetchCharacters } from "../../services/characters";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

const clampPositiveNumber = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) || parsed < 1 ? fallback : parsed;
};

const Characters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = useState([]);
  const [pagination, setPagination] = useState({
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
    total: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  const page = clampPositiveNumber(searchParams.get("page"), DEFAULT_PAGE);
  const limit = clampPositiveNumber(searchParams.get("limit"), DEFAULT_LIMIT);

  useEffect(() => {
    const normalized = new URLSearchParams(searchParams);
    let shouldUpdate = false;

    if (searchParams.get("page") !== String(page)) {
      normalized.set("page", String(page));
      shouldUpdate = true;
    }

    if (searchParams.get("limit") !== String(limit)) {
      normalized.set("limit", String(limit));
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      setSearchParams(normalized, { replace: true });
    }
  }, [limit, page, searchParams, setSearchParams]);

  useEffect(() => {
    let isActive = true;

    const loadCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchCharacters({ page, limit });
        if (!isActive) {
          return;
        }

        setCharacters(response.items);
        setPagination({
          page: response.page,
          limit: response.limit,
          total: response.total,
          hasNext: response.hasNext,
          hasPrev: response.hasPrev,
        });
        setSelectedCharacter((current) => {
          const nextSelected = response.items.find((character) => character.id === current?.id);
          return nextSelected ?? response.items[0] ?? null;
        });
      } catch (fetchError) {
        if (!isActive) {
          return;
        }

        setCharacters([]);
        setPagination((current) => ({
          ...current,
          page,
          limit,
          total: 0,
          hasNext: false,
          hasPrev: page > 1,
        }));
        setSelectedCharacter(null);
        setError(fetchError.message);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadCharacters();

    return () => {
      isActive = false;
    };
  }, [page, limit, retryKey]);

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage === page) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", String(nextPage));
    nextParams.set("limit", String(limit));
    setSearchParams(nextParams);
  };

  const handleRetry = () => setRetryKey((current) => current + 1);

  const selectedCharacterDetails = useMemo(() => selectedCharacter, [selectedCharacter]);

  return (
    <main className="page-shell px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <section className="premium-highlight-panel space-y-5">
          <span className="premium-pill">Ruta dedicada /characters</span>
          <h1 className="text-4xl font-black uppercase tracking-[0.08em] text-[var(--color-text-primary)] md:text-6xl">
            Navega el archivo shinobi con paginación real y detalles ricos.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[var(--color-text-muted)]">
            Esta vista consume el API de Dattebayo con <code className="rounded bg-black/30 px-2 py-1 text-sm">page</code> y <code className="rounded bg-black/30 px-2 py-1 text-sm">limit</code> para mostrar más personajes, mantener URLs compartibles y revelar más contexto por ficha.
          </p>
        </section>

        <CharacterList
          characters={characters}
          loading={loading}
          error={error}
          page={pagination.page}
          limit={pagination.limit}
          total={pagination.total}
          hasPrev={pagination.hasPrev}
          hasNext={pagination.hasNext}
          selectedCharacterId={selectedCharacterDetails?.id ?? null}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onRetry={handleRetry}
          onPageChange={handlePageChange}
          onSelectCharacter={setSelectedCharacter}
        />

        <CharacterSpotlight character={selectedCharacterDetails} />
      </div>
    </main>
  );
};

export default Characters;

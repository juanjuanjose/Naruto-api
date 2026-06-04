import mapCharacter from "../lib/characters/mapCharacter";

const CHARACTERS_ENDPOINT = "https://dattebayo-api.onrender.com/characters";

export const fetchCharacters = async ({ page, limit }) => {
  const response = await fetch(`${CHARACTERS_ENDPOINT}?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error("El archivo Dattebayo no respondió correctamente. Intenta de nuevo.");
  }

  const data = await response.json();
  const items = Array.isArray(data.characters) ? data.characters.map(mapCharacter) : [];
  const total = Number(data.total) || 0;
  const currentPage = Number(data.currentPage) || page;
  const pageSize = Number(data.pageSize) || limit;
  const totalPages = pageSize > 0 ? Math.ceil(total / pageSize) : 0;

  return {
    items,
    page: currentPage,
    limit: pageSize,
    total,
    hasPrev: currentPage > 1,
    hasNext: totalPages > currentPage,
  };
};

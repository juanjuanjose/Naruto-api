const FALLBACK_IMAGE = "/spiner/placeholder.png";

const toArray = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }

  return [];
};

const formatValue = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join(", ");
  }

  if (value && typeof value === "object") {
    return Object.values(value)
      .flatMap((entry) => toArray(entry))
      .join(", ");
  }

  if (typeof value === "string") {
    return value;
  }

  return "Unknown";
};

const summarizeEntries = (entries, fallback) => {
  if (!entries.length) {
    return fallback;
  }

  return entries.slice(0, 3).join(", ");
};

const buildSummary = ({ personal, family, natureTypes, jutsu }) => {
  const classification = formatValue(personal.classification);
  const affiliation = summarizeEntries(toArray(personal.affiliation), "Sin afiliación registrada");
  const technique = summarizeEntries(jutsu, "Sin jutsu destacados");
  const nature = summarizeEntries(natureTypes, "Naturaleza desconocida");
  const familyLead = Object.values(family || {}).find(Boolean);

  return [classification, familyLead ? `Vínculo clave: ${familyLead}` : null, `Afiliación: ${affiliation}`, `Técnicas: ${technique}`, `Naturaleza: ${nature}`]
    .filter(Boolean)
    .slice(0, 3)
    .join(" · ");
};

const mapEntries = (record, limit = 4) =>
  Object.entries(record || {})
    .filter(([, value]) => value)
    .slice(0, limit)
    .map(([label, value]) => [label, formatValue(value)]);

export const mapCharacter = (character) => {
  const personal = character.personal || {};
  const family = character.family || {};
  const debut = character.debut || {};
  const rank = character.rank?.ninjaRank || {};
  const jutsu = toArray(character.jutsu);
  const natureTypes = toArray(character.natureType);
  const images = toArray(character.images);
  const affiliations = toArray(personal.affiliation);
  const familyHighlights = mapEntries(family, 4).map(([label, value]) => `${label}: ${value}`);
  const debutEntries = mapEntries(debut, 4);
  const personalEntries = mapEntries(
    {
      sexo: personal.sex,
      cumpleaños: personal.birthdate,
      clan: personal.clan,
      ocupación: personal.occupation,
      clasificación: personal.classification,
    },
    5,
  );

  return {
    id: character.id,
    name: character.name || "Unknown",
    image: images[0] || FALLBACK_IMAGE,
    clan: personal.clan || "Clan desconocido",
    village: summarizeEntries(affiliations, "Aldea desconocida"),
    natureTypes,
    natureSummary: summarizeEntries(natureTypes, "Sin afinidad elemental"),
    debutLabel: debut.manga || debut.anime || "Debut desconocido",
    debutEntries,
    jutsuHighlights: jutsu.slice(0, 4).length ? jutsu.slice(0, 4) : ["Sin jutsu registrados"],
    rank: formatValue(rank.PartII || rank.PartI || Object.values(rank)[0] || personal.occupation || "Shinobi"),
    affiliations: affiliations.slice(0, 4),
    familyHighlights,
    personalEntries,
    summary: buildSummary({ personal, family, natureTypes, jutsu }),
  };
};

export default mapCharacter;

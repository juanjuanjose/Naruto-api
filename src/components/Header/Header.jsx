import { CircleUser, ScrollText, Swords } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  [
    "rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] transition duration-300",
    isActive
      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/15 text-[var(--color-text-primary)] shadow-[0_0_30px_rgba(255,120,0,0.18)]"
      : "border-white/10 bg-white/5 text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/60 hover:bg-white/8 hover:text-[var(--color-text-primary)]",
  ].join(" ");

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="sticky top-0 inset-x-0 z-[1000] border-b border-white/10 bg-[linear-gradient(180deg,rgba(11,11,15,0.95),rgba(11,11,15,0.75))] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-4 self-start"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="relative h-14 w-14 overflow-hidden rounded-full border border-[var(--color-accent)]/40 bg-black/40 shadow-[0_0_30px_rgba(255,120,0,0.15)]">
            <img
              className={`absolute inset-0 h-full w-full object-contain p-2 transition-all duration-500 ${
                isHovered ? "scale-110 opacity-0" : "scale-100 opacity-100"
              }`}
              src="/logo/konoha.png"
              alt="Logo Konoha"
            />
            <img
              className={`absolute inset-0 h-full w-full object-contain p-2 transition-all duration-500 ${
                isHovered ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
              src="/logo/akatsuki.png"
              alt="Logo Akatsuki"
            />
          </span>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">
              Naruto premium archive
            </p>
            <p className="text-lg font-semibold text-[var(--color-text-primary)] md:text-xl">
              Aldea, archivos y leyendas shinobi
            </p>
          </div>
        </NavLink>

        <nav className="flex flex-wrap items-center gap-3">
          <NavLink to="/" className={navLinkClass} end>
            <span className="inline-flex items-center gap-2">
              <ScrollText className="h-4 w-4" />
              Inicio
            </span>
          </NavLink>

          <NavLink to="/characters" className={navLinkClass}>
            <span className="inline-flex items-center gap-2">
              <Swords className="h-4 w-4" />
              Personajes
            </span>
          </NavLink>

          <NavLink to="/login" className={navLinkClass}>
            <span className="inline-flex items-center gap-2">
              <CircleUser className="h-4 w-4" />
              Login
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;

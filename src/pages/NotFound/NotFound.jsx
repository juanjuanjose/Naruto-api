import { ArrowLeft, SearchX } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="page-shell flex items-center px-4 py-16 md:px-8">
      <section className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="premium-card overflow-hidden p-4 md:p-6">
          <div className="overflow-hidden rounded-[1.5rem] border border-[var(--color-accent)]/35 bg-black/30">
            <img src="/Naruto/crying.gif" alt="Naruto triste" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="space-y-6">
          <span className="premium-pill border-red-500/30 bg-red-500/10 text-red-200">Error 404</span>
          <div className="space-y-4">
            <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-[var(--color-accent)]">
              <SearchX className="h-6 w-6" />
            </div>
            <h1 className="text-5xl font-black uppercase leading-none tracking-[0.08em] text-[var(--color-text-primary)] md:text-6xl">
              Página no encontrada
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
              Te saliste del mapa ninja. La ruta que intentaste abrir no existe, pero el nuevo sistema visual mantiene una salida clara para volver al inicio o entrar directo al archivo de personajes.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/" className="premium-button-primary inline-flex items-center gap-3">
              <ArrowLeft className="h-5 w-5" />
              Volver al inicio
            </Link>
            <Link to="/characters" className="premium-button-secondary inline-flex items-center gap-3">
              Ir a personajes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;

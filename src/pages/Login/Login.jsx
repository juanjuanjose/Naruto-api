import { ArrowRight, Github, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="page-shell">
      <section className="relative isolate overflow-hidden px-4 py-20 md:px-8">
        <div className="absolute inset-0 bg-[url('/wallpaper/narutofight.gif')] bg-cover bg-center bg-no-repeat opacity-30" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(181,38,38,0.28),transparent_28%),linear-gradient(180deg,rgba(11,11,15,0.72),rgba(11,11,15,0.95))]" />

        <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <span className="premium-pill">Acceso premium</span>
            <h1 className="text-5xl font-black uppercase leading-none tracking-[0.08em] text-[var(--color-text-primary)] md:text-6xl">
              Inicia sesión y vuelve al archivo shinobi.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
              Este acceso mantiene la estética premium del resto de la app y prepara el terreno para futuras experiencias personalizadas alrededor de favoritos, rutas y colecciones.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="premium-stat-card">
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-subtle)]">Estado</p>
                <p className="mt-3 text-2xl font-bold text-[var(--color-text-primary)]">Demo UI</p>
              </div>
              <div className="premium-stat-card">
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-subtle)]">Próximo paso</p>
                <p className="mt-3 text-2xl font-bold text-[var(--color-text-primary)]">Integrar auth real</p>
              </div>
            </div>
          </div>

          <div className="premium-card p-8 md:p-10">
            <div className="mb-6 inline-flex rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 p-3 text-[var(--color-accent)]">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <h2 className="text-left text-3xl font-black uppercase tracking-[0.08em] text-[var(--color-text-primary)]">
              Iniciar sesión
            </h2>
            <p className="mt-4 leading-7 text-[var(--color-text-muted)]">
              Usa GitHub para continuar. Hoy es una acción demostrativa, pero la interfaz ya está alineada con el nuevo sistema visual premium.
            </p>

            <button
              type="button"
              onClick={() => alert("GitHub Login")}
              className="premium-button-primary mt-8 inline-flex w-full items-center justify-center gap-3"
            >
              <Github className="h-5 w-5" />
              Continuar con GitHub
            </button>

            <Link to="/characters" className="premium-button-secondary mt-4 inline-flex w-full items-center justify-center gap-3">
              Ir al archivo de personajes
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;

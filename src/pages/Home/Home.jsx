import { ArrowRight, ChevronDown, Shield, Sparkles, Swords } from "lucide-react";
import { Link } from "react-router-dom";
import Separator from "../../components/Separator/Separator";

const featureCards = [
  {
    icon: Shield,
    title: "Archivo premium",
    description:
      "Un recorrido visual inspirado en Konoha para descubrir linajes, rangos y vínculos sin ruido en la experiencia.",
  },
  {
    icon: Swords,
    title: "Exploración dedicada",
    description:
      "La búsqueda de personajes vive en su propia ruta para navegar páginas, revisar detalles y volver sin perder contexto.",
  },
  {
    icon: Sparkles,
    title: "Detalles ricos",
    description:
      "Cada ficha reúne jutsu, debut, naturaleza y datos personales para que el universo Naruto se sienta completo.",
  },
];

function Home() {
  return (
    <main className="page-shell">
      <section className="relative isolate overflow-hidden px-4 py-24 md:px-8 md:py-32">
        <div
          className="absolute inset-0 bg-[url('/wallpaper/konohawallpaper.jpeg')] bg-cover bg-center bg-no-repeat"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,120,0,0.22),transparent_35%),linear-gradient(180deg,rgba(11,11,15,0.2),rgba(11,11,15,0.92))]" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-8">
            <span className="premium-pill">Premium Naruto experience</span>
            <div className="space-y-5">
              <h1 className="text-5xl font-black uppercase leading-none tracking-[0.06em] text-[var(--color-text-primary)] md:text-7xl">
                La historia ninja ahora tiene su propia sala de guerra.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-muted)] md:text-xl">
                Explora personajes, clanes y habilidades desde una interfaz premium pensada para revisar el legado de Naruto con más contexto y mejor jerarquía visual.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/characters" className="premium-button-primary inline-flex items-center gap-3">
                Explorar personajes
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/login" className="premium-button-secondary inline-flex items-center gap-3">
                Acceso shinobi
              </Link>
            </div>

            <dl className="grid gap-4 sm:grid-cols-3">
              <div className="premium-stat-card">
                <dt className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-subtle)]">Rutas clave</dt>
                <dd className="mt-2 text-3xl font-bold text-[var(--color-text-primary)]">3</dd>
              </div>
              <div className="premium-stat-card">
                <dt className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-subtle)]">Experiencia</dt>
                <dd className="mt-2 text-3xl font-bold text-[var(--color-text-primary)]">Premium</dd>
              </div>
              <div className="premium-stat-card">
                <dt className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-subtle)]">Fuente de datos</dt>
                <dd className="mt-2 text-3xl font-bold text-[var(--color-text-primary)]">Dattebayo</dd>
              </div>
            </dl>
          </div>

          <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-black/45 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <img
              src="/Naruto/naruto.png"
              alt="Naruto Uzumaki"
              className="mx-auto w-full max-w-sm object-contain drop-shadow-[0_20px_50px_rgba(255,120,0,0.35)]"
              loading="eager"
            />
          </div>
        </div>

        <ChevronDown className="relative mx-auto mt-16 h-12 w-12 animate-bounce text-[var(--color-accent)]" aria-hidden="true" />
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-20 md:px-8">
        <div className="space-y-5 text-center md:text-left">
          <Separator />
          <span className="premium-pill">Nueva arquitectura</span>
          <h2 className="text-4xl font-black uppercase tracking-[0.08em] text-[var(--color-text-primary)] md:text-5xl">
            El inicio cuenta la historia. Los personajes viven en su propia ruta.
          </h2>
          <p className="max-w-3xl text-lg leading-8 text-[var(--color-text-muted)]">
            Separar la landing del navegador de personajes mejora la navegación, el rendimiento mental y la capacidad de volver a una página exacta del catálogo.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featureCards.map(({ icon: Icon, title, description }) => (
            <article key={title} className="premium-card p-8">
              <div className="mb-5 inline-flex rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 p-3 text-[var(--color-accent)]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">{title}</h3>
              <p className="mt-4 leading-7 text-[var(--color-text-muted)]">{description}</p>
            </article>
          ))}
        </div>

        <div className="premium-highlight-panel flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <span className="premium-pill">Siguiente misión</span>
            <h3 className="text-3xl font-bold text-[var(--color-text-primary)] md:text-4xl">
              Entra al archivo de personajes y revisa más shinobi página por página.
            </h3>
            <p className="text-[var(--color-text-muted)] leading-7">
              La nueva vista de personajes mantiene favoritos, muestra más datos por ficha y permite profundizar en la biografía de cada ninja sin mezclar la navegación con la landing.
            </p>
          </div>

          <Link to="/characters" className="premium-button-primary inline-flex items-center justify-center gap-3 self-start lg:self-center">
            Ir a personajes
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;

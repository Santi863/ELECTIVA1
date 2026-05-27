import { ImageManager } from './components/ImageManager'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Reto 2: ImageManager
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Se consume la API con <span className="font-semibold">useEffect</span>, se
            guarda en <span className="font-mono">useState</span> y se renderizan
            imágenes con <span className="font-semibold">map()</span>.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <ImageManager />
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-400">
          React + TypeScript + Vite + Tailwind CSS
        </div>
      </footer>
    </div>
  )
}

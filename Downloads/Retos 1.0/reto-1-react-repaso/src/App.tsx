import { useMemo, useState } from 'react'
import type { Animal } from './types/animal'
import { Welcome } from './components/Welcome'
import { AnimalGrid } from './components/AnimalGrid'

const INITIAL_ANIMALS: Animal[] = [
  { name: 'Luna', age: 3, color: 'Negro', isPet: true, height: 0.35 },
  { name: 'Max', age: 5, color: 'Café', isPet: true, height: 0.55 },
  { name: 'Kiwi', age: 1, color: 'Verde', isPet: false, height: 0.12 },
  { name: 'Nala', age: 2, color: 'Blanco', isPet: true, height: 0.25 },
  { name: 'Rex', age: 4, color: 'Gris', isPet: false, height: 0.75 },
]

export default function App() {
  const [animals, setAnimals] = useState<Animal[]>(INITIAL_ANIMALS)
  const [apiAnimals, setApiAnimals] = useState<Animal[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalPets = useMemo(
    () => animals.filter((a) => a.isPet).length,
    [animals],
  )

  async function fetchAnimals() {
    try {
      setIsLoading(true)
      setError(null)

      const res = await fetch('https://electiva5-api.apolobyte.top/animals')
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

      const data: Animal[] = await res.json()
      setApiAnimals(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Welcome student="Electiva 1" />
          <p className="mt-2 text-sm text-slate-300">
            Animales locales: <span className="font-semibold">{animals.length}</span>{' '}
            · Mascotas: <span className="font-semibold">{totalPets}</span>
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Lista inicial (useState)</h2>
              <p className="text-sm text-slate-300">
                Se renderiza con <span className="font-mono">map()</span> y muestra un
                mensaje con operador ternario según{' '}
                <span className="font-mono">isPet</span>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAnimals((prev) => [...prev].reverse())}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-400 active:bg-indigo-600"
            >
              Reordenar (ejemplo setState)
            </button>
          </div>

          <div className="mt-6">
            <AnimalGrid animals={animals} />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Animales desde API (fetch + async/await)</h2>
              <p className="text-sm text-slate-300">
                Endpoint:{' '}
                <span className="font-mono">/animals</span>
              </p>
            </div>
            <button
              type="button"
              onClick={fetchAnimals}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-sm transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Cargando…' : 'Consultar API'}
            </button>
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <div className="mt-6">
            <AnimalGrid animals={apiAnimals} emptyState="Aún no has consultado la API." />
          </div>
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

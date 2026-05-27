import type { Animal } from '../../interfaces/animal'
import { AnimalGrid } from '../AnimalGrid'
import { Panel } from '../ui/Panel'
import { PrimaryButton } from '../ui/PrimaryButton'

type AnimalsSectionProps = {
  animals: Animal[]
  apiAnimals: Animal[]
  totalPets: number
  isLoading: boolean
  error: string | null
  onFetchAnimals: () => Promise<void>
  onReorder: () => void
}

export function AnimalsSection({
  animals,
  apiAnimals,
  totalPets,
  isLoading,
  error,
  onFetchAnimals,
  onReorder,
}: AnimalsSectionProps) {
  return (
    <Panel>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Animales (useState + ternario)</h2>
          <p className="mt-1 text-sm text-slate-300">
            Total mascotas: <span className="font-semibold">{totalPets}</span>
          </p>
        </div>

        <PrimaryButton type="button" onClick={onReorder} className="bg-indigo-500">
          Reordenar
        </PrimaryButton>
      </div>

      <div className="mt-6">
        <AnimalGrid animals={animals} />
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/20 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold">Animales desde API</h3>
            <p className="mt-1 text-sm text-slate-300">
              Endpoint: <span className="font-mono">{'/animals'}</span>
            </p>
          </div>
          <PrimaryButton
            type="button"
            onClick={onFetchAnimals}
            disabled={isLoading}
            className="bg-emerald-500 text-emerald-950"
          >
            {isLoading ? 'Cargando…' : 'Consultar API'}
          </PrimaryButton>
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <div className="mt-6">
          <AnimalGrid
            animals={apiAnimals}
            emptyState="Aún no se han cargado animales de la API."
          />
        </div>
      </div>
    </Panel>
  )
}


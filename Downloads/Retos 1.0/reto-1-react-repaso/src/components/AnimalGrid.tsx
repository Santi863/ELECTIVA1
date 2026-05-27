import type { Animal } from '../types/animal'
import { AnimalCard } from './AnimalCard'

type AnimalGridProps = {
  animals: Animal[]
  emptyState?: string
}

export function AnimalGrid({ animals, emptyState = 'No hay animales para mostrar.' }: AnimalGridProps) {
  if (animals.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center text-sm text-slate-300">
        {emptyState}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {animals.map((animal) => (
        <AnimalCard key={`${animal.name}-${animal.age}-${animal.color}`} animal={animal} />
      ))}
    </div>
  )
}


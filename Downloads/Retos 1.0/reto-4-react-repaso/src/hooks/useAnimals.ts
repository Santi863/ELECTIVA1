import { useMemo, useState } from 'react'
import type { Animal } from '../interfaces/animal'
import { API_BASE_URL } from '../lib/constants'

const INITIAL_ANIMALS: Animal[] = [
  { name: 'Luna', age: 3, color: 'Negro', isPet: true, height: 0.35 },
  { name: 'Max', age: 5, color: 'Café', isPet: true, height: 0.55 },
  { name: 'Kiwi', age: 1, color: 'Verde', isPet: false, height: 0.12 },
  { name: 'Nala', age: 2, color: 'Blanco', isPet: true, height: 0.25 },
  { name: 'Rex', age: 4, color: 'Gris', isPet: false, height: 0.75 },
]

export function useAnimals() {
  const [animals, setAnimals] = useState<Animal[]>(INITIAL_ANIMALS)
  const [apiAnimals, setApiAnimals] = useState<Animal[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalPets = useMemo(
    () => animals.filter((a) => a.isPet).length,
    [animals],
  )

  async function fetchAnimals(): Promise<void> {
    try {
      setIsLoading(true)
      setError(null)

      const res = await fetch(`${API_BASE_URL}/animals`)
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

      const data: Animal[] = await res.json()
      setApiAnimals(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  function reorderAnimals() {
    setAnimals((prev) => [...prev].reverse())
  }

  return {
    animals,
    apiAnimals,
    isLoading,
    error,
    totalPets,
    fetchAnimals,
    reorderAnimals,
  }
}


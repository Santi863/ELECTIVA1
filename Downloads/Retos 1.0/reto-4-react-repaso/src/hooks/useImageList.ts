import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../lib/constants'

export function useImageList() {
  const [images, setImages] = useState<string[] | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchImageList(): Promise<void> {
    try {
      setIsLoading(true)
      setError(null)

      const res = await fetch(`${API_BASE_URL}/list-images`)
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

      const data: unknown = await res.json()
      if (Array.isArray(data) && data.every((x) => typeof x === 'string')) {
        setImages(data)
        return
      }

      throw new Error('Formato inesperado en la respuesta')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  // El reto pide ejecutar la consulta una sola vez.
  useEffect(() => {
    fetchImageList()
  }, [])

  return {
    images,
    isLoading,
    error,
    fetchImageList,
  }
}


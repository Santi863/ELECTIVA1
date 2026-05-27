import { useEffect, useState } from 'react'

const API_BASE_URL = 'https://electiva5-api.apolobyte.top'

type ImageManagerState = string[] | undefined

export function ImageManager() {
  // El reto pide exactamente este tipo:
  // const [images, setImages] = useState<string[] | undefined>()
  const [images, setImages] = useState<ImageManagerState>()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchImageList(): Promise<void> {
    try {
      setIsLoading(true)
      setError(null)

      const res = await fetch(`${API_BASE_URL}/list-images`)
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

      const data: unknown = await res.json()

      // La API puede devolver array directamente. Si no, no romperá el UI.
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

  // El reto pide usar useEffect para ejecutar la consulta una sola vez.
  useEffect(() => {
    fetchImageList()
  }, [])

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Gestor de imágenes</h2>
          <p className="mt-1 text-sm text-slate-300">
            Endpoint: <span className="font-mono">{'/list-images'}</span>
          </p>
        </div>

        <div className="text-xs text-slate-400">
          {images ? (
            <span>
              Imágenes encontradas: <span className="font-semibold">{images.length}</span>
            </span>
          ) : (
            <span>Primero cargando…</span>
          )}
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
          Cargando imágenes…
        </div>
      ) : null}

      {images && images.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((name) => {
            // El reto pide construir así la URL:
            // https://electiva5-api.apolobyte.top/uploads/NOMBRE_IMAGEN
            const imageUrl = `${API_BASE_URL}/uploads/${name}`

            return (
              <figure
                key={name}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm transition hover:border-white/20"
              >
                <div className="relative aspect-[4/3] bg-slate-900">
                  <img
                    src={imageUrl}
                    alt={name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                <figcaption className="truncate px-4 py-3 text-xs text-slate-200">
                  {name}
                </figcaption>
              </figure>
            )
          })}
        </div>
      ) : !isLoading ? (
        <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center text-sm text-slate-300">
          No hay imágenes para mostrar.
        </div>
      ) : null}
    </div>
  )
}


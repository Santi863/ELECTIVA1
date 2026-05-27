import { API_BASE_URL } from '../lib/constants'

type ImageGalleryProps = {
  images: string[] | undefined
}

export function ImageGallery({ images }: ImageGalleryProps) {
  if (!images) return null

  if (images.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center text-sm text-slate-300">
        No hay imágenes para mostrar.
      </div>
    )
  }

  return (
    <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((name) => {
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
  )
}


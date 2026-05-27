import { ImageGallery } from '../ImageGallery'
import { Panel } from '../ui/Panel'
import { PrimaryButton } from '../ui/PrimaryButton'

type ImagesSectionProps = {
  images: string[] | undefined
  isLoading: boolean
  error: string | null
}

export function ImagesSection({ images, isLoading, error }: ImagesSectionProps) {
  return (
    <Panel>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Imágenes (fetch + map)</h2>
          <p className="mt-1 text-sm text-slate-300">
            Endpoint: <span className="font-mono">{'/list-images'}</span>
          </p>
        </div>

        <PrimaryButton type="button" disabled className="bg-slate-700">
          Carga automática
        </PrimaryButton>
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

      <div className="mt-6">
        <ImageGallery images={images} />
      </div>
    </Panel>
  )
}


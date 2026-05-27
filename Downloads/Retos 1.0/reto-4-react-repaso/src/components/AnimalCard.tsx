import type { Animal } from '../interfaces/animal'

type AnimalCardProps = {
  animal: Animal
}

export function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 shadow-sm transition hover:border-white/20 hover:bg-slate-950/60">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-white">{animal.name}</h3>
          <p className="mt-1 text-xs text-slate-400">
            Color: <span className="text-slate-200">{animal.color}</span>
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
          {animal.age} años
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-slate-400">Altura</p>
          <p className="mt-1 font-semibold text-white">{animal.height} m</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-slate-400">Tipo</p>
          <p className="mt-1 font-semibold text-white">
            {animal.isPet ? 'Es mascota' : 'No es mascota'}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-200">
        {animal.isPet ? (
          <span className="text-emerald-300">Este animal vive con personas.</span>
        ) : (
          <span className="text-amber-300">Este animal no es mascota.</span>
        )}
      </p>
    </article>
  )
}


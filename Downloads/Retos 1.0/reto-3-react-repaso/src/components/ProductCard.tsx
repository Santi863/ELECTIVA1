import type { Product } from '../interfaces/product'

const API_BASE_URL = 'https://electiva5-api.apolobyte.top'

type ProductCardProps = {
  product: Product
}

function resolveProductImageUrl(imageUrl: string): string {
  // Si la imagen ya viene como URL completa, la usamos.
  if (imageUrl.startsWith('http')) return imageUrl
  return `${API_BASE_URL}/uploads/${imageUrl}`
}

export function ProductCard({ product }: ProductCardProps) {
  const imageSrc = resolveProductImageUrl(product.imageUrl)

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/30 shadow-sm transition hover:border-white/20">
      <div className="relative aspect-[16/10] bg-slate-900">
        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold text-slate-200 backdrop-blur">
          {product.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-white">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-300">{product.description}</p>

        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="rounded-xl border border-white/10 bg-white/5 p-2">
            <p className="text-[10px] text-slate-400">Precio</p>
            <p className="mt-1 font-semibold text-slate-100">${product.price}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-2">
            <p className="text-[10px] text-slate-400">Stock</p>
            <p className="mt-1 font-semibold text-slate-100">{product.quantity}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-2">
            <p className="text-[10px] text-slate-400">Enabled</p>
            <p className="mt-1 font-semibold text-slate-100">
              {product.isEnabled ? 'Sí' : 'No'}
            </p>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-[10px] text-slate-400">Dimensiones</p>
          <p className="mt-1 text-xs text-slate-200">
            {product.height}m x {product.width}m x {product.length}m
          </p>
        </div>
      </div>
    </article>
  )
}


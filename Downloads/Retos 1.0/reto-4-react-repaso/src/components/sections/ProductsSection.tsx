import type { Category } from '../../interfaces/category'
import type { Product } from '../../interfaces/product'
import { CategoryList } from '../CategoryList'
import { ProductGrid } from '../ProductGrid'
import { Panel } from '../ui/Panel'
import { PrimaryButton } from '../ui/PrimaryButton'

type ProductsSectionProps = {
  categories: Category[]
  enabledProducts: Product[]
  isLoading: boolean
  error: string | null
  onRefresh: () => Promise<void>
}

export function ProductsSection({
  categories,
  enabledProducts,
  isLoading,
  error,
  onRefresh,
}: ProductsSectionProps) {
  return (
    <Panel>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full lg:max-w-[320px]">
          <h2 className="text-lg font-semibold">Categorías</h2>
          <p className="mt-1 text-sm text-slate-300">
            Relación por nombre de categoría.
          </p>
          <div className="mt-4">
            <CategoryList categories={categories} />
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold">Productos habilitados</h3>
              <p className="mt-1 text-sm text-slate-300">
                Se muestran únicamente los de <span className="font-mono">isEnabled=true</span>.
              </p>
            </div>
            <PrimaryButton
              type="button"
              disabled={isLoading}
              onClick={onRefresh}
            >
              {isLoading ? 'Consultando…' : 'Actualizar productos'}
            </PrimaryButton>
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <div className="mt-6">
            <ProductGrid products={enabledProducts} />
          </div>
        </div>
      </div>
    </Panel>
  )
}


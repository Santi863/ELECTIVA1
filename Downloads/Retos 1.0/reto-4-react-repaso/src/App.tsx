import { useAnimals } from './hooks/useAnimals'
import { useImageList } from './hooks/useImageList'
import { useProducts } from './hooks/useProducts'
import { Welcome } from './components/Welcome'
import { AnimalsSection } from './components/sections/AnimalsSection'
import { ImagesSection } from './components/sections/ImagesSection'
import { ProductsSection } from './components/sections/ProductsSection'

export default function App() {
  const {
    animals,
    apiAnimals,
    totalPets,
    isLoading: animalsLoading,
    error: animalsError,
    fetchAnimals,
    reorderAnimals,
  } = useAnimals()

  const {
    images,
    isLoading: imagesLoading,
    error: imagesError,
  } = useImageList()

  const {
    categories,
    enabledProducts,
    isLoading: productsLoading,
    error: productsError,
    refreshProducts,
  } = useProducts()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Welcome student="Electiva 1" />
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Tres retos reunidos en una sola app con arquitectura por responsabilidades:
            hooks para datos, componentes reutilizables para UI y props para comunicación.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-1">
          <AnimalsSection
            animals={animals}
            apiAnimals={apiAnimals}
            totalPets={totalPets}
            isLoading={animalsLoading}
            error={animalsError}
            onFetchAnimals={fetchAnimals}
            onReorder={reorderAnimals}
          />

          <ImagesSection
            images={images}
            isLoading={imagesLoading}
            error={imagesError}
          />

          <ProductsSection
            categories={categories}
            enabledProducts={enabledProducts}
            isLoading={productsLoading}
            error={productsError}
            onRefresh={refreshProducts}
          />
        </div>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-400">
          React + TypeScript + Vite + Tailwind CSS
        </div>
      </footer>
    </div>
  )
}

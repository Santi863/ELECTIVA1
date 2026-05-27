import { useMemo, useState } from 'react'
import type { Category } from './interfaces/category'
import type { Product } from './interfaces/product'
import { CategoryList } from './components/CategoryList'
import { ProductGrid } from './components/ProductGrid'
import { PageTitle } from './components/PageTitle'

const API_BASE_URL = 'https://electiva5-api.apolobyte.top'

const INITIAL_CATEGORIES: Category[] = [
  { name: 'Electrónica', description: 'Dispositivos y accesorios tecnológicos.' },
  { name: 'Hogar', description: 'Productos para mejorar tu espacio en casa.' },
  { name: 'Deportes', description: 'Artículos para entrenamiento y movimiento.' },
  { name: 'Oficina', description: 'Soluciones para productividad diaria.' },
  { name: 'Jardín', description: 'Herramientas y mejoras para el exterior.' },
]

const INITIAL_PRODUCTS: Product[] = [
  {
    name: 'Audífonos Bluetooth',
    description: 'Sonido nítido con cancelación pasiva de ruido.',
    imageUrl: 'headphones.jpg',
    category: 'Electrónica',
    quantity: 10,
    price: 39.99,
    height: 0.18,
    width: 0.16,
    length: 0.08,
    isEnabled: true,
  },
  {
    name: 'Lámpara LED',
    description: 'Iluminación cálida con bajo consumo.',
    imageUrl: 'lamp.jpg',
    category: 'Hogar',
    quantity: 6,
    price: 18.5,
    height: 0.32,
    width: 0.12,
    length: 0.12,
    isEnabled: true,
  },
  {
    name: 'Botella Térmica',
    description: 'Mantiene la temperatura por horas.',
    imageUrl: 'bottle.jpg',
    category: 'Deportes',
    quantity: 25,
    price: 14.0,
    height: 0.25,
    width: 0.08,
    length: 0.08,
    isEnabled: false,
  },
  {
    name: 'Organizador de Escritorio',
    description: 'Mantén documentos y accesorios siempre a la mano.',
    imageUrl: 'organizer.jpg',
    category: 'Oficina',
    quantity: 12,
    price: 22.0,
    height: 0.1,
    width: 0.3,
    length: 0.22,
    isEnabled: true,
  },
  {
    name: 'Mochila de Jardín',
    description: 'Diseñada para llevar herramientas pequeñas con comodidad.',
    imageUrl: 'garden-backpack.jpg',
    category: 'Jardín',
    quantity: 8,
    price: 28.75,
    height: 0.42,
    width: 0.28,
    length: 0.16,
    isEnabled: true,
  },
]

export default function App() {
  // El reto pide convertir products en useState.
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES)
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Solo mostrar productos habilitados.
  const enabledProducts = useMemo(
    () => products.filter((p) => p.isEnabled),
    [products],
  )

  // El reto pide una función async para consumir:
  // https://electiva5-api.apolobyte.top/products
  async function fetchProductsFromApi(): Promise<void> {
    try {
      setIsLoading(true)
      setError(null)

      const res = await fetch(`${API_BASE_URL}/products`)
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

      const data: unknown = await res.json()
      console.log('Productos API:', data)

      if (Array.isArray(data)) {
        setProducts(data as Product[])
        return
      }

      if (typeof data === 'object' && data !== null && 'products' in data) {
        const maybeProducts = (data as { products?: unknown }).products
        if (Array.isArray(maybeProducts)) setProducts(maybeProducts as Product[])
        return
      }

      throw new Error('Formato inesperado en la respuesta')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <PageTitle />
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Los productos se cargan con datos iniciales y luego se actualizan con un
            botón que consulta la API. Se muestran únicamente los productos con{' '}
            <span className="font-mono">isEnabled = true</span>.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Categorías</h2>
            <p className="mt-1 text-sm text-slate-300">
              Lista inicial para relacionar productos.
            </p>
            <div className="mt-4">
              <CategoryList categories={categories} />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Productos</h2>
                <p className="mt-1 text-sm text-slate-300">
                  Renderizado dinámico con <span className="font-mono">map()</span> y
                  actualización por eventos.
                </p>
              </div>

              <button
                type="button"
                onClick={fetchProductsFromApi}
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Consultando…' : 'Actualizar productos'}
              </button>
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
        </section>
      </main>
    </div>
  )
}

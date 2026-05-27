import { useMemo, useState } from 'react'
import type { Category } from '../interfaces/category'
import type { Product } from '../interfaces/product'
import { API_BASE_URL } from '../lib/constants'

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

export function useProducts() {
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES)
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const enabledProducts = useMemo(
    () => products.filter((p) => p.isEnabled),
    [products],
  )

  async function refreshProducts(): Promise<void> {
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
        if (Array.isArray(maybeProducts)) {
          setProducts(maybeProducts as Product[])
          return
        }
      }

      throw new Error('Formato inesperado en la respuesta')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    categories,
    products,
    enabledProducts,
    isLoading,
    error,
    refreshProducts,
  }
}


import type { Category } from '../interfaces/category'

type CategoryListProps = {
  categories: Category[]
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <li
          key={category.name}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
          title={category.description}
        >
          {category.name}
        </li>
      ))}
    </ul>
  )
}


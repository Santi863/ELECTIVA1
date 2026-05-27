type WelcomeProps = {
  student: string
}

export function Welcome({ student }: WelcomeProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
        {student}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Electiva 1 - React + TypeScript
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-300">
        Reto 4: refactor con <span className="font-semibold">Custom Hooks</span>,
        <span className="font-semibold"> props</span> y componentes reutilizables.
      </p>
    </div>
  )
}


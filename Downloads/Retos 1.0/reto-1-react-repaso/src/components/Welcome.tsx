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
        Bienvenido al Reto 1 (React Repaso)
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-300">
        Este proyecto refuerza <span className="font-semibold">useState</span>,{' '}
        <span className="font-semibold">interfaces</span>,{' '}
        <span className="font-semibold">map()</span>,{' '}
        <span className="font-semibold">operador ternario</span> y consumo de API con{' '}
        <span className="font-semibold">fetch</span>.
      </p>
    </div>
  )
}


export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-6 text-sm text-slate-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Weather data by{' '}
          <a
            href="https://open-meteo.com/"
            className="text-sky-300 underline-offset-2 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Open-Meteo.com
          </a>
        </p>
        <p>Educational project. Forecasts are estimates, not official warnings.</p>
      </div>
    </footer>
  )
}

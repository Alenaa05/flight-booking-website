import FlightCard from "../../components/flight-card"

function makeMockFlights(from: string, to: string, date: string, pax: number) {
  const seed = (from + to + date + String(pax)).length
  const carriers = ["FT Air", "SkyJet", "Nimbus", "AeroLine"]
  const flights = Array.from({ length: 6 }).map((_, i) => {
    const id = `${from}-${to}-${date}-${i}`
    const carrier = carriers[(seed + i) % carriers.length]
    const base = 120 + ((seed + i) % 6) * 25
    return {
      id,
      carrier,
      departTime: `${8 + (i % 8)}:${i % 2 ? "45" : "10"}`,
      arriveTime: `${11 + (i % 8)}:${i % 2 ? "15" : "55"}`,
      duration: `${2 + (i % 3)}h ${i % 2 ? 35 : 5}m`,
      price: base,
      from,
      to,
    }
  })
  return flights
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { from?: string; to?: string; date?: string; pax?: string }
}) {
  const from = (searchParams.from ?? "").toUpperCase()
  const to = (searchParams.to ?? "").toUpperCase()
  const date = searchParams.date ?? ""
  const pax = Number(searchParams.pax ?? 1)

  const flights = from && to && date ? makeMockFlights(from, to, date, pax) : []

  return (
    <main className="px-4 md:px-8 py-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold">Search results</h2>
      <p className="text-sm text-muted-foreground">
        {from && to && date
          ? `${from} → ${to} on ${date} • ${pax} pax`
          : "Enter details on the home page to see flights."}
      </p>

      <div className="mt-4 grid gap-3">
        {flights.length === 0 ? (
          <div className="rounded-lg border p-6 text-sm">No results yet. Go back to the homepage to search.</div>
        ) : (
          flights.map((f) => <FlightCard key={f.id} {...f} />)
        )}
      </div>
    </main>
  )
}

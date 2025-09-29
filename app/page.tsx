import Image from "next/image"
import FlightSearchForm from "../components/flight-search-form"

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-64px)]">
      <section className="relative">
        <Image
          src="/images/FTMS.png"
          alt="FTMS flight booking design canvas"
          width={1920}
          height={768}
          className="w-full h-[260px] md:h-[360px] object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-4xl w-full bg-background/90 backdrop-blur border rounded-xl p-4 md:p-6 shadow-sm">
            <h1 className="text-2xl md:text-3xl font-semibold text-balance">Find your next flight</h1>
            <p className="text-sm text-muted-foreground mt-1">Search and compare fares across destinations.</p>
            <div className="mt-4">
              <FlightSearchForm />
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 md:px-8 py-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Transparent pricing</h3>
            <p className="text-sm text-muted-foreground">No hidden fees at checkout.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Flexible fares</h3>
            <p className="text-sm text-muted-foreground">Choose refundable or saver fares.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">24/7 support</h3>
            <p className="text-sm text-muted-foreground">We’re here whenever you need us.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

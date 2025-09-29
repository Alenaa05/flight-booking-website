import { Button } from "./ui/button"

type Props = {
  id: string
  carrier: string
  departTime: string
  arriveTime: string
  duration: string
  price: number
  from: string
  to: string
}

export default function FlightCard(props: Props) {
  const { id, carrier, departTime, arriveTime, duration, price, from, to } = props
  return (
    <div className="rounded-lg border p-4 flex items-center justify-between">
      <div>
        <h4 className="font-medium">{carrier}</h4>
        <p className="text-sm text-muted-foreground">
          {from} {departTime} → {to} {arriveTime} • {duration}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-lg font-semibold">${price.toFixed(0)}</div>
          <div className="text-xs text-muted-foreground">per person</div>
        </div>
        <Button asChild>
          <a href={`/booking?flight=${encodeURIComponent(id)}&price=${price}`}>Select</a>
        </Button>
      </div>
    </div>
  )
}

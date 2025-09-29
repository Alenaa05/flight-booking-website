"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"

export default function FlightSearchForm() {
  const router = useRouter()
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")
  const [round, setRound] = useState(false)
  const [pax, setPax] = useState(1)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams({
      from,
      to,
      date,
      round: String(round),
      pax: String(pax),
    })
    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={submit} className="grid md:grid-cols-5 gap-3">
      <div className="flex flex-col gap-1">
        <Label htmlFor="from">From</Label>
        <Input
          id="from"
          placeholder="e.g. JFK"
          value={from}
          onChange={(e) => setFrom(e.target.value.toUpperCase())}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="to">To</Label>
        <Input
          id="to"
          placeholder="e.g. LAX"
          value={to}
          onChange={(e) => setTo(e.target.value.toUpperCase())}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="date">Depart</Label>
        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="pax">Passengers</Label>
        <Input id="pax" type="number" min={1} max={9} value={pax} onChange={(e) => setPax(Number(e.target.value))} />
      </div>
      <div className="flex items-end justify-between md:justify-end gap-3">
        <label className="flex items-center gap-2 text-sm">
          <Switch checked={round} onCheckedChange={setRound} />
          Round trip
        </label>
        <Button type="submit">Search</Button>
      </div>
    </form>
  )
}

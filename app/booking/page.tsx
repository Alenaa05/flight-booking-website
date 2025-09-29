"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db, initFirebaseApp } from "../../lib/firebase"

export default function BookingPage() {
  const params = useSearchParams()
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [saving, setSaving] = useState(false)

  const flightId = params.get("flight") ?? ""
  const price = Number(params.get("price") ?? 0)

  useEffect(() => {
    initFirebaseApp()
    const unsub = onAuthStateChanged(getAuth(), (u) => {
      setUserId(u?.uid ?? null)
      if (u && !email) setEmail(u.email ?? "")
    })
    return () => unsub()
  }, [email])

  async function book() {
    if (!userId) {
      router.push(
        "/auth/sign-in?next=/booking" + (flightId ? `?flight=${encodeURIComponent(flightId)}&price=${price}` : ""),
      )
      return
    }
    try {
      setSaving(true)
      const ref = await addDoc(collection(db, "bookings"), {
        userId,
        fullName,
        email,
        flightId,
        price,
        createdAt: serverTimestamp(),
      })
      router.push(`/confirmation/${ref.id}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="px-4 md:px-8 py-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold">Traveler details</h2>
      <p className="text-sm text-muted-foreground">Complete your booking.</p>

      <div className="mt-4 space-y-3">
        <div className="flex flex-col gap-1">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="rounded-md border p-3 text-sm">
          Flight: <span className="font-mono">{flightId || "N/A"}</span>
          <span className="ml-3">
            Total: <strong>${price.toFixed(0)}</strong>
          </span>
        </div>
        <Button onClick={book} disabled={saving}>
          {saving ? "Booking..." : "Book now"}
        </Button>
        {!userId && (
          <p className="text-xs text-muted-foreground">You’ll be asked to sign in before completing your booking.</p>
        )}
      </div>
    </main>
  )
}

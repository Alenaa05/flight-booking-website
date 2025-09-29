"use client"

import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db, initFirebaseApp } from "../../../lib/firebase"
import { Button } from "../../../components/ui/button"
import Link from "next/link"

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initFirebaseApp()
    async function load() {
      const snap = await getDoc(doc(db, "bookings", params.id))
      setData(snap.data())
      setLoading(false)
    }
    load()
  }, [params.id])

  return (
    <main className="px-4 md:px-8 py-8 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-semibold">Booking confirmed</h2>
      {loading ? (
        <p className="text-sm text-muted-foreground mt-2">Loading details…</p>
      ) : data ? (
        <div className="mt-4 border rounded-lg p-5 text-left">
          <p className="text-sm">Reference</p>
          <p className="font-mono">{params.id}</p>
          <div className="mt-3 text-sm">
            <p>
              <strong>Name:</strong> {data.fullName}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Flight:</strong> {data.flightId}
            </p>
            <p>
              <strong>Total:</strong> ${data.price}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground mt-2">Not found.</p>
      )}
      <div className="mt-6">
        <Button asChild>
          <Link href="/trips">View my trips</Link>
        </Button>
      </div>
    </main>
  )
}

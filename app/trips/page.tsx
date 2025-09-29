"use client"

import { onAuthStateChanged, getAuth } from "firebase/auth"
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db, initFirebaseApp } from "../../lib/firebase"

export default function TripsPage() {
  const [uid, setUid] = useState<string | null>(null)
  const [bookings, setBookings] = useState<any[]>([])

  useEffect(() => {
    initFirebaseApp()
    const unsubAuth = onAuthStateChanged(getAuth(), (u) => setUid(u?.uid ?? null))
    return () => unsubAuth()
  }, [])

  useEffect(() => {
    if (!uid) return
    const q = query(collection(db, "bookings"), where("userId", "==", uid), orderBy("createdAt", "desc"))
    const unsub = onSnapshot(q, (snap) => {
      setBookings(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [uid])

  if (!uid) {
    return (
      <main className="px-4 md:px-8 py-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold">My trips</h2>
        <p className="text-sm text-muted-foreground mt-2">Please sign in to view your bookings.</p>
      </main>
    )
  }

  return (
    <main className="px-4 md:px-8 py-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold">My trips</h2>
      <div className="mt-4 grid gap-3">
        {bookings.length === 0 ? (
          <div className="rounded-lg border p-6 text-sm text-muted-foreground">No trips yet.</div>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{b.flightId}</p>
                  <p className="text-sm text-muted-foreground">{b.email}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${(b.price ?? 0).toFixed(0)}</div>
                  <div className="text-xs text-muted-foreground">{b.id}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}

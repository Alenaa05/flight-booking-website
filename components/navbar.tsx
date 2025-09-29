"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { Button } from "./ui/button"
import { initFirebaseApp } from "../lib/firebase"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // ensure Firebase is initialized on the client
    initFirebaseApp()
    const auth = getAuth()
    const unsub = onAuthStateChanged(auth, (u) => setUserEmail(u?.email ?? null))
    return () => unsub()
  }, [])

  return (
    <header className="h-16 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/placeholder-logo.svg" alt="" className="h-6 w-6" />
          <span className="font-semibold tracking-tight">FTMS</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/trips" className="text-sm hover:underline">
            My trips
          </Link>
          <Link href="/search" className="text-sm hover:underline">
            Browse
          </Link>
          {userEmail ? (
            <>
              <span className="hidden md:inline text-sm text-muted-foreground">{userEmail}</span>
              <Button
                size="sm"
                onClick={async () => {
                  await signOut(getAuth())
                  router.push("/")
                }}
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}

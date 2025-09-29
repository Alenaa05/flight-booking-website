"use client"

import type React from "react"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { initFirebaseApp } from "../../../lib/firebase"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const sp = useSearchParams()
  const next = sp.get("next") || "/"

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      initFirebaseApp()
      const auth = getAuth()
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      router.push(next)
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="px-4 md:px-8 py-8 flex justify-center">
      <form onSubmit={submit} className="w-full max-w-sm border rounded-lg p-5 space-y-3">
        <h2 className="text-xl font-semibold">{isSignup ? "Create account" : "Sign in"}</h2>
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-sm text-destructive-foreground">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Please wait..." : isSignup ? "Create account" : "Sign in"}
        </Button>
        <button
          type="button"
          className="text-sm text-muted-foreground hover:underline"
          onClick={() => setIsSignup((v) => !v)}
        >
          {isSignup ? "Have an account? Sign in" : "New here? Create an account"}
        </button>
        <p className="text-xs text-muted-foreground">
          Back to{" "}
          <Link href="/" className="underline">
            home
          </Link>
        </p>
      </form>
    </main>
  )
}

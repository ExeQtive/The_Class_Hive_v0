"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

/**
 * Lands here after the Login as Demo magic-link verify. Supabase's
 * admin-generated links use the implicit flow (tokens in the URL hash, not a
 * ?code= param), so the session must be picked up client-side.
 *
 * The tokens are parsed from the hash and applied via setSession()
 * explicitly, rather than relying on the SDK's automatic hash detection:
 * if a session from an earlier demo visit is still persisted in this
 * browser, the SDK's auto-detect prioritizes that stale session (firing
 * INITIAL_SESSION) and never adopts the fresh tokens — the stale session's
 * session_id has since been invalidated server-side, so middleware then
 * rejects it and bounces to /login. Calling setSession() with the freshly
 * parsed tokens forces the new session to replace whatever was persisted.
 */
export default function AuthCallbackPage() {
  const [error, setError] = useState(false)

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1))
    const access_token = hash.get("access_token")
    const refresh_token = hash.get("refresh_token")

    if (!access_token || !refresh_token) {
      setError(true)
      return
    }

    supabase.auth.setSession({ access_token, refresh_token }).then(({ error: sessionError }) => {
      if (sessionError) {
        setError(true)
        return
      }
      window.location.assign("/dashboard")
    })
  }, [])

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">
          Could not authenticate.{" "}
          <a href="/login" className="text-primary underline">
            Back to login
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-muted-foreground">Signing you in...</p>
    </div>
  )
}

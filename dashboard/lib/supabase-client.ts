"use client";

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Export a safe supabase client for the browser. If env vars are missing, provide a no-op fallback
// so the app doesn't crash in development — pages should handle error responses gracefully.
let _supabase: any;
if (url && anon) {
  _supabase = createClient(url, anon);
} else {
  // Dev fallback: warn and provide minimal auth stubs that return errors.
  // This prevents runtime crashes while clearly indicating missing configuration.
  // eslint-disable-next-line no-console
  console.warn(
    "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set — Supabase client disabled."
  );
  _supabase = {
    auth: {
      signInWithPassword: async () => ({ data: null, error: new Error("Supabase not configured") }),
      signUp: async () => ({ data: null, error: new Error("Supabase not configured") }),
      signInWithOAuth: async () => ({ error: new Error("Supabase not configured") }),
    },
  };
}

export const supabase = _supabase;

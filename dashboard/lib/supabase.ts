import { createClient } from "@supabase/supabase-js";

// Prefer server environment variables for secrets; fall back to NEXT_PUBLIC values if present.
const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Throwing here makes the error visible during server startup with a clear message.
  throw new Error(
    "Supabase environment variables are not set. Set SUPABASE_URL and SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) in your .env.local"
  );
}

// Server-side client (for Server Components)
export function createServerClient() {
  return createClient(supabaseUrl as string, supabaseAnonKey as string, {
    auth: { persistSession: false },
  });
}

// Typed helper to fetch courses
export async function fetchCourses() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Supabase error:", error.message);
    return null;
  }
  return data;
}

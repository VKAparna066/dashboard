import { createClient } from "@supabase/supabase-js";
import type { Course } from "@/types";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function fetchCourses(): Promise<Course[]> {
  if (!supabase) {
    console.warn("Supabase server client not configured, returning no courses.");
    return [];
  }

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetchCourses error:", error);
    return [];
  }

  return (data ?? []) as Course[];
}

import { createClient } from "@supabase/supabase-js";

/**
 * Nur für den Server. Nutzt den Service-Role-Schlüssel und geht damit an RLS
 * vorbei — zulässig, weil dieses Modul ausschließlich aus Route Handlers und
 * Server Components importiert wird, nie in den Browser gelangt. Der Browser
 * spricht nur mit /api/track, nie mit Supabase.
 *
 * Gibt `null` zurück, solange die Umgebungsvariablen fehlen, statt zu werfen:
 * dann tut die Messung schlicht nichts, statt die Seite mitzureißen.
 */
export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

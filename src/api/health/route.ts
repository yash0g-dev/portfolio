import { NextResponse } from "next/server";
import { createSupabaseServer } from "../../lib/supabaseServer";
export async function GET() {
  const supabase = await createSupabaseServer();

  const { error } = await supabase.from("projects").select("id").limit(1);

  return NextResponse.json({
    ok: !error,
    timestamp: new Date().toISOString(),
  });
}

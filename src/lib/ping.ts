import { NextResponse } from "next/server";
import { createClient } from "./supabase";

export async function GET() {
  const supabase = await createClient();

  const { error } = await supabase.from("products").select("id").limit(1);

  return NextResponse.json({
    ok: !error,
    timestamp: new Date().toISOString(),
  });
}

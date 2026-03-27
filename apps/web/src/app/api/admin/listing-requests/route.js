import { getSupabaseAdmin } from "../../../../server/supabase-admin.js";

function assertAdmin(request) {
  const token = request.headers.get("X-Admin-Session");
  if (token !== "authenticated") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "Server missing SUPABASE_SERVICE_ROLE_KEY — add it to apps/web/.env",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }
  return null;
}

export async function GET(request) {
  const authErr = assertAdmin(request);
  if (authErr) return authErr;

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data, error } = await supabase
    .from("listing_requests")
    .select("id, name, category, links, reason, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("listing_requests list:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ requests: data ?? [] }), {
    headers: { "Content-Type": "application/json" },
  });
}

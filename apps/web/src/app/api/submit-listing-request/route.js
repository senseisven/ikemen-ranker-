import { getSupabaseAdmin } from "../../../server/supabase-admin.js";

const ALLOWED_CATEGORIES = new Set([
  "startup",
  "actor",
  "athlete",
  "model",
  "youtuber",
  "musician",
  "other",
]);

const MAX_NAME = 200;
const MAX_TEXT = 8000;

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return jsonResponse(
      {
        error:
          "Server not configured for submissions — set SUPABASE_SERVICE_ROLE_KEY in apps/web/.env",
      },
      503,
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "";
  const links =
    typeof body.links === "string" ? body.links.trim().slice(0, MAX_TEXT) : "";
  const reason = typeof body.reason === "string" ? body.reason.trim() : "";

  if (!name || name.length > MAX_NAME) {
    return jsonResponse({ error: "Invalid name" }, 400);
  }
  if (!category || !ALLOWED_CATEGORIES.has(category)) {
    return jsonResponse({ error: "Invalid category" }, 400);
  }
  if (!reason || reason.length > MAX_TEXT) {
    return jsonResponse({ error: "Invalid reason" }, 400);
  }

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (e) {
    return jsonResponse({ error: e.message }, 503);
  }

  const { data, error } = await supabase
    .from("listing_requests")
    .insert({
      name,
      category,
      links: links || null,
      reason,
    })
    .select("id")
    .single();

  if (error) {
    console.error("listing_requests insert:", error);
    return jsonResponse({ error: "Could not save request" }, 500);
  }

  return jsonResponse({ ok: true, id: data.id }, 201);
}

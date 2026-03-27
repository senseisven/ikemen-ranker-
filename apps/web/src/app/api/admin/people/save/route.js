import { getSupabaseAdmin } from "../../../../../server/supabase-admin.js";

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

const PERSON_COLUMNS = [
  "slug",
  "category_id",
  "name_ja",
  "name_kana",
  "title",
  "bio_short",
  "editorial",
  "image_url",
  "image_alt",
  "score_total",
  "score_cleanliness",
  "score_facial",
  "score_vibe",
  "score_fashion",
  "score_charisma",
  "link_x",
  "link_instagram",
  "link_official",
  "is_weekly_pick",
  "is_active",
  "display_order",
  "meta_title",
  "meta_description",
];

function pickPersonRow(raw) {
  const row = {};
  for (const key of PERSON_COLUMNS) {
    if (raw[key] !== undefined) row[key] = raw[key];
  }
  return row;
}

async function syncTags(supabase, personId, tagIds) {
  await supabase.from("people_tags").delete().eq("person_id", personId);
  if (tagIds?.length > 0) {
    const inserts = tagIds.map((tag_id) => ({ person_id: personId, tag_id }));
    const { error } = await supabase.from("people_tags").insert(inserts);
    if (error) throw error;
  }
}

/** Create person + tags */
export async function POST(request) {
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

  try {
    const body = await request.json();
    const { person: rawPerson, tagIds = [] } = body;
    if (!rawPerson) {
      return new Response(JSON.stringify({ error: "Missing person" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const person = pickPersonRow(rawPerson);
    const { data, error } = await supabase
      .from("people")
      .insert(person)
      .select()
      .single();

    if (error) throw error;

    if (tagIds.length > 0) {
      await syncTags(supabase, data.id, tagIds);
    }

    return new Response(JSON.stringify({ person: data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("admin people POST:", e);
    return new Response(JSON.stringify({ error: e.message || "Save failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/** Update person + tags */
export async function PUT(request) {
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

  try {
    const body = await request.json();
    const { id, person: rawPerson, tagIds } = body;
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updates = pickPersonRow(rawPerson || {});
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("people")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    if (tagIds !== null && tagIds !== undefined) {
      await syncTags(supabase, id, tagIds);
    }

    return new Response(JSON.stringify({ person: data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("admin people PUT:", e);
    return new Response(JSON.stringify({ error: e.message || "Save failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request) {
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

  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await supabase.from("people_tags").delete().eq("person_id", id);
    const { error } = await supabase.from("people").delete().eq("id", id);
    if (error) throw error;

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("admin people DELETE:", e);
    return new Response(JSON.stringify({ error: e.message || "Delete failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

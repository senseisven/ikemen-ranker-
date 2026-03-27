import { getSupabaseAdmin } from "../../../../server/supabase-admin.js";

const BUCKET = "person-images";

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
          "Server missing SUPABASE_SERVICE_ROLE_KEY — add it to apps/web/.env (Dashboard → API → service_role)",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }
  return null;
}

async function ensureBucket(supabase) {
  const { data: buckets } = await supabase.storage.listBuckets();
  if (buckets?.some((b) => b.name === BUCKET)) return;

  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    fileSizeLimit: 5 * 1024 * 1024,
  });
  if (error && !String(error.message).includes("already exists")) throw error;
}

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

  const formData = await request.formData();
  const file = formData.get("file");
  const slugRaw = formData.get("slug") || "person";

  if (!file || typeof file.arrayBuffer !== "function") {
    return new Response(JSON.stringify({ error: "Missing file" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const slug = String(slugRaw).replace(/[^a-zA-Z0-9-_]/g, "-") || "person";
  const ext =
    (file.name && file.name.split(".").pop()?.toLowerCase()) || "jpg";
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext)
    ? ext
    : "jpg";
  const filePath = `${slug}-${Date.now()}.${safeExt}`;

  try {
    await ensureBucket(supabase);
    const buffer = await file.arrayBuffer();
    const contentType = file.type || `image/${safeExt === "jpg" ? "jpeg" : safeExt}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, buffer, {
        cacheControl: "31536000",
        upsert: false,
        contentType,
      });

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

    return new Response(JSON.stringify({ url: publicUrl }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("upload-person-image:", e);
    return new Response(
      JSON.stringify({ error: e.message || "Upload failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

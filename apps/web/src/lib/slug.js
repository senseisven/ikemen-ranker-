export function normalizeSlug(value) {
  if (value == null) return "";

  let slug = String(value).trim();
  slug = slug.replace(/^\/+/, "");
  slug = slug.replace(/^article\/+/i, "");
  slug = slug.replace(/\/+/g, "/");
  slug = slug.replace(/^\/+|\/+$/g, "");

  return slug;
}

export function articleUrl(slug) {
  const clean = normalizeSlug(slug);
  return clean ? `/article/${clean}` : "/";
}

export function normalizePath(path) {
  if (!path) return "/";
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  const collapsed = withLeading.replace(/\/{2,}/g, "/");
  if (collapsed.length > 1 && collapsed.endsWith("/")) {
    return collapsed.slice(0, -1);
  }
  return collapsed || "/";
}

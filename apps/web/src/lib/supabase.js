import { createClient } from '@supabase/supabase-js';
import { normalizeSlug } from './slug.js';

// Load from apps/web/.env (see vite.config envPrefix: NEXT_PUBLIC_*, SUPABASE_*)
const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const anonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
// Service role bypasses RLS - prefer when set (loaders run server-side only)
const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

if (!supabaseUrl || !anonKey) {
  throw new Error(
    'Missing Supabase credentials. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to apps/web/.env'
  );
}

// Prefer service role when available (bypasses RLS); this module is only used in loaders (server)
const key = serviceRoleKey || anonKey;
export const supabase = createClient(supabaseUrl, key);

// ============================================
// CATEGORIES
// ============================================

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export async function getCategoryBySlug(slug) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function getAllCategorySlugs() {
  const { data, error } = await supabase
    .from('categories')
    .select('slug')
    .eq('is_active', true);
  
  if (error) throw error;
  return data?.map(c => c.slug) || [];
}

// ============================================
// PEOPLE
// ============================================

export async function getPeopleByCategory(categoryId) {
  const { data, error } = await supabase
    .from('people')
    .select(`
      *,
      category:categories(id, slug, name_ja),
      tags:people_tags(tag:tags(id, name))
    `)
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('score_total', { ascending: false });
  
  if (error) throw error;
  
  // Transform tags from nested structure to flat array
  return (data || []).map(person => ({
    ...person,
    tags: person.tags?.map(t => t.tag?.name).filter(Boolean) || []
  }));
}

export async function getPeopleByCategorySlug(categorySlug) {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];
  return getPeopleByCategory(category.id);
}

export async function getPersonBySlug(slug) {
  const { data, error } = await supabase
    .from('people')
    .select(`
      *,
      category:categories(id, slug, name_ja),
      tags:people_tags(tag:tags(id, name))
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  
  if (!data) return null;
  
  return {
    ...data,
    tags: data.tags?.map(t => t.tag?.name).filter(Boolean) || []
  };
}

export async function getAllPeopleSlugs() {
  const { data, error } = await supabase
    .from('people')
    .select('slug')
    .eq('is_active', true);
  
  if (error) throw error;
  return data?.map(p => p.slug) || [];
}

export async function getWeeklyPicks(limit = 5) {
  const { data, error } = await supabase
    .from('people')
    .select(`
      *,
      category:categories(id, slug, name_ja),
      tags:people_tags(tag:tags(id, name))
    `)
    .eq('is_weekly_pick', true)
    .eq('is_active', true)
    .order('score_total', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  
  return (data || []).map(person => ({
    ...person,
    tags: person.tags?.map(t => t.tag?.name).filter(Boolean) || []
  }));
}

export async function getLatestPeople(limit = 10) {
  const { data, error } = await supabase
    .from('people')
    .select(`
      *,
      category:categories(id, slug, name_ja),
      tags:people_tags(tag:tags(id, name))
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  
  return (data || []).map(person => ({
    ...person,
    tags: person.tags?.map(t => t.tag?.name).filter(Boolean) || []
  }));
}

export async function getTopPeople(limit = 10) {
  const { data, error } = await supabase
    .from('people')
    .select(`
      *,
      category:categories(id, slug, name_ja),
      tags:people_tags(tag:tags(id, name))
    `)
    .eq('is_active', true)
    .order('score_total', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  
  return (data || []).map(person => ({
    ...person,
    tags: person.tags?.map(t => t.tag?.name).filter(Boolean) || []
  }));
}

export async function getRelatedPeople(personId, categoryId, tags, limit = 4) {
  const { data, error } = await supabase
    .from('people')
    .select(`
      *,
      category:categories(id, slug, name_ja),
      tags:people_tags(tag:tags(id, name))
    `)
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .neq('id', personId)
    .order('score_total', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  
  return (data || []).map(person => ({
    ...person,
    tags: person.tags?.map(t => t.tag?.name).filter(Boolean) || []
  }));
}

export async function getTopInCategory(categoryId, limit = 5) {
  const { data, error } = await supabase
    .from('people')
    .select(`
      *,
      category:categories(id, slug, name_ja),
      tags:people_tags(tag:tags(id, name))
    `)
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('score_total', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  
  return (data || []).map(person => ({
    ...person,
    tags: person.tags?.map(t => t.tag?.name).filter(Boolean) || []
  }));
}

export async function getRankingsByCategory(limit = 5) {
  const categories = await getCategories();
  const results = await Promise.all(
    categories.map(async (cat) => ({
      category: cat,
      people: await getTopInCategory(cat.id, limit),
    }))
  );
  return results;
}

// ============================================
// TAGS
// ============================================

export async function getAllTags() {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export async function getTagsByCategory(categoryId) {
  const { data, error } = await supabase
    .from('people_tags')
    .select(`
      tag:tags(id, name)
    `)
    .eq('person_id', categoryId);
  
  // Actually need to get tags for all people in category
  const { data: people } = await supabase
    .from('people')
    .select('id')
    .eq('category_id', categoryId)
    .eq('is_active', true);
  
  if (!people || people.length === 0) return [];
  
  const personIds = people.map(p => p.id);
  
  const { data: peopleTags, error: tagsError } = await supabase
    .from('people_tags')
    .select('tag:tags(id, name)')
    .in('person_id', personIds);
  
  if (tagsError) throw tagsError;
  
  // Get unique tags
  const tagMap = new Map();
  peopleTags?.forEach(pt => {
    if (pt.tag) {
      tagMap.set(pt.tag.id, pt.tag.name);
    }
  });
  
  return Array.from(tagMap.values());
}

// ============================================
// ARTICLES
// ============================================

export async function getArticles(categoryId = null, limit = 20) {
  let query = supabase
    .from('articles')
    .select(`
      *,
      category:categories(id, slug, name_ja),
      person:people(id, slug, name_ja)
    `)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit);
  
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getArticleBySlug(slug) {
  const normalized = normalizeSlug(slug);
  if (!normalized) return null;

  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(id, slug, name_ja),
      person:people(id, slug, name_ja)
    `)
    .eq('slug', normalized)
    .eq('is_published', true)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

// ============================================
// ADMIN FUNCTIONS
// ============================================

export async function adminLogin(email, password) {
  const { data, error } = await supabase.rpc('admin_login', {
    p_email: email,
    p_password: password
  });
  
  if (error) throw error;
  return data;
}

// Admin CRUD operations - these bypass RLS for admin operations

export async function adminGetCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export async function adminCreateCategory(category) {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function adminUpdateCategory(id, updates) {
  const { data, error } = await supabase
    .from('categories')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function adminDeleteCategory(id) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

export async function adminGetPeople() {
  const { data, error } = await supabase
    .from('people')
    .select(`
      *,
      category:categories(id, slug, name_ja),
      tags:people_tags(tag:tags(id, name))
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  return (data || []).map(person => ({
    ...person,
    tags: person.tags?.map(t => t.tag?.name).filter(Boolean) || []
  }));
}

export async function adminCreatePerson(person, tagIds = []) {
  const { data, error } = await supabase
    .from('people')
    .insert(person)
    .select()
    .single();
  
  if (error) throw error;
  
  // Add tags
  if (tagIds.length > 0) {
    const tagInserts = tagIds.map(tagId => ({
      person_id: data.id,
      tag_id: tagId
    }));
    
    await supabase.from('people_tags').insert(tagInserts);
  }
  
  return data;
}

export async function adminUpdatePerson(id, updates, tagIds = null) {
  const { data, error } = await supabase
    .from('people')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  
  // Update tags if provided
  if (tagIds !== null) {
    // Remove existing tags
    await supabase.from('people_tags').delete().eq('person_id', id);
    
    // Add new tags
    if (tagIds.length > 0) {
      const tagInserts = tagIds.map(tagId => ({
        person_id: id,
        tag_id: tagId
      }));
      
      await supabase.from('people_tags').insert(tagInserts);
    }
  }
  
  return data;
}

export async function adminDeletePerson(id) {
  const { error } = await supabase
    .from('people')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

export async function adminGetTags() {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export async function adminCreateTag(tag) {
  const { data, error } = await supabase
    .from('tags')
    .insert(tag)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function adminUpdateTag(id, updates) {
  const { data, error } = await supabase
    .from('tags')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function adminDeleteTag(id) {
  const { error } = await supabase
    .from('tags')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

export async function adminGetArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(id, slug, name_ja),
      person:people(id, slug, name_ja)
    `)
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

const ARTICLE_FIELDS = [
  'slug',
  'title',
  'excerpt',
  'content',
  'category_id',
  'person_id',
  'featured_image_url',
  'published_at',
  'is_published',
  'meta_title',
  'meta_description',
];

function sanitizeArticlePayload(article) {
  const out = {};
  for (const key of ARTICLE_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(article, key)) {
      out[key] = article[key];
    }
  }
  if (out.slug != null) {
    out.slug = normalizeSlug(out.slug);
  }
  return out;
}

export async function adminCreateArticle(article) {
  const { data, error } = await supabase
    .from('articles')
    .insert(sanitizeArticlePayload(article))
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function adminUpdateArticle(id, updates) {
  const { data, error } = await supabase
    .from('articles')
    .update({ ...sanitizeArticlePayload(updates), updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function adminDeleteArticle(id) {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// ============================================
// PERSON IMAGE UPLOAD (Supabase Storage)
// ============================================

const PERSON_IMAGES_BUCKET = 'person-images';
const ARTICLE_IMAGES_BUCKET = 'article-images';

async function uploadImageToBucket(bucket, file, slugPrefix) {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext) ? ext : 'jpg';
  const safeSlug = String(slugPrefix).replace(/[^a-zA-Z0-9-_]/g, '-') || 'image';
  const filePath = `${safeSlug}-${Date.now()}.${safeExt}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '31536000',
      upsert: false,
      contentType: file.type || `image/${safeExt === 'jpg' ? 'jpeg' : safeExt}`,
    });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return urlData.publicUrl;
}

export async function uploadPersonImage(file, personSlug) {
  return uploadImageToBucket(PERSON_IMAGES_BUCKET, file, personSlug);
}

export async function uploadArticleImage(file, articleSlug) {
  return uploadImageToBucket(ARTICLE_IMAGES_BUCKET, file, articleSlug);
}

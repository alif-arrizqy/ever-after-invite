export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function baseSlugForName(name: string): string {
  const base = slugify(name);
  return base || 'tamu';
}

export function ensureUniqueSlug(name: string, existingSlugs: string[]): string {
  const base = baseSlugForName(name);
  const slugs = new Set(existingSlugs);
  if (!slugs.has(base)) return base;
  let n = 1;
  while (slugs.has(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}

export function generateSlug(name: string): string {
  return slugify(name) || 'tamu';
}

export function prettifySlugFromSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

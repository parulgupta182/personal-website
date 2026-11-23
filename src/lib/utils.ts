import site from '../data/site.json';

/** Prefix a site-relative path (e.g. "cv/file.pdf") with the deployment base path. */
export function withBase(path: string): string {
  if (!path) return path;
  if (/^(https?:|mailto:|#|\/\/)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}

/** Turn a bare email address into a mailto: link. */
export function emailHref(email: string): string {
  return email.startsWith('mailto:') ? email : `mailto:${email}`;
}

/** Normalise a DOI ("10.x/y" or full URL) into a resolvable URL. */
export function doiHref(doi: string): string {
  return doi.startsWith('http') ? doi : `https://doi.org/${doi}`;
}

export const showPlaceholders: boolean = site.showPlaceholders;

// @ts-check
import { defineConfig } from 'astro/config';

/**
 * SITE_URL and BASE_PATH are set automatically by the GitHub Actions workflow
 * (from actions/configure-pages), so asset paths work whether the site lives at
 *   https://<user>.github.io/personal-website/   (project page)  or
 *   https://<user>.github.io/  /  a custom domain (root).
 * Locally they fall back to a root deployment.
 */
const site = process.env.SITE_URL || 'https://example.github.io';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});

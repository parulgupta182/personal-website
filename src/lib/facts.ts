import travel from '../data/travel.json';
import hobbies from '../data/hobbies.json';

/** Values derived from the data files, used to fill {tokens} in profile.json. */
export const countries = [...new Set(travel.trips.filter((t: any) => !t.placeholder).map((t) => t.country))];

const reading = hobbies.hobbies.find((h) => h.id === 'reading');
const current = (reading?.lists as any[] | undefined)?.find((l) => /currently/i.test(l.title))?.items?.[0];
export const currentBook: string = current && !current.placeholder ? current.title : '';

export function fillTokens(text: string): string {
  return text
    .replace('{countries}', String(countries.length))
    .replace('{currentBook}', currentBook || '—');
}

/** Obfuscate an email so it never appears as plain text in the HTML (decoded on click). */
export function encodeEmail(email: string): string {
  const clean = email.replace(/^mailto:/, '');
  return Buffer.from([...clean].reverse().join(''), 'utf8').toString('base64');
}

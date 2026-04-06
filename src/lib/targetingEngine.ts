import { NormalizedUserProfile } from './types';

/**
 * Evaluates whether a piece of content (Notice, Assignment, Event) is relevant
 * to a user profile based on its targeting tags.
 * 
 * Evaluation Logic:
 * 1. Admins and Faculty generally see everything, though we can restrict if needed.
 * 2. If content tags array is empty or contains "ALL", it's broadly visible.
 * 3. The content is visible if ANY of its tags match the user's computed normalized tags.
 * 
 * @param contentTags Array of strings like ["ALL", "BBA-4", "CSE"]
 * @param profile The user's normalized identity
 */
export function isContentRelevantToProfile(
  contentTags: any[] | undefined,
  profile: NormalizedUserProfile | null
): boolean {
  if (!profile) return false;
  
  // 1. Safe default: No tags = Publicly visible in this MVP
  if (!contentTags || !Array.isArray(contentTags) || contentTags.length === 0) return true;

  // 2. Admin/Faculty have universal bypass for oversight
  if (profile.role === 'admin' || profile.role === 'faculty') return true;

  // 3. Normalization & Safety Guard
  // Filter out non-string/malformed tags which might crash .toUpperCase()
  const sanitizedContentTags = contentTags
    .filter(t => typeof t === 'string' && t.trim().length > 0)
    .map(t => (t as string).toUpperCase());

  // If after sanitization no valid tags remain, treat as public (fail safe)
  if (sanitizedContentTags.length === 0) return true;

  // 4. "ALL" Global visibility check
  if (sanitizedContentTags.includes('ALL')) return true;

  // 5. User-specific tag intersection
  // Ensure profile.tags are also sanitized for comparison
  const userTags = (profile.tags || [])
    .filter(t => typeof t === 'string')
    .map(t => (t as string).toUpperCase());

  return sanitizedContentTags.some(contentTag => userTags.includes(contentTag));
}

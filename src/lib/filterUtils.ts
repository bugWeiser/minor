/**
 * Filter items by the current user's tag array.
 * Items tagged "ALL" always match. Items with no tags also match.
 * Admin users (isAdmin = true) receive all content.
 */
export function filterByUserTags<T extends { tags: string[] }>(
  items: T[],
  userTags: string[],
  isAdmin = false
): T[] {
  if (isAdmin) return items;
  if (!userTags || userTags.length === 0) return items;
  return items.filter((item) => {
    if (!item.tags || item.tags.length === 0) return true;
    if (item.tags.includes('ALL')) return true;
    return item.tags.some((tag) => userTags.includes(tag));
  });
}

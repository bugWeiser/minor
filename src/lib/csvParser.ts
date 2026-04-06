/**
 * Robust CSV Parser
 * Handles quoted fields, embedded commas, double-quote escapes, and whitespace normalization.
 */
export function parseCSV(text: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  // Normalize line endings
  const content = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        field += '"';
        i++; // skip next quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(field.trim());
        field = '';
      } else if (char === '\n') {
        row.push(field.trim());
        if (row.length > 0 && !(row.length === 1 && row[0] === '')) {
          result.push(row);
        }
        row = [];
        field = '';
      } else {
        field += char;
      }
    }
  }

  // Handle last field/row if not terminated by newline
  if (field !== '' || row.length > 0) {
    row.push(field.trim());
    result.push(row);
  }

  return result;
}

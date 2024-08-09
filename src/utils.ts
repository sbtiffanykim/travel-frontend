export function capitalize(word?: string) {
  if (!word) return '';
  return word[0].toUpperCase() + word.slice(1);
}

export function formatDescription(description?: string) {
  if (!description) return '';
  return description.replace(/\n/g, '<br />');
}

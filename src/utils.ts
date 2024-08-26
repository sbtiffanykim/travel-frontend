export function capitalize(word?: string) {
  if (!word) return '';
  return word[0].toUpperCase() + word.slice(1);
}

export function formatDescription(description?: string) {
  if (!description) return '';
  return description.replace(/\n/g, '<br />');
}

export function formatDuration(duration?: string) {
  if (!duration) return '0';

  const hours = parseInt(duration.slice(0, 2));
  const minutes = parseInt(duration.slice(3, 5));

  const time = hours + minutes / 60;
  const formattedDuration = time % 1 === 0 ? time.toFixed(0) : time.toFixed(1);
  return formattedDuration;
}

export function formatDate(date?: Date) {
  if (!date) return '';
  const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return formattedDate;
}

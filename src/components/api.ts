const BASE_URL = 'http://127.0.0.1:8000/api/v1/rooms';

export async function getRoomList(page: number) {
  const response = await fetch(`${BASE_URL}?page=${page}`);
  const data = await response.json();
  return data;
}

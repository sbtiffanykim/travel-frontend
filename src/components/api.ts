import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
});

export const getRoomList = (page: number) =>
  instance.get(`rooms?page=${page}`).then((response) => response.data);

import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
});

export const getRoomList = (page: number) =>
  instance.get(`rooms?page=${page}`).then((response) => response.data);

export const getRoomDetail = async ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  const response = await instance.get(`rooms/${roomPk}`);
  return response.data;
};

export const getRoomReviews = async ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  const response = await instance.get(`rooms/${roomPk}/reviews`);
  return response.data;
};

export const getExperienceList = (page: number) =>
  instance.get(`experiences?page=${page}`).then((response) => response.data);

export const getExperienceDetail = async ({ queryKey }: QueryFunctionContext) => {
  const [_, experiencePk] = queryKey;
  const response = await instance.get(`experiences/${experiencePk}`);
  return response.data;
};

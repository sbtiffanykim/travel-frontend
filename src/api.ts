import Cookies from 'js-cookie';
import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  withCredentials: true,
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

export const getExperienceReview = async ({ queryKey }: QueryFunctionContext) => {
  const [_, experiencePk] = queryKey;
  const response = await instance.get(`experiences/${experiencePk}/reviews`);
  return response.data;
};

export const getCurrentUser = () => {
  return instance.get(`users/me`).then((response) => response.data);
};

export const logOut = () => {
  instance
    .post(`users/logout`, null, {
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken') || '',
      },
    })
    .then((response) => response.data);
};

export const githubLogIn = (code: string) =>
  instance
    .post(
      `users/github`,
      { code },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.status);

export const kakaoLogin = (code: string) =>
  instance
    .post(
      `users/kakao`,
      { code },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.status);

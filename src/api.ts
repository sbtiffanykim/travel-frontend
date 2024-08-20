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
  return instance
    .post(`users/logout`, null, {
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken') || '',
      },
    })
    .then((response) => response.data);
};

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}

export interface IUsernameLoginSuccess {
  success: string;
}

export interface IUsernameLoginError {
  error: string;
}

export const usernameLogIn = ({ username, password }: IUsernameLoginVariables) => {
  return instance
    .post(
      `users/login`,
      { username, password },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      }
    )
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

interface INaverLoginVariables {
  code: string;
  state: string;
}

export const naverLogin = ({ code, state }: INaverLoginVariables) =>
  instance
    .post(
      `users/naver`,
      { code, state },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.status);

interface ISignUpVariables {
  email: string;
  username: string;
  password: string;
  pwConfirm: string;
}

export const signUp = ({ email, username, password, pwConfirm }: ISignUpVariables) => {
  instance
    .post(
      'users/signUp',
      { email, username, password, pwConfirm },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.status);
};

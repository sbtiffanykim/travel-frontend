import Cookies from 'js-cookie';
import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { formatDate } from './lib/utils';

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
  gender: string;
  language: string;
  currency: string;
}

export const signUp = async ({
  email,
  username,
  password,
  pwConfirm,
  gender,
  language,
  currency,
}: ISignUpVariables) => {
  try {
    const response = await instance.post(
      'users/signUp',
      { email, username, password, pwConfirm, gender, language, currency },
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken') || '',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log('AxiosError in api:', error.response);
      throw error;
    }
    throw new Error('An unexpected error occured');
  }
};

export const getAmenities = () => {
  return instance.get(`rooms/amenities`).then((response) => response.data);
};

export const getCategories = (kind: string) => {
  return instance.get(`categories?kind=${kind}`).then((response) => response.data);
};

export interface IUploadRoomVariables {
  name: string;
  country: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  description: string;
  address: string;
  pet_allowed: boolean;
  room_type: string;
  amenities: number[];
  category: number;
  max_capacity: number;
}

export const uploadRoom = async (variables: IUploadRoomVariables) => {
  try {
    const response = await instance.post(`rooms/`, variables, {
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken') || '',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to upload room');
  }
};

type CheckBookingQueryKey = [string?, Date[]?, string?];

export const checkAvailability = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [roomPk, dates, _] = queryKey;
  if (dates) {
    const [firstDate, secondDate] = dates;
    const checkInDate = formatDate(firstDate);
    const checkOutDate = formatDate(secondDate);
    return instance
      .get(
        `rooms/${roomPk}/bookings/check?check_in=${checkInDate}&check_out=${checkOutDate}`
      )
      .then((response) => response.data);
  }
};

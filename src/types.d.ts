export interface IMedia {
  pk: string;
  file: string;
  description?: string;
}

export interface IRoomList {
  pk: number;
  name: string;
  country: string;
  city: string;
  description: string;
  room_type: string;
  bedrooms: number;
  price: number;
  rating: number;
  number_of_reviews: number;
  is_owner: boolean;
  photos: IMedia[];
}

export interface ILinkInfo {
  current_page: number;
  total_pages: number;
  next_link: null | string;
  prev_link: null | string;
  count: number;
}

export interface IRoomHost {
  pk: number;
  username: string;
  profile_picture: string;
  email: string;
}

export interface IRoomReviewUser extends IRoomHost {
  date_joined: string;
}

export interface IRoomAmenity {
  pk: number;
  name: string;
  description: string | null;
  icon: string | null;
}

export interface ICategory {
  pk: number;
  kind: string;
  name: string;
}

export interface IRoomDetail extends IRoomList {
  id: number;
  host: IRoomHost;
  amenities: IRoomAmenity[];
  category: {
    pk: number;
    name: string;
    kind: string;
  };
  is_liked: false;
  bathrooms: number;
  beds: number;
  address: string;
  pet_allowed: boolean;
  max_capacity: number;
}

export interface IReview {
  user: IRoomReviewUser;
  rating: number;
  comments: string;
  created_date: string;
}

export interface IInclusion {
  pk: number;
  name: string;
  details: string;
}

export interface IExpList {
  pk: number;
  name: string;
  country: string;
  city: string;
  duration: string;
  price: number;
  total_reviews: number;
  rating_average: number;
  thumbnail: IMedia;
  video: IMedia;
}

export type IListItem = IRoomList | IExpList;

export interface ICurrentUser {
  username: string;
  email: string;
  profile_picture: string;
  date_joined: string;
  last_login: string;
  is_host: boolean;
  gender: string;
  language: string;
  currency: string;
}

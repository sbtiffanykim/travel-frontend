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

export interface IExpList {
  pk: number;
  name: string;
  city: string;
  price: number;
  total_reviews: number;
  rating_average: number;
  thumbnail: IMedia | null;
  video: IMedia | null;
}

export type IListItem = IRoomList | IExpList;

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

export interface IRoomDetail extends IRoomList {
  host: IRoomHost;
  amenities: IRoomAmenity;
  host: IRoomHost;
  amenities: IRoomAmenity[];
  category: {
    pk: number;
    name: string;
    kind: string;
  };
  is_liked: false;
  bathrooms: string;
  beds: string;
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

export interface IPhoto {
  pk: string;
  file: string;
  description: string;
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
  photos: IPhoto[];
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
  user: IRoomHost;
  rating: number;
  comments: string;
  created_date: string;
}

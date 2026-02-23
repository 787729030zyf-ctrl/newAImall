export enum Page {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  DETAIL = 'DETAIL',
  AI_MAKEUP = 'AI_MAKEUP',
  FACE_ANALYSIS = 'FACE_ANALYSIS',
  CART = 'CART',
  PROFILE = 'PROFILE'
}

export enum Language {
  EN = 'EN',
  ZH = 'ZH',
  JP = 'JP',
  KR = 'KR',
  FR = 'FR'
}

export interface Product {
  id: number;
  title: string;
  price: number;
  sales: number;
  image: string;
  category: string;
  tags: string[];
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserPreferences {
  eyeShape?: string;
  noseShape?: string;
  lipShape?: string;
}

export interface Translation {
  [key: string]: {
    [key in Language]: string;
  };
}
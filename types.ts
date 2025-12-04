export enum Page {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  DETAIL = 'DETAIL',
  AI_MAKEUP = 'AI_MAKEUP',
  FACE_ANALYSIS = 'FACE_ANALYSIS'
}

export enum Language {
  EN = 'EN',
  ZH = 'ZH'
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

export interface UserPreferences {
  eyeShape?: string;
  noseShape?: string;
  lipShape?: string;
}

export interface Translation {
  [key: string]: {
    [Language.EN]: string;
    [Language.ZH]: string;
  };
}
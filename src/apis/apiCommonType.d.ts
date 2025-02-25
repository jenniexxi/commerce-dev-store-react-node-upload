export type Price = {
  number: number;
  currencyCode: string;
};

export type Code<T> = {
  code: T;
  codeName: string;
};

export type BasicCode<T> = {
  code: T;
  success: boolean;
  fail: boolean;
  message: string;
};

export type Badge = {
  badgeId: number;
  text: string;
  imageFilesUrl: string;
};

export type Exhibition = {
  exhibitionId: number;
  name: string;
  description: string;
};

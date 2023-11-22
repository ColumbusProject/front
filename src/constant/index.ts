export const MAIN_PATH = '/columbus';
export const AUTH_PATH = '/auth';
export const SEARCH_PATH = (word: string) => `/search/${word}`;
export const BOARD_REVIEW_DETAIL_PATH = (boardNumber: number | string) => `/board/review/detail/${boardNumber}`;
export const BOARD_REVIEW_UPDATE_PATH = (boardNumber: number | string) => `/board/review/update/${boardNumber}`;
export const MAIN_PATH = '/columbus';
export const AUTH_PATH = '/auth';
export const SEARCH_PATH = (word: string) => `/search/${word}`;
export const BOARD_DETAIL_PATH = (boardNumber: number | string) => `/board/detail/${boardNumber}`;
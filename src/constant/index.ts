export const MAIN_PATH = '/columbus';
export const AUTH_PATH = '/auth';
export const USER_PATH = (id: string) => `/user/${id}`;
export const BOARD_UPDATE_PATH = (boardNumber: number | string) => `/board/update/${boardNumber}`;
export const BOARD_DETAIL_PATH = (boardNumber: number | string) => `/board/detail/${boardNumber}`;

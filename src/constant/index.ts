export const MAIN_PATH = () => '/columbus';
export const AUTH_PATH = () => 'auth';
export const BOARD_PATH = () => 'board';
export const USER_PATH = () => 'user';
export const MY_PAGE_PATH = (userId: string) => `user/my-page/${userId}`;
export const MY_LOGBOOK_PATH = (userId: string) => `user/my-logbook/${userId}`;
export const PROFILE_PATH = (userId: string) => `user/profile/${userId}`
export const BOARD_REVIEW_DETAIL_PATH = (boardNumber: number | string) => `/board/review/detail/${boardNumber}`;
export const BOARD_REVIEW_UPDATE_PATH = (boardNumber: number | string) => `/board/review/update/${boardNumber}`;
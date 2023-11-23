export const MAIN_PATH = () => '/columbus';
export const AUTH_PATH = () => 'auth';
export const BOARD_PATH = () => 'board';
export const USER_PATH = () => 'user';

export const MY_PAGE_PATH = (userId: string) => `columbus/user/my-page/${userId}`;
export const MY_LOGBOOK_PATH = (userId: string) => `columbus/user/my-logbook/${userId}`;
export const PROFILE_PATH = (userId: string) => `columbus/user/profile/${userId}`;

export const BOARD_ITINERARY_MAIN_PATH = () => 'columbus/board/itinerary';

export const BOARD_REVIEW_MAIN_PATH = () => 'columbus/board/review';
export const BOARD_REVIEW_DETAIL_PATH = (boardNumber: number | string) => `columbus/board/review/detail/${boardNumber}`;
export const BOARD_REVIEW_UPDATE_PATH = (boardNumber: number | string) => `columbus/board/review/update/${boardNumber}`;

export const BOARD_TRADE_MAIN_PATH = () => 'columbus/board/trade';
export const MAIN_PATH = () => '/columbus';
export const BOARD_PATH = () => 'board';
export const AUTH_PATH = () => 'auth';
export const USER_PATH = () => 'user';

export const MY_PAGE_PATH = (userId: string) => `my-page/${userId}`;
export const MY_LOGBOOK_PATH = (userId: string) => `my-logbook/${userId}`;
export const PROFILE_PATH = (userId: string) => `profile/${userId}`;

export const BOARD_ITINERARY_MAIN_PATH = () => 'itinerary';

export const BOARD_REVIEW_MAIN_PATH = () => 'review';
export const BOARD_REVIEW_DETAIL_PATH = (boardNumber: number | string) => `detail/${boardNumber}`;
export const BOARD_REVIEW_UPDATE_PATH = (boardNumber: number | string) => `update/${boardNumber}`;

export const BOARD_TRADE_MAIN_PATH = () => 'trade';
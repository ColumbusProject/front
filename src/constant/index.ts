export const MAIN_PATH = () => '/columbus';
export const AUTH_PATH = () => '/columbus/auth';

export const MY_PAGE_PATH = (userId: string) => `user/my-page/${userId}`;
export const MY_LOGBOOK_PATH = (userId: string) => `user/my-logbook/${userId}`
export const PROFILE_PATH = (userId: string) => `user/profile/${userId}`;

export const BOARD_ITINERARY_MAIN_PATH = () => 'board/itinerary';
export const BOARD_ITINERARY_WRITE_PATH = () => 'write';
export const BOARD_ITINERARY_DETAIL_PATH = (boardNumber: number | string) => `detail/${boardNumber}`;

export const BOARD_REVIEW_MAIN_PATH = () => 'board/review';
export const BOARD_REVIEW_DETAIL_PATH = (boardNumber: number | string) => `detail/${boardNumber}`;
export const BOARD_REVIEW_UPDATE_PATH = (boardNumber: number | string) => `update/${boardNumber}`;
export const BOARD_REVIEW_WRITE_PATH = () => 'write';
export const BOARD_REVIEW_SEARCH_PATH = (searchWord: string) => `search-list/${searchWord}`;

export const BOARD_TRADE_MAIN_PATH = () => 'board/trade';
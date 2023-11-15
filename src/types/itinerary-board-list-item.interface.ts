export default interface ItineraryBoardItem {
    boardNumber: number;
    title: string;
    dayCount: number;
    content: string;
    favoriteCount: number;
    commentCount: number;
    viewCount: number;
    writeDatetime: string;
    writerNickname: string;
    writerProfileImage: string | null;
}
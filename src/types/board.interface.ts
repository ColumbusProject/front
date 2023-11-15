export default interface Board {
    boardNumber: number;
    title: string;
    content: string;
    boardImageList: string[];
    writeDatetime: string;
    writerNickname: string;
    writerProfileImage: string | null;
    viewCount: number,
    location: string | null,
    writerEmail: string,
}
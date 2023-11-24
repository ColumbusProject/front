import axios from "axios";
import PostCommentResponseDto from "./dto/response/board/post-comment.response.dto";
import ResponseDto from "./dto/response";
import DeleteBoardResponseDto from "./dto/response/board/delete-board.response.dto";
import GetCommentListResponseDto from "./dto/response/board/get-comment-list.response.dto";
import PostCommentRequestDto from "./dto/request/board/travelReview/post-comment.request.dto";
import GetFavoriteListResponseDto from "./dto/response/board/get-favorite-list.response.dto";
import { SignInRequestDto, SignUpRequestDto } from "./dto/request/auth";
import { SignInResponseDto, SignUpResponseDto } from "./dto/response/auth";
import { GetSignInUserResponseDto } from "./dto/response/user";

// description: Authorizaition Header //
const authorization = (token: string) => { 
    return { headers: { Authorization: `Bearer ${token}` } };
};

// description: Domain URL //
const DOMAIN = 'http://localhost:4000/columbus';

// description: API Domain 주소 //
const API_DOMAIN = `${DOMAIN}/api`;

// description: sign in API end point //
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;

// description: sign up API end point //
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

// description: sign in request //
export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(response => {
            const responseBody: SignInResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

// description: sign in user API end point //
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

// description: sign in user request //
export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
        .then(response => {
            const responseBody: GetSignInUserResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result
}

// description: sign up request //
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then(response => {
            const responseBody: SignUpResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}


// description: delete board API end point //
const DELETE_BOARD_URL = (boardNumber: string | number) => `${API_DOMAIN}/board/${boardNumber}`;
// description: get comment list API end point //
const GET_COMMENT_LIST_URL = (boardNumber: string | number) => `${API_DOMAIN}/board/${boardNumber}/comment-list`;
// description: post comment API end point //
const POST_COMMENT_URL = (boardNumber: string | number) => `${API_DOMAIN}/board/${boardNumber}/comment`;
// description: get favorite list API end point //
const GET_FAVORITE_LIST_URL = (boardNumber: string | number) => `${API_DOMAIN}/board/${boardNumber}/favorite-list`;


// description: delete board request //
export const deleteBoardRequest = async (boardNumber: string |  number, token: string) => {
    const result = await axios.delete(DELETE_BOARD_URL(boardNumber), authorization(token))
    .then(response => {
        const responseBody: DeleteBoardResponseDto = response.data;
        const {code} = responseBody;
        return code;
    })
    .catch(error => {
        const responseBody: ResponseDto = error.response.data;
        const {code} = responseBody;
        return code;
    });
    return result;
}

// description: get comment list request //
export const getCommentListRequest = async (boardNumber: string | number) => {
    const result = await axios.get(GET_COMMENT_LIST_URL(boardNumber))
    .then(response => {
        const responseBody: GetCommentListResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
}

// description: post comment request //
export const postCommentRequest = async (requestBody: PostCommentRequestDto, boardNumber: string, token: string) => {
    const result = await axios.post(POST_COMMENT_URL(boardNumber), requestBody, authorization(token))
        .then(response => {
            const responseBody: PostCommentResponseDto = response.data;
            const { code } = responseBody;
            return code;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            const { code } = responseBody;
            return code;
        })
    return result;
}

// description: get favorite list request //
export const getFavoriteListRequest = async (boardNumber: string | number) => {
    const result = await axios.get(GET_FAVORITE_LIST_URL(boardNumber))
    .then(response => {
        const responseBody: GetFavoriteListResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
}